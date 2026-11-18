import "server-only";

// A V2 deployment must opt in and use an isolated Supabase project. A branch
// or Vercel preview alone does not isolate user metadata in shared Supabase.
export function canUseV2Lessons() {
  return (
    process.env["VERCEL_ENV"] !== "production" &&
    process.env["V2_LESSONS_ENABLED"] === "true" &&
    process.env["V2_DATA_ISOLATED"] === "true"
  );
}
