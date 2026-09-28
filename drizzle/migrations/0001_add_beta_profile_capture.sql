CREATE OR REPLACE FUNCTION public.set_beta_signup_profile(_signup_id UUID, _profile TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _profile NOT IN ('student', 'young_professional', 'other') THEN
    RAISE EXCEPTION 'Invalid profile';
  END IF;

  UPDATE public.beta_signups
  SET profile = _profile
  WHERE id = _signup_id;
END;
$$;

REVOKE ALL ON FUNCTION public.set_beta_signup_profile(UUID, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.set_beta_signup_profile(UUID, TEXT) TO anon, authenticated, service_role;