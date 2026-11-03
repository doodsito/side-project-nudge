# Bring World 0 into the Learn path

- **Date:** 2026-11-03
- **Author:** Emma, with Codex
- **Pull request:** Pending

**Why:** New learners need an inviting introduction while returning learners should resume their real lesson.

**What changed:**
- Joined World 0 and World 1 on one path, with previews, lesson states and a skip option.
- Added mobile screenshots and kept existing lesson content and progress behavior.

**Files:** `apps/web/src/components/dashboard/`, `docs/screenshots/learn-beta/`
**Checked:** lint and typecheck pass; mobile states checked from 320 to 430 px. Build currently fails in local Next font processing.
**Next:** Review the hosted build and visual preview before merge.
