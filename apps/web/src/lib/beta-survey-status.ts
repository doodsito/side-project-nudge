import { createSupabaseServerClient } from "@/integrations/supabase/server";

/** Whether this member already answered. RLS only ever returns their own row. */
export async function hasAnsweredBetaSurvey(memberId: string) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("beta_survey_responses")
    .select("id")
    .eq("member_id", memberId)
    .maybeSingle();
  return data !== null;
}
