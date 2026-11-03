-- The end-of-beta survey: one set of answers per member.
--
-- A signed-in member can add and read back only their own row, which is how the
-- dashboard knows to stop showing the survey button. Answers cannot be changed
-- or deleted from the website. Robin reads them in the Table Editor. A voice
-- message uses the existing feedback-audio bucket.

create table public.beta_survey_responses (
  id bigint generated always as identity primary key,
  member_id uuid not null unique references public.profiles (id) on delete cascade,
  device text not null check (device in ('mobile', 'tablet', 'computer')),
  disappointment text not null check (disappointment in ('very', 'somewhat', 'not')),
  nps smallint not null check (nps between 0 and 10),
  appearance_score smallint not null check (appearance_score between 1 and 4),
  appearance_why text check (length(appearance_why) <= 2000),
  courses_score smallint not null check (courses_score between 1 and 4),
  courses_why text check (length(courses_why) <= 2000),
  usefulness_score smallint not null check (usefulness_score between 1 and 4),
  usefulness_why text check (length(usefulness_why) <= 2000),
  friction text check (length(friction) <= 2000),
  overall_message text check (length(overall_message) <= 2000),
  overall_audio_path text,
  created_at timestamptz not null default now(),
  constraint beta_survey_overall_message_or_audio
    check (overall_message is null or overall_audio_path is null),
  constraint beta_survey_audio_in_own_folder
    check (overall_audio_path is null or split_part(overall_audio_path, '/', 1) = member_id::text)
);

alter table public.beta_survey_responses enable row level security;
revoke all on table public.beta_survey_responses from anon, authenticated;
grant select, insert on table public.beta_survey_responses to authenticated;

create policy "Members submit their own beta survey"
  on public.beta_survey_responses for insert
  to authenticated
  with check ((select auth.uid()) = member_id);

create policy "Members read their own beta survey"
  on public.beta_survey_responses for select
  to authenticated
  using ((select auth.uid()) = member_id);
