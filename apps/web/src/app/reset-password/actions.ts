"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { finishSignIn } from "@/lib/auth";
import { passwordError, type AuthFormState } from "@/lib/auth-rules";

export async function updatePassword(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const password = String(formData.get("password") ?? "");
  const invalid = passwordError(password);
  if (invalid) return { error: invalid };

  // The reset link signed the person in; without that session, nothing to update.
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    return { error: "Your reset link has expired. Ask for a new one from the sign-in page." };
  }
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    if (error.code === "same_password") {
      return { error: "Choose a password different from your current one." };
    }
    if (error.code === "weak_password") return { error: error.message };
    return { error: "Something went wrong on our side. Please try again." };
  }
  if (!(await finishSignIn(supabase))) redirect("/get-started?error=access");
  redirect("/dashboard");
}
