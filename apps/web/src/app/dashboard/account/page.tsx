import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { SignOutButton } from "@/components/molecules/sign-out-button";
import { requireMember } from "@/lib/auth";
import { BRAND, CONTACT_EMAIL } from "@/lib/brand";
import { signOut } from "../actions";

export const metadata: Metadata = { title: "Account" };

const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";

export default async function AccountPage({ searchParams }: PageProps<"/dashboard/account">) {
  const [member, params] = await Promise.all([requireMember(), searchParams]);
  const memberSince = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeZone: "Europe/Paris",
  }).format(new Date(member.memberSince));
  const rows: Array<[string, string]> = [
    ["Email", member.email],
    ["Signed in with", member.provider === "google" ? "Google" : "Email and password"],
    ["Access code", member.accessCode],
    ["Member since", memberSince],
  ];
  const deleteRequest = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Delete my ${BRAND} account`)}`;
  return (
    <>
      <h1 className="font-display text-3xl font-extrabold text-balance">Account</h1>
      {params["password"] === "updated" && (
        <p
          role="status"
          className="mt-6 flex gap-2 rounded-xl bg-mint-soft p-4 text-sm text-foreground"
        >
          <CircleCheck className="mt-0.5 size-4 shrink-0 text-market-up" aria-hidden />
          Password updated. Use it next time you sign in.
        </p>
      )}
      <section
        aria-labelledby="account-details"
        className="mt-8 rounded-3xl border border-border bg-surface p-6 shadow-soft"
      >
        <h2 id="account-details" className="font-display text-xl font-extrabold">
          Your details
        </h2>
        <dl className="mt-4 divide-y divide-border">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-3 sm:grid-cols-[12rem_minmax(0,1fr)]">
              <dt className="text-sm font-bold">{label}</dt>
              <dd className="min-w-0 text-sm break-words text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl>
        <SignOutButton action={signOut} className="mt-6" />
      </section>
      <section
        aria-labelledby="account-delete"
        className="mt-6 rounded-3xl border border-border p-6"
      >
        <h2 id="account-delete" className="font-display text-xl font-extrabold">
          Delete your account
        </h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
          Email{" "}
          <a href={deleteRequest} className={linkClass}>
            {CONTACT_EMAIL}
          </a>{" "}
          from the address above. We delete your account and its data within one month. See the{" "}
          <Link href="/privacy-policy" className={linkClass}>
            Privacy policy
          </Link>{" "}
          for your other rights.
        </p>
      </section>
    </>
  );
}
