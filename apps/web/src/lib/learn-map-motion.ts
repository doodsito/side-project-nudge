export function recordLearnMapLessonCompletion(userId: string, lessonNumber: number) {
  try {
    const key = `nudge:learn-map-motion:${userId}`;
    const current: unknown = JSON.parse(window.sessionStorage.getItem(key) ?? "null");
    const completed =
      current && typeof current === "object" && Array.isArray(Reflect.get(current, "completed"))
        ? (Reflect.get(current, "completed") as unknown[]).filter(
            (value): value is number => typeof value === "number",
          )
        : [];
    if (!completed.includes(lessonNumber)) completed.push(lessonNumber);
    window.sessionStorage.setItem(key, JSON.stringify({ completed }));
  } catch {
    // Motion is decorative; storage failures must not affect lesson completion.
  }
}

export function recordLearnMapWorldCompletion(userId: string) {
  try {
    window.sessionStorage.setItem(`nudge:learn-map-world-complete:${userId}`, "pending");
  } catch {
    // Motion is decorative; storage failures must not affect lesson completion.
  }
}
