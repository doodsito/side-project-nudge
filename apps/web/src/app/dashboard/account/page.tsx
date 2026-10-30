import type { Metadata } from "next";
import Link from "next/link";
import { CircleAlert, CircleCheck } from "lucide-react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { SubmitButton } from "@/components/auth/submit-button";
import { FeedbackHeaderButton } from "@/components/shared/feedback-widget";
import { textLinkClass } from "@/components/shared/text-link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup } from "@/components/ui/radio-group";
import { TrackOption } from "@/components/shared/track-option";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { CONTACT_EMAIL } from "@/lib/brand";
import { getDictionary } from "@/lib/dictionaries";
import { TRACK_INFO, TRACKS } from "@/lib/tracks";
import { changeTrack, signOut } from "../actions";

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).dashboard.account.title };
}

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
        <Alert role="status" className="mt-6">
          <CircleCheck aria-hidden />
          <AlertDescription>{notice}</AlertDescription>
        </Alert>
      )}
      {params["track"] === "error" && (
        <Alert variant="destructive" className="mt-6">
          <CircleAlert aria-hidden />
          <AlertDescription>{t.versionError}</AlertDescription>
        </Alert>
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
        <div className="mt-5 border-t border-border pt-5 sm:hidden">
          <FeedbackHeaderButton
            label={dictionary.dashboard.feedback.trigger}
            className="h-11 w-full justify-start"
          />
        </div>
        <SignOutButton
          action={signOut}
          label={dictionary.dashboard.logOut}
          pendingLabel={dictionary.dashboard.logOutPending}
          className="mt-3 min-h-11 w-full justify-start sm:mt-6 sm:w-auto sm:justify-center"
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
              <TrackOption
                key={track}
                track={track}
                id={`account-track-${track}`}
                label={dictionary.tracks.options[track].country}
                detail={dictionary.tracks.options[track].detail}
              />
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
          <a href={deleteRequest} className={textLinkClass}>
            {CONTACT_EMAIL}
          </a>{" "}
          {t.deleteFrom}{" "}
          <Link href="/privacy-policy" className={textLinkClass}>
            {t.deletePrivacy}
          </Link>{" "}
          {t.deleteRights}
        </p>
      </section>
    </>
  );
}
