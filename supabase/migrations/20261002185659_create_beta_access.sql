-- Beta access: only people with an access code get into the app.
--
-- Anyone can create a Supabase account (Google or email), but an account only
-- reaches the app once it has a row in profiles, and the only way to get that
-- row is redeem_access_code() with a valid code. Codes are added from the
-- Supabase dashboard (SQL Editor or Table Editor), never in a migration: this
-- repository is public.

create table public.access_codes (
  code text primary key
    check (code ~ '^[A-Z0-9-]{4,32}$'),
  note text,
  max_uses integer
    check (max_uses > 0),
  used_count integer not null default 0
    check (used_count >= 0),
  expires_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Closed to the website: the codes can only be checked through the functions below.
alter table public.access_codes enable row level security;
revoke all on table public.access_codes from anon, authenticated;

-- One row per beta member. More profile fields will come with the app.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  access_code text not null references public.access_codes (code),
  created_at timestamptz not null default now()
);

create index profiles_access_code_idx on public.profiles (access_code);

-- A signed-in member can read their own row, nothing else. Rows are created by
-- redeem_access_code() and deleted with the account.
alter table public.profiles enable row level security;
revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;

create policy "Members read their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

-- True if the code can be used right now. Lets the website say "wrong code"
-- before the visitor signs in. Returns nothing else about the code.
create function public.check_access_code(code text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.access_codes c
    where c.code = upper(trim(check_access_code.code))
      and c.is_active
      and (c.expires_at is null or c.expires_at > now())
      and (c.max_uses is null or c.used_count < c.max_uses)
  );
$$;

revoke execute on function public.check_access_code(text) from public, anon, authenticated;
grant execute on function public.check_access_code(text) to anon, authenticated;

-- Gives the signed-in user beta access with a code. Returns true if the user
-- is a member afterwards (already a member counts), false if the code cannot
-- be used. Only ever acts on the caller's own account.
create function public.redeem_access_code(code text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  caller uuid := auth.uid();
  clean_code text := upper(trim(redeem_access_code.code));
begin
  if caller is null then
    raise exception 'Sign in before redeeming an access code' using errcode = '42501';
  end if;

  if exists (select 1 from public.profiles p where p.id = caller) then
    return true;
  end if;

  -- Counting the use locks the code row, so max_uses holds under concurrent sign-ins.
  update public.access_codes c
  set used_count = c.used_count + 1
  where c.code = clean_code
    and c.is_active
    and (c.expires_at is null or c.expires_at > now())
    and (c.max_uses is null or c.used_count < c.max_uses);

  if not found then
    return false;
  end if;

  insert into public.profiles (id, access_code)
  values (caller, clean_code)
  on conflict (id) do nothing;

  return true;
end;
$$;

revoke execute on function public.redeem_access_code(text) from public, anon, authenticated;
grant execute on function public.redeem_access_code(text) to authenticated;
