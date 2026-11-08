"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/integrations/supabase/server";
import { requireMember } from "@/lib/auth";
import { parseBetaSurveyAnswers } from "@/lib/beta-survey";
import { completedLessonCount, FOUNDATION_WORLD } from "@/lib/course-progress";
import { isFeedbackAudioPath } from "@/lib/feedback-audio";

const UNIQUE_VIOLATION = "23505";

/** Saves a member's beta survey, with how many World 1 lessons they had finished. */
export async function submitBetaSurvey(value: unknown): Promise<{ status: "saved" | "error" }> {
  const member = await requireMember();
  const answers = parseBetaSurveyAnswers(value);
  if (!answers) return { status: "error" };
  const audioPaths = [answers.frictionAudioPath, answers.overallAudioPath];
  if (audioPaths.some((path) => path && !isFeedbackAudioPath(path, member.id))) {
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
    friction: answers.friction,
    friction_audio_path: answers.frictionAudioPath,
    overall_message: answers.overallMessage,
    overall_audio_path: answers.overallAudioPath,
  });
  // Already answered, for example from another tab: their answers are safe.
  if (error && error.code !== UNIQUE_VIOLATION) return { status: "error" };

  revalidatePath("/dashboard");
  return { status: "saved" };
}
