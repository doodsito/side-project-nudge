-- Limits wrong access codes across the whole site, so codes cannot be guessed
-- by trying them one after another: after 20 wrong codes within a minute,
-- every code check is refused until that minute has passed. The limit is
-- global, not per visitor, because the website asks from its server: the
-- database sees the same address for everybody. Members who already have
-- access are never blocked.
--
-- Also counts a code once when the same account redeems it twice at the same
-- moment (two sign-ins in parallel used to add 2 to used_count).

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

-- One row per wrong code, kept for an hour at most. Only the functions below use it.
create table private.access_code_failures (
  id bigint generated always as identity primary key,
  failed_at timestamptz not null default now()
);

create index access_code_failures_failed_at_idx on private.access_code_failures (failed_at);

-- True while the last minute holds 20 wrong codes or more.
create function private.access_codes_locked()
returns boolean
language sql
stable
set search_path = ''
as $$
  select count(*) >= 20
  from private.access_code_failures f
  where f.failed_at > now() - interval '1 minute';
$$;

create function private.note_access_code_failure()
returns void
language sql
set search_path = ''
as $$
  delete from private.access_code_failures f where f.failed_at < now() - interval '1 hour';
  insert into private.access_code_failures default values;
$$;

revoke execute on function private.access_codes_locked() from public, anon, authenticated;
revoke execute on function private.note_access_code_failure() from public, anon, authenticated;

-- Same answer as before, but refused with the error PT429 (HTTP 429 for the
-- website) while the limit is reached, and a wrong code counts towards it.
create or replace function public.check_access_code(code text)
returns boolean
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  usable boolean;
begin
  if private.access_codes_locked() then
    raise exception 'Too many wrong access codes, try again in a minute' using errcode = 'PT429';
  end if;

  select exists (
    select 1
    from public.access_codes c
    where c.code = upper(trim(check_access_code.code))
      and c.is_active
      and (c.expires_at is null or c.expires_at > now())
      and (c.max_uses is null or c.used_count < c.max_uses)
  ) into usable;

  if not usable then
    perform private.note_access_code_failure();
  end if;
  return usable;
end;
$$;

create or replace function public.redeem_access_code(code text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  caller uuid := auth.uid();
  clean_code text := upper(trim(redeem_access_code.code));
  added integer;
begin
  if caller is null then
    raise exception 'Sign in before redeeming an access code' using errcode = '42501';
  end if;

  if exists (select 1 from public.profiles p where p.id = caller) then
    return true;
  end if;

  if private.access_codes_locked() then
    raise exception 'Too many wrong access codes, try again in a minute' using errcode = 'PT429';
  end if;

  -- Counting the use locks the code row, so max_uses holds under concurrent sign-ins.
  update public.access_codes c
  set used_count = c.used_count + 1
  where c.code = clean_code
    and c.is_active
    and (c.expires_at is null or c.expires_at > now())
    and (c.max_uses is null or c.used_count < c.max_uses);

  if not found then
    -- A parallel sign-in of the same account may have just taken the last use.
    if exists (select 1 from public.profiles p where p.id = caller) then
      return true;
    end if;
    perform private.note_access_code_failure();
    return false;
  end if;

  insert into public.profiles (id, access_code)
  values (caller, clean_code)
  on conflict (id) do nothing;

  -- The same account redeemed in parallel and already has its row: count the code once.
  get diagnostics added = row_count;
  if added = 0 then
    update public.access_codes c
    set used_count = c.used_count - 1
    where c.code = clean_code;
  end if;

  return true;
end;
$$;
