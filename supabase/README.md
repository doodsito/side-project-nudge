# Database (Supabase)

The database schema lives here as migrations: SQL files applied in order to the
Supabase project `nudge` (ref `zqphlvtnxrokjlcqbput`, region Paris). This folder
is a reserved area: changes wait for Robin's approval.

## What is in the database

| Object | What it does |
|---|---|
| `waitlist_signups` table | The early access list: email, profile, source, date. Closed to the website (row level security on, no access for the public key). Read it in the Supabase dashboard, Table Editor. |
| `join_waitlist(email, profile, source)` | The only thing the website can call: it checks the input and adds the email, ignoring one that is already on the list. |
| `access_codes` table | The private beta codes: code, note, how many uses are allowed and used, expiry, on/off. Closed to the website. |
| `profiles` table | One row per beta member, linked to their Supabase account. A member can read only their own row; deleting the account deletes it. |
| `check_access_code(code)` | Says whether a code can be used now, so `/get-started` can refuse a wrong code before sign-in. |
| `redeem_access_code(code)` | Gives the signed-in user beta access with a code (creates their `profiles` row). Only ever acts on the caller's own account. |

## Sign-in settings (Robin, Supabase dashboard)

The website's password rules are in `apps/web/src/lib/auth-rules.ts`; keep the
dashboard in step with them.

- Authentication > Providers > Email: on, "Confirm email" on, minimum password
  length 8.
- Authentication > URL Configuration: Site URL `https://nudge.doodsito.com`;
  Redirect URLs `https://nudge.doodsito.com/**`, `http://localhost:3000/**` and
  `https://*-doodsito.vercel.app/**`.
- Emails (confirmation, password reset) use Supabase's built-in sender until a
  custom SMTP is set: it only writes to members of the Supabase team, about 2
  emails an hour.

## Beta access codes (Robin)

Codes are never written in a migration, because this repository is public. Add
or change them in the Supabase dashboard, SQL Editor:

```sql
insert into public.access_codes (code, note) values ('BETA', 'shared beta code');
-- Limit a code to 20 sign-ups, or switch one off:
update public.access_codes set max_uses = 20 where code = 'BETA';
update public.access_codes set is_active = false where code = 'BETA';
```

Codes are upper-case letters, digits and dashes (4 to 32 characters); visitors
can type them in any case. A code already used by a member cannot be deleted:
switch it off instead.

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
