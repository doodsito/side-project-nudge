-- Feedback from beta testers, sent from the dashboard.
--
-- A signed-in member can only insert a row for themselves (auth.uid() must
-- match member_id); there is no select policy, so the website never reads
-- feedback back. Robin reads it from the Supabase dashboard, Table Editor.

create table public.feedback_submissions (
  id bigint generated always as identity primary key,
  member_id uuid not null references public.profiles (id) on delete cascade,
  category text not null
    check (category in ('bug', 'idea', 'other')),
  message text not null
    check (length(trim(message)) > 0 and length(message) <= 2000),
  created_at timestamptz not null default now()
);

create index feedback_submissions_member_id_idx on public.feedback_submissions (member_id);

alter table public.feedback_submissions enable row level security;
revoke all on table public.feedback_submissions from anon, authenticated;
grant insert on table public.feedback_submissions to authenticated;

create policy "Members submit their own feedback"
  on public.feedback_submissions for insert
  to authenticated
  with check ((select auth.uid()) = member_id);
