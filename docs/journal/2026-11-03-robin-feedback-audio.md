# Beta testers can send feedback as a voice message

- **Date:** 2026-11-03
- **Author:** Robin, with Claude Code
- **Pull request:** to be added once opened

**Why:** speaking is faster than writing, so testers can say more about what they see.

**What changed:**
- The feedback form can record up to 3 minutes of audio: record, stop, listen, delete or send. Each feedback is either text or audio.
- Recordings go to a new private Supabase bucket, one folder per member. Robin listens to them from the Supabase dashboard.
- The site can now ask for the microphone (`Permissions-Policy`). The privacy policy covers feedback and voice recordings, kept 12 months at most.
- `supabase/README.md` explains how to listen to and delete recordings.

**Files:** `supabase/migrations/20261103230000_add_feedback_audio.sql`, `apps/web/src/components/shared/feedback-audio-recorder.tsx`, `apps/web/src/components/shared/feedback-widget.tsx`, `apps/web/src/app/dashboard/actions.ts`, `apps/web/src/lib/feedback-audio.ts`, `apps/web/src/app/privacy-policy/page.tsx`, `apps/web/next.config.ts`

**Checked:** lint, typecheck, build and tests pass. Recorder tested in Chrome with a simulated microphone (record, listen, delete, 3-minute stop, refused microphone). Sending still to test on the Vercel preview with a real account, once the migration is applied.
