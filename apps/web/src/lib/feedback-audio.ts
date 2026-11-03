export const FEEDBACK_AUDIO_BUCKET = "feedback-audio";
export const FEEDBACK_AUDIO_MAX_SECONDS = 180;

const EXTENSIONS: Record<string, string> = { "audio/webm": "webm", "audio/mp4": "mp4" };

export function feedbackAudioExtension(type: string) {
  return Object.hasOwn(EXTENSIONS, type) ? EXTENSIONS[type] : undefined;
}

/** A path the server itself would create for this member: `<member id>/<uuid>.<extension>`. */
export function isFeedbackAudioPath(path: string, memberId: string) {
  const [folder, file, ...rest] = path.split("/");
  return (
    folder === memberId &&
    rest.length === 0 &&
    /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}\.(webm|mp4)$/.test(file ?? "")
  );
}
