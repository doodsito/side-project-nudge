import { useState, type FormEvent } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { track } from "@/lib/analytics";

export function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "complete" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || status === "saving") return;
    setStatus("saving");
    track("beta_signup_submitted", { source: "early_access" });
    const { error } = await supabase.rpc("capture_beta_signup", { _email: email.trim().toLowerCase(), _source: "early_access" });
    if (error) { setStatus("error"); return; }
    track("beta_signup_completed", { source: "early_access", profile: "not_shared" });
    setStatus("complete");
  }
  if (status === "complete") return <div className="animate-slide-up flex min-h-14 items-center gap-3 rounded-xl border border-mint/40 bg-mint-soft px-5 text-sm font-bold text-market-up" role="status"><span className="grid size-7 place-items-center rounded-full bg-surface"><Check className="size-4" aria-hidden /></span>You’re on the list.</div>;
  return <form onSubmit={submit} className="w-full max-w-xl">
    <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
      <label htmlFor="early-access-email" className="sr-only">Email address</label>
      <Input id="early-access-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-14 rounded-xl border-border-strong bg-surface px-4 text-base placeholder:text-muted-foreground" />
      <Button type="submit" disabled={status === "saving"} className="group h-14 rounded-xl px-6 text-base font-bold shadow-soft active:scale-[.98]">{status === "saving" ? <><LoaderCircle className="size-4 animate-spin" /> Joining…</> : <>Join early access <span className="transition-transform group-hover:translate-x-1">→</span></>}</Button>
    </div>
    {status === "error" && <p className="mt-2 text-sm text-destructive" role="alert">We couldn’t save your place just now. Please try again.</p>}
    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Receive product and early-access updates from Nudge. You will be able to unsubscribe at any time.</p>
  </form>;
}
