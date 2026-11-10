-- The beta survey's thank-you screen asks for an optional first and last name,
-- so the team can get back to the tester on their account email.
--
-- The name is saved after the answers, so a member may now change their own
-- row, but only this one column: the answers themselves still cannot be edited.

alter table public.beta_survey_responses
  add column contact_name text check (length(contact_name) <= 100);

grant update (contact_name) on table public.beta_survey_responses to authenticated;

create policy "Members add their name to their own beta survey"
  on public.beta_survey_responses for update
  to authenticated
  using ((select auth.uid()) = member_id)
  with check ((select auth.uid()) = member_id);
