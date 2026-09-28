import { createFileRoute, Navigate } from "@tanstack/react-router";
import { BRAND } from "@/lib/brand";
export const Route = createFileRoute("/demo")({
  head: () => ({ meta: [
    { title: `Try the ${BRAND} Practice Demo` },
    { name: "description", content: "Enter Nudge’s complete educational investing simulation with virtual money." },
    { property: "og:title", content: `Try the ${BRAND} Practice Demo` },
    { property: "og:description", content: "Build a learning profile and practise an investing decision before real money is involved." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: () => <Navigate to="/practice" replace />,
});
