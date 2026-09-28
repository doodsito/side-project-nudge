import { createContext, useContext, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Check, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type BetaSource = "navbar" | "hero" | "interactive_demo" | "early_access" | "final";
type Profile = "student" | "young_professional" | "other";
type Step = "email" | "profile" | "complete";

type BetaContextValue = {
  openBeta: (source: BetaSource) => void;
};

const BetaContext = createContext<BetaContextValue | null>(null);

export function useBetaSignup() {
  const value = useContext(BetaContext);
  if (!value) throw new Error("useBetaSignup must be used inside BetaSignupProvider");
  return value;
}

export function BetaSignupProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState<BetaSource>("hero");
  const [signupId, setSignupId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const context = useMemo(
    () => ({
      openBeta: (nextSource: BetaSource) => {
        setSource(nextSource);
        setStep("email");
        setEmail("");
        setSignupId(null);
        setError("");
        setOpen(true);
        track("beta_modal_opened", { source: nextSource });
      },
    }),
    [],
  );

  async function handleEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    track("beta_signup_submitted", { source });
    setSaving(true);
    setError("");
    const { data, error: captureError } = await supabase.rpc("capture_beta_signup", {
      _email: email.trim().toLowerCase(),
      _source: source,
    });
    if (captureError || !data) {
      setError("We couldn't save your place just now. Please try again.");
      setSaving(false);
      return;
    }
    setSignupId(data);
    setSaving(false);
    setStep("profile");
  }

  async function finish(profile?: Profile) {
    setSaving(true);
    setError("");
    const { error: profileError } = profile && signupId
      ? await supabase.rpc("set_beta_signup_profile", { _signup_id: signupId, _profile: profile })
      : { error: null };

    if (profileError) {
      setError("We couldn't save your place just now. Please try again.");
      setSaving(false);
      return;
    }

    track("beta_signup_completed", { source, profile: profile ?? "not_shared" });
    setSaving(false);
    setStep("complete");
  }

  return (
    <BetaContext.Provider value={context}>
      {children}
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen && step !== "complete") track("beta_modal_abandoned", { source, step });
          setOpen(nextOpen);
        }}
      >
        <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl border-border bg-surface p-0 shadow-lift">
          <div className="border-b border-border px-6 py-5">
            <div className="flex items-center gap-2" aria-label={`Step ${step === "email" ? 1 : step === "profile" ? 2 : 3} of 3`}>
              {["email", "profile", "complete"].map((item, index) => (
                <span
                  key={item}
                  className={cn(
                    "h-1.5 flex-1 rounded-full",
                    index <= ["email", "profile", "complete"].indexOf(step) ? "bg-primary" : "bg-muted",
                  )}
                />
              ))}
            </div>
          </div>

          {step === "email" && (
            <div className="p-6 sm:p-8">
              <DialogHeader>
                <span className="mb-3 grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Mail className="size-5" aria-hidden />
                </span>
                <DialogTitle className="font-display text-2xl font-extrabold">Get early access</DialogTitle>
                <DialogDescription className="text-base leading-relaxed">
                  Join the beta and help shape a better way to understand investing.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleEmail} className="mt-6">
                <label htmlFor="beta-email" className="text-sm font-semibold">Email address</label>
                <Input
                  id="beta-email"
                  type="email"
                  autoComplete="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 h-12 rounded-xl bg-background px-4 text-base"
                />
                <Button type="submit" size="lg" className="mt-4 h-12 w-full rounded-xl text-base font-bold">
                  {saving ? "Saving your place…" : "Join the beta"}
                </Button>
                {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Early access · No investment required · Educational simulations only
                </p>
              </form>
            </div>
          )}

          {step === "profile" && (
            <div className="p-6 sm:p-8">
              <DialogHeader>
                <span className="mb-3 grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  <UserRound className="size-5" aria-hidden />
                </span>
                <DialogTitle className="font-display text-2xl font-extrabold">Help us tailor your invitation</DialogTitle>
                <DialogDescription className="text-base">I’m currently…</DialogDescription>
              </DialogHeader>
              <div className="mt-6 grid gap-3">
                {([
                  ["student", "A student"],
                  ["young_professional", "A young professional"],
                  ["other", "Other"],
                ] as Array<[Profile, string]>).map(([value, label]) => (
                  <Button
                    key={value}
                    type="button"
                    variant="outline"
                    disabled={saving}
                    onClick={() => void finish(value)}
                    className="h-12 justify-start rounded-xl px-4 text-base"
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <Button
                type="button"
                variant="ghost"
                disabled={saving}
                onClick={() => void finish()}
                className="mt-3 w-full"
              >
                Prefer not to say
              </Button>
              {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
            </div>
          )}

          {step === "complete" && (
            <div className="p-8 text-center sm:p-10">
              <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-mint-soft text-market-up">
                <Check className="size-7" aria-hidden />
              </span>
              <DialogHeader className="mt-5 text-center sm:text-center">
                <DialogTitle className="font-display text-2xl font-extrabold">You’re on the list.</DialogTitle>
                <DialogDescription className="text-base leading-relaxed">
                  We’ll let you know when your beta access is ready.
                </DialogDescription>
              </DialogHeader>
              <Button type="button" onClick={() => setOpen(false)} className="mt-6 h-11 rounded-xl px-6">
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </BetaContext.Provider>
  );
}
