"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { finishSignIn, getVisitorTrack } from "@/lib/auth";
import { passwordError, type AuthFormState } from "@/lib/auth-rules";
import { getDictionary } from "@/lib/dictionaries";

export async function updatePassword(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const t = getDictionary(await getVisitorTrack()).auth.errors;
  const password = String(formData.get("password") ?? "");
  const invalid = passwordError(password);
  if (invalid) return { error: t[invalid] };

  // The reset link signed the person in; without that session, nothing to update.
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) return { error: t.resetExpired };
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    if (error.code === "same_password") return { error: t.samePassword };
    if (error.code === "weak_password") return { error: t.rules };
    return { error: t.tryAgain };
  }
  if (!(await finishSignIn(supabase))) redirect("/signup?error=access");
  redirect("/dashboard/account?password=updated");
}
