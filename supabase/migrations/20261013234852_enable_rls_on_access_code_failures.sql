-- Row level security on the wrong-codes table too, as a second lock: the
-- private schema is not exposed and the public roles have no privileges on
-- it, but if that ever changed, this table would still return nothing. No
-- policy on purpose: only the functions of
-- 20261013224134_limit_access_code_attempts.sql use it, and they run as the
-- table owner (postgres), which row level security does not apply to.

alter table private.access_code_failures enable row level security;
