-- Voice messages in the beta feedback form.
--
-- A feedback is now either a written message or a recording, never both. The
-- recordings live in a private bucket, in one folder per member. A member can
-- only add files to their own folder; nothing can be read, changed or deleted
-- from the website. Robin listens to them from the Supabase dashboard.

alter table public.feedback_submissions
  alter column message drop not null,
  add column audio_path text,
  add constraint feedback_submissions_message_or_audio
    check ((message is null) <> (audio_path is null)),
  add constraint feedback_submissions_audio_in_own_folder
    check (audio_path is null or split_part(audio_path, '/', 1) = member_id::text);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('feedback-audio', 'feedback-audio', false, 5242880, array['audio/webm', 'audio/mp4']);

create policy "Members upload their own feedback audio"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'feedback-audio'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and exists (select 1 from public.profiles where id = (select auth.uid()))
  );
