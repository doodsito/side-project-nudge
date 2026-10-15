-- Remove the unused waitlist segmentation without changing member profiles or access codes.
-- Apply before deploying the email-only form. The legacy signature remains compatible
-- with an already-open old website tab, but no longer stores its profile argument.
begin;

create or replace function public.join_waitlist(email text, profile text, source text)
returns void language sql security definer set search_path = '' as $$
  insert into public.waitlist_signups (email, source)
  values (lower(trim(join_waitlist.email)), join_waitlist.source)
  on conflict (email) do nothing;
$$;

alter table public.waitlist_signups drop column profile;

create function public.join_waitlist(email text, source text)
returns void language sql security definer set search_path = '' as $$
  insert into public.waitlist_signups (email, source)
  values (lower(trim(join_waitlist.email)), join_waitlist.source)
  on conflict (email) do nothing;
$$;

revoke execute on function public.join_waitlist(text, text) from public, anon, authenticated;
grant execute on function public.join_waitlist(text, text) to anon, authenticated;
-- Existing RLS, table permissions and grants on the legacy function are preserved.
commit;
