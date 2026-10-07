# How we work

This guide is for everyone on the team, whether you write code or not. You
describe what you want to your agent (Claude Code or Codex); the agent writes
the code, runs the checks and prepares the pull request. You stay in charge:
you read what it did, open the preview and decide to merge.

## One-time setup

1. Install [Node.js](https://nodejs.org) 22 and [Git](https://git-scm.com).
2. Ask Robin to add your GitHub account to the repository.
3. Install your agent: Claude Code or Codex.
4. If you use Claude Code, also install the [GitHub CLI](https://cli.github.com)
   and run `gh auth login`, so the agent can open pull requests. Codex opens
   them through its own GitHub connection.
5. Get the code and install it:

   ```sh
   git clone https://github.com/doodsito/side-project-nudge.git
   cd side-project-nudge
   npm install
   ```

6. Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in the two
   values. Ask Robin for them: they are public, not secret.
7. Run `npm run dev` and check that the site opens at http://localhost:3000.

## Making a change, step by step

1. Ask your agent to switch to `main` and pull the latest changes.
2. Describe the change in plain words, and say why. For example: "In the FAQ,
   add a question about the price. Answer: Nudge is free during the beta."
3. The agent creates a branch named `<first-name>/<topic>`, makes the change
   and runs the checks.
4. Read the summary it gives you, and ask it to explain anything unclear.
5. Ask it to open a pull request. It fills in the template and writes the
   journal entry.
6. Open the pull request on GitHub. After a minute or two, Vercel posts a
   preview link: open it on your computer and on your phone.
7. When the checks are green and the preview looks right, click "Squash and
   merge" yourself: no approval is needed. If the pull request touches a
   reserved area, it waits for Robin.
   - If GitHub shows "This branch is out-of-date", someone merged in the
     meantime: click "Update branch" and wait for the checks to turn green
     again. GitHub does not let you merge before that.
8. A few minutes after the merge, the change is live on nudge.doodsito.com.

## When a check is red

- Open the failed check on the pull request, copy the error message and give it
  to your agent: "The CI failed with this error, please fix it."
- Never ask the agent to disable a check, a lint rule or a TypeScript setting to
  make it pass. If it cannot fix the code, ask Robin.

## Never

- Commit to `main` directly, force-push or rewrite history (GitHub refuses
  the first two on `main`).
- Put a key, password or token in a file, a commit message or a pull request.
- Change a reserved area without Robin (the list is in `AGENTS.md`).
- Merge a pull request without opening its preview.

## Troubleshooting

- **The waitlist form shows an error on your computer.** `apps/web/.env.local`
  is missing or incomplete: see step 6 of the setup.
