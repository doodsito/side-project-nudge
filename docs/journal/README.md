# Journal

One short entry per pull request, so anyone, human or agent, can see what
changed recently and why without reading the code or the git history.

- File name: `YYYY-MM-DD-<first-name>-<topic>.md`, for example
  `2026-10-02-emma-faq-copy.md`.
- The agent writes it in the same pull request; the human reads it before
  merging.
- 15 lines at most, in plain language. Agents read the 5 newest entries at the
  start of every session.

## Template

```md
# <What changed, in a few words>

- **Date:** YYYY-MM-DD
- **Author:** <first name>, with <Claude Code or Codex>
- **Pull request:** <link, once opened>

**Why:** <one or two sentences>

**What changed:**
- <plain-language point>
- <plain-language point>

**Files:** `<path>`, `<path>`

**Checked:** lint, typecheck and build pass; preview opened on desktop and mobile.

**Next:** <follow-up, or "Nothing">
```
