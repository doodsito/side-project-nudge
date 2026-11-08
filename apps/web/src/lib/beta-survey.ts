export const BETA_SURVEY_DEVICES = ["mobile", "tablet", "computer"] as const;
export const BETA_SURVEY_DISAPPOINTMENTS = ["very", "somewhat", "not"] as const;
export const BETA_SURVEY_NPS_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
// Four choices on purpose: no middle answer, so testers have to take a side.
export const BETA_SURVEY_SCORES = [1, 2, 3, 4] as const;
export const BETA_SURVEY_TEXT_MAX_LENGTH = 2000;

export type BetaSurveyAnswers = {
  device: (typeof BETA_SURVEY_DEVICES)[number];
  disappointment: (typeof BETA_SURVEY_DISAPPOINTMENTS)[number];
  nps: number;
  appearanceScore: number;
  appearanceWhy: string | null;
  coursesScore: number;
  coursesWhy: string | null;
  usefulnessScore: number;
  usefulnessWhy: string | null;
  friction: string | null;
  frictionAudioPath: string | null;
  overallMessage: string | null;
  overallAudioPath: string | null;
};

function isOneOf<T>(values: readonly T[], value: unknown): value is T {
  return values.includes(value as T);
}

/** Empty text becomes null; undefined means the text is not valid. */
function optionalText(value: unknown): string | null | undefined {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") return undefined;
  const text = value.trim();
  if (text.length > BETA_SURVEY_TEXT_MAX_LENGTH) return undefined;
  return text || null;
}

/** Checks what the browser sent. Returns null if any answer is missing or not allowed. */
export function parseBetaSurveyAnswers(value: unknown): BetaSurveyAnswers | null {
  if (!value || typeof value !== "object") return null;
  const read = (key: string): unknown => Reflect.get(value, key);

  const device = read("device");
  const disappointment = read("disappointment");
  const nps = read("nps");
  const appearanceScore = read("appearanceScore");
  const coursesScore = read("coursesScore");
  const usefulnessScore = read("usefulnessScore");
  if (
    !isOneOf(BETA_SURVEY_DEVICES, device) ||
    !isOneOf(BETA_SURVEY_DISAPPOINTMENTS, disappointment) ||
    !isOneOf<number>(BETA_SURVEY_NPS_VALUES, nps) ||
    !isOneOf<number>(BETA_SURVEY_SCORES, appearanceScore) ||
    !isOneOf<number>(BETA_SURVEY_SCORES, coursesScore) ||
    !isOneOf<number>(BETA_SURVEY_SCORES, usefulnessScore)
  ) {
    return null;
  }

  const appearanceWhy = optionalText(read("appearanceWhy"));
  const coursesWhy = optionalText(read("coursesWhy"));
  const usefulnessWhy = optionalText(read("usefulnessWhy"));
  const friction = optionalText(read("friction"));
  const overallMessage = optionalText(read("overallMessage"));
  const frictionAudioPath = read("frictionAudioPath") ?? null;
  const audioPath = read("overallAudioPath") ?? null;
  if (
    appearanceWhy === undefined ||
    coursesWhy === undefined ||
    usefulnessWhy === undefined ||
    friction === undefined ||
    overallMessage === undefined ||
    (frictionAudioPath !== null && typeof frictionAudioPath !== "string") ||
    (friction !== null && frictionAudioPath !== null) ||
    (audioPath !== null && typeof audioPath !== "string") ||
    (overallMessage !== null && audioPath !== null)
  ) {
    return null;
  }

  return {
    device,
    disappointment,
    nps,
    appearanceScore,
    appearanceWhy,
    coursesScore,
    coursesWhy,
    usefulnessScore,
    usefulnessWhy,
    friction,
    frictionAudioPath,
    overallMessage,
    overallAudioPath: audioPath,
  };
}
