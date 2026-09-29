import { redirect } from "next/navigation";

// Old address of the practice flow, kept so existing links still work.
export default function DemoPage() {
  redirect("/practice");
}
