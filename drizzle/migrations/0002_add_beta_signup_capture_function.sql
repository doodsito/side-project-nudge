CREATE OR REPLACE FUNCTION public.capture_beta_signup(_email TEXT, _source TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  signup_id UUID;
  normalized_email TEXT := lower(trim(_email));
BEGIN
  IF length(normalized_email) NOT BETWEEN 5 AND 254
    OR normalized_email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;

  IF _source NOT IN ('navbar', 'hero', 'interactive_demo', 'early_access', 'final') THEN
    RAISE EXCEPTION 'Invalid source';
  END IF;

  INSERT INTO public.beta_signups (email, source)
  VALUES (normalized_email, _source)
  ON CONFLICT (email) DO UPDATE SET source = EXCLUDED.source
  RETURNING id INTO signup_id;

  RETURN signup_id;
END;
$$;

REVOKE ALL ON FUNCTION public.capture_beta_signup(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.capture_beta_signup(TEXT, TEXT) TO anon, authenticated, service_role;