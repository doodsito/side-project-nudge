-- public.rls_auto_enable() runs the ensure_rls event trigger, which turns on row
-- level security for each new table in public. Postgres already refuses to call
-- it directly, but it is in the API schema and open to everyone by default, which
-- the security advisor flags. Nobody needs to call it, and the trigger keeps working.
--
-- Supabase created this function, so it is not in these migrations: skip this on
-- a database that does not have it.

do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end;
$$;
