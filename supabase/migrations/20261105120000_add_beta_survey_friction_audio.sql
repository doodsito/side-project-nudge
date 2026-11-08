-- The beta survey's "most frustrating moment" question also accepts a voice
-- message, like the overall question: text or recording, never both. The file
-- goes to the existing feedback-audio bucket, in the member's own folder.

alter table public.beta_survey_responses
  add column friction_audio_path text,
  add constraint beta_survey_friction_or_audio
    check (friction is null or friction_audio_path is null),
  add constraint beta_survey_friction_audio_in_own_folder
    check (friction_audio_path is null or split_part(friction_audio_path, '/', 1) = member_id::text);
