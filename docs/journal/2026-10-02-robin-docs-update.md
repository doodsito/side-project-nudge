# Docs match how we work now that main is protected

- **Date:** 2026-10-02
- **Author:** Robin, with Claude Code
- **Pull request:** <link, once opened>

**Why:** `main` is now protected on GitHub, and the legal pages went live with #11 while their docs were still on another branch.

**What changed:**
- `AGENTS.md` and `docs/workflow.md`: the author merges once the checks are green; "Update branch" when GitHub says the branch is out of date; code owners request Robin's review but do not block.
- Roadmap: site live, `main` protected, legal pages and `llms.txt` done. README: the site is live.
- Legal pages docs and their journal entry, from `robin/beta-preview`.

**Files:** `AGENTS.md`, `README.md`, `docs/workflow.md`, `docs/roadmap.md`, `docs/journal/`

**Checked:** docs only; CI runs on the pull request.

**Next:** Nothing.
