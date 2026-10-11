import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CircleAlert, CircleCheck } from "lucide-react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { SubmitButton } from "@/components/auth/submit-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getMember, requireMember } from "@/lib/auth";
import { CONTACT_EMAIL } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";
import { DEFAULT_TRACK, TRACK_INFO, TRACKS } from "@/lib/tracks";
import { changeTrack, signOut } from "../actions";

export async function generateMetadata(): Promise<Metadata> {
  const track = (await getMember())?.track ?? DEFAULT_TRACK;
  return { title: getDictionary(track).dashboard.account.title };
}

const linkClass = "font-semibold text-primary underline-offset-4 hover:underline";

export default async function AccountPage({ searchParams }: PageProps<"/dashboard/account">) {
  const [member, params] = await Promise.all([requireMember(), searchParams]);
  const dictionary = getDictionary(member.track);
  const t = dictionary.dashboard.account;
  const memberSince = new Intl.DateTimeFormat(TRACK_INFO[member.track].lang, {
    dateStyle: "long",
    timeZone: "Europe/Paris",
  }).format(new Date(member.memberSince));
  const rows: Array<[string, string]> = [
    [t.email, member.email],
    [t.signedInWith, member.provider === "google" ? t.google : t.password],
    [t.code, member.accessCode],
    [t.memberSince, memberSince],
  ];
  const deleteRequest = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.deleteSubject)}`;
  const notice =
    params["password"] === "updated"
      ? t.passwordUpdated
      : params["track"] === "updated"
        ? t.versionSaved
        : undefined;
  return (
    <>
      <h1 className="font-display text-3xl font-extrabold text-balance">{t.title}</h1>
      {notice && (
        <p
          role="status"
          className="mt-6 flex gap-2 rounded-xl bg-mint-soft p-4 text-sm text-foreground"
        >
          <CircleCheck className="mt-0.5 size-4 shrink-0 text-market-up" aria-hidden />
          {notice}
        </p>
      )}
      {params["track"] === "error" && (
        <p role="alert" className="mt-6 flex gap-2 rounded-xl bg-muted p-4 text-sm text-foreground">
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
          {t.versionError}
        </p>
      )}
      <section
        aria-labelledby="account-details"
        className="mt-8 rounded-3xl border border-border bg-surface p-6 shadow-soft"
      >
        <h2 id="account-details" className="font-display text-xl font-extrabold">
          {t.details}
        </h2>
        <dl className="mt-4 divide-y divide-border">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-3 sm:grid-cols-[12rem_minmax(0,1fr)]">
              <dt className="text-sm font-bold">{label}</dt>
              <dd className="min-w-0 text-sm break-words text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl>
        <SignOutButton
          action={signOut}
          label={dictionary.dashboard.logOut}
          pendingLabel={dictionary.dashboard.logOutPending}
          className="mt-6"
        />
      </section>
      <section
        aria-labelledby="account-version"
        className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-soft"
      >
        <h2 id="account-version" className="font-display text-xl font-extrabold">
          {t.version}
        </h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {t.versionText}
        </p>
        <form action={changeTrack} className="mt-4 flex flex-col gap-4">
          <RadioGroup
            name="track"
            defaultValue={member.track}
            aria-labelledby="account-version"
            className="gap-3 sm:grid-cols-2"
          >
            {TRACKS.map((track) => (
              <label
                key={track}
                htmlFor={`account-track-${track}`}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-4 transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-soft"
              >
                <RadioGroupItem id={`account-track-${track}`} value={track} />
                <Image
                  src={TRACK_INFO[track].flag}
                  alt=""
                  width={30}
                  height={20}
                  unoptimized
                  className="h-5 w-[30px] rounded-sm border border-border"
                />
                <span lang={TRACK_INFO[track].lang} className="text-sm">
                  <span className="block font-bold">{TRACK_INFO[track].country}</span>
                  <span className="block text-muted-foreground">
                    {TRACK_INFO[track].language} · {TRACK_INFO[track].currency}
                  </span>
                </span>
              </label>
            ))}
          </RadioGroup>
          <SubmitButton pendingLabel={t.versionSaving} variant="outline" className="w-fit">
            {t.versionSave}
          </SubmitButton>
        </form>
      </section>
      <section
        aria-labelledby="account-delete"
        className="mt-6 rounded-3xl border border-border p-6"
      >
        <h2 id="account-delete" className="font-display text-xl font-extrabold">
          {t.deleteTitle}
        </h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {t.deleteEmail}{" "}
          <a href={deleteRequest} className={linkClass}>
            {CONTACT_EMAIL}
          </a>{" "}
          {t.deleteFrom}{" "}
          <Link href="/privacy-policy" className={linkClass}>
            {t.deletePrivacy}
          </Link>{" "}
          {t.deleteRights}
        </p>
      </section>
    </>
  );
}
