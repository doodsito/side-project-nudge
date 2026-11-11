"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { requireMember } from "@/lib/auth";
import { parseBetaSurveyAnswers, parseBetaSurveyContact } from "@/lib/beta-survey";
import { completedLessonCount, FOUNDATION_WORLD } from "@/lib/course-progress";
import { isFeedbackAudioPath } from "@/lib/feedback-audio";

const UNIQUE_VIOLATION = "23505";

/** Saves a member's beta survey, with how many World 1 lessons they had finished. */
export async function submitBetaSurvey(value: unknown): Promise<{ status: "saved" | "error" }> {
  const member = await requireMember();
  const answers = parseBetaSurveyAnswers(value);
  if (!answers) return { status: "error" };
  if (answers.overallAudioPath && !isFeedbackAudioPath(answers.overallAudioPath, member.id)) {
    return { status: "error" };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("beta_survey_responses").insert({
    member_id: member.id,
    lessons_completed: completedLessonCount(member.courseProgress, FOUNDATION_WORLD),
    device: answers.device,
    disappointment: answers.disappointment,
    nps: answers.nps,
    appearance_score: answers.appearanceScore,
    appearance_why: answers.appearanceWhy,
    courses_score: answers.coursesScore,
    courses_why: answers.coursesWhy,
    usefulness_score: answers.usefulnessScore,
    usefulness_why: answers.usefulnessWhy,
    overall_message: answers.overallMessage,
    overall_audio_path: answers.overallAudioPath,
  });
  // Already answered, for example from another tab: their answers are safe.
  if (error && error.code !== UNIQUE_VIOLATION) return { status: "error" };

  revalidatePath("/dashboard");
  return { status: "saved" };
}

/** Saves the name a member leaves on the thank-you screen, on their own survey row. */
export async function saveBetaSurveyContact(
  value: unknown,
): Promise<{ status: "saved" | "error" }> {
  const member = await requireMember();
  const contactName = parseBetaSurveyContact(value);
  if (!contactName) return { status: "error" };

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("beta_survey_responses")
    .update({ contact_name: contactName })
    .eq("member_id", member.id)
    .select("id");
  return error || data.length === 0 ? { status: "error" } : { status: "saved" };
}
