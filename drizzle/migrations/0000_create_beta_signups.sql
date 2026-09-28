CREATE TABLE public.beta_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  profile TEXT CHECK (profile IN ('student', 'young_professional', 'other')),
  source TEXT NOT NULL DEFAULT 'homepage',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT beta_signups_email_normalized CHECK (email = lower(trim(email)))
);

CREATE UNIQUE INDEX beta_signups_email_unique ON public.beta_signups (email);

GRANT INSERT ON public.beta_signups TO anon;
GRANT INSERT ON public.beta_signups TO authenticated;
GRANT ALL ON public.beta_signups TO service_role;

ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the beta"
ON public.beta_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(email) BETWEEN 5 AND 254
  AND email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  AND source IN ('navbar', 'hero', 'interactive_demo', 'early_access', 'final')
);