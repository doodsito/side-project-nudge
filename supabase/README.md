# Database (Supabase)

The database schema lives here as migrations: SQL files applied in order to the
Supabase project `nudge` (ref `zqphlvtnxrokjlcqbput`, region Paris). This folder
is a reserved area: changes wait for Robin's approval.

## What is in the database

| Object | What it does |
|---|---|
| `waitlist_signups` table | The early access list: email, profile, source, date. Closed to the website (row level security on, no access for the public key). Read it in the Supabase dashboard, Table Editor. |
| `join_waitlist(email, profile, source)` | The only thing the website can call: it checks the input and adds the email, ignoring one that is already on the list. |

## Changing the schema

1. Create a new migration: `npx supabase migration new <what_it_does>`, run
   from the repository root. Never edit a migration that has already been
   applied; add a new one instead.
2. Open a pull request. Once Robin approves it, apply it (next section).
3. If the change affects what the website calls, update
   `apps/web/src/integrations/supabase/types.ts` in the same pull request.

## Applying migrations (Robin)

From the repository root:

```sh
npx supabase login                                    # once per computer
npx supabase link --project-ref zqphlvtnxrokjlcqbput  # once per clone; asks for the database password
npx supabase db push                                  # applies the migrations not applied yet
```
