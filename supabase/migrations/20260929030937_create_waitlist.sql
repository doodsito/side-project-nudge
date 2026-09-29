-- Waitlist for the early access form on the website.
--
-- The table is closed to the website: row level security is on, there is no
-- policy, and the public roles have no privileges on it. The website can only
-- call join_waitlist(), which checks the input and adds one row. The list is
-- read from the Supabase dashboard.

create table public.waitlist_signups (
  id bigint generated always as identity primary key,
  email text not null unique
    check (email = lower(email) and length(email) <= 254 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  profile text not null
    check (profile in ('student', 'young_professional', 'other')),
  source text not null
    check (source ~ '^[a-z_]{1,40}$'),
  created_at timestamptz not null default now()
);

alter table public.waitlist_signups enable row level security;
revoke all on table public.waitlist_signups from anon, authenticated;

-- Adds an email to the waitlist. An email already on the list is ignored
-- without an error, so the form cannot be used to find out who signed up.
create function public.join_waitlist(email text, profile text, source text)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.waitlist_signups (email, profile, source)
  values (lower(trim(join_waitlist.email)), join_waitlist.profile, join_waitlist.source)
  on conflict (email) do nothing;
$$;

revoke execute on function public.join_waitlist(text, text, text) from public, anon, authenticated;
grant execute on function public.join_waitlist(text, text, text) to anon, authenticated;
