import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ResetProgressSection } from "@/components/dashboard/reset-progress-section";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { SubmitButton } from "@/components/auth/submit-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup } from "@/components/ui/radio-group";
import { TrackOption } from "@/components/shared/track-option";
import { getMemberTrack, requireMember } from "@/lib/auth";
import { CONTACT_EMAIL } from "@/lib/brand";
import { totalCompletedLessonCount } from "@/lib/course-progress";
import { getDictionary } from "@/lib/dictionaries";
import { TRACK_INFO, TRACKS } from "@/lib/tracks";
import { changeTrack, signOut } from "../actions";

const listClassName =
  "overflow-hidden rounded-2xl border border-[var(--nudge-learn-neutral-200)] bg-[var(--nudge-learn-canvas)] px-3.5";
const rowClassName =
  "flex min-h-[60px] w-full items-center gap-3 px-0 py-[13px] text-left no-underline";
const iconClassName =
  "grid size-[34px] shrink-0 place-items-center rounded-[10px] bg-[var(--nudge-learn-white)]";

function ProfileIcon({ src }: { src: string }) {
  return (
    <span className={iconClassName} aria-hidden="true">
      <Image src={src} alt="" width={20} height={20} />
    </span>
  );
}

function RowChevron() {
  return (
    <Image
      src="/brand/portfolio/profile-open.svg"
      alt=""
      width={16}
      height={16}
      className="shrink-0"
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const track = await getMemberTrack();
  return { title: getDictionary(track).dashboard.account.title };
}

export default async function AccountPage({ searchParams }: PageProps<"/dashboard/account">) {
  const [member, params] = await Promise.all([requireMember(), searchParams]);
  const dictionary = getDictionary(member.track);
  const t = dictionary.dashboard.account;
  const emailName = member.displayName ?? member.email.split("@")[0]?.split(/[._+-]/)[0] ?? "";
  const displayName = emailName
    ? `${emailName[0]!.toLocaleUpperCase(TRACK_INFO[member.track].lang)}${emailName.slice(1)}`
    : t.title;
  const memberSince = new Intl.DateTimeFormat(TRACK_INFO[member.track].lang, {
    dateStyle: "long",
    timeZone: "Europe/Paris",
  }).format(new Date(member.memberSince));
  const trackSummary = `${dictionary.tracks.options[member.track].country} · ${member.track === "fr" ? "€" : "$"}`;
  const deleteRequest = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.deleteSubject)}`;
  const notice =
    params["password"] === "updated"
      ? t.passwordUpdated
      : params["track"] === "updated"
        ? t.versionSaved
        : undefined;

  return (
    <div
      data-dashboard-hide-mobile-header
      className="min-h-[calc(100svh-5rem-env(safe-area-inset-bottom))] bg-[var(--nudge-learn-white)] px-5 py-6 sm:mx-auto sm:min-h-0 sm:max-w-2xl sm:rounded-[28px] sm:px-8 sm:py-8"
    >
      <div className="flex flex-col gap-5">
        <header className="flex flex-col gap-[18px]">
          <h1 className="font-display text-base leading-[22px] font-extrabold text-[var(--nudge-learn-violet-700)]">
            {t.title}
          </h1>
          <div className="flex flex-col gap-[5px]">
            <h2 className="font-display text-base leading-[22px] font-extrabold text-[var(--nudge-learn-violet-700)]">
              {displayName}
            </h2>
            <p className="text-xs leading-4 font-bold break-words text-[var(--nudge-learn-violet-700)]">
              {member.email}
            </p>
            <p className="text-xs leading-4 font-bold text-[var(--nudge-learn-neutral-600)]">
              {t.memberSince} {memberSince}
            </p>
          </div>
        </header>

        {notice && (
          <Alert
            role="status"
            className="border-[var(--nudge-learn-neutral-200)] bg-[var(--nudge-learn-canvas)]"
          >
            <AlertDescription>{notice}</AlertDescription>
          </Alert>
        )}
        {params["track"] === "error" && (
          <Alert variant="destructive">
            <AlertDescription>{t.versionError}</AlertDescription>
          </Alert>
        )}

        <section aria-labelledby="profile-account-heading" className="flex flex-col gap-2">
          <h2
            id="profile-account-heading"
            className="font-display text-xs leading-4 font-bold text-[var(--nudge-learn-violet-700)]"
          >
            {t.myAccount}
          </h2>
          <div className={listClassName}>
            <details className="group">
              <summary
                className={`${rowClassName} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
              >
                <ProfileIcon src="/brand/portfolio/profile-person.svg" />
                <span className="flex min-w-0 flex-1 flex-col gap-[3px] text-xs leading-4 font-bold">
                  <span className="text-[var(--nudge-learn-violet-700)]">
                    {t.personalInformation}
                  </span>
                  <span className="break-words text-[var(--nudge-learn-neutral-600)]">
                    {t.code} · {member.accessCode}
                  </span>
                </span>
                <RowChevron />
              </summary>
              <dl className="grid gap-2 pb-4 pl-[46px] pr-1 text-xs">
                <div>
                  <dt className="font-bold text-[var(--nudge-learn-violet-700)]">
                    {t.signedInWith}
                  </dt>
                  <dd className="text-[var(--nudge-learn-neutral-600)]">
                    {member.provider === "google" ? t.google : t.password}
                  </dd>
                </div>
              </dl>
            </details>

            <div className="ml-[46px] mr-0 h-px bg-[var(--nudge-learn-neutral-200)]" />

            <details className="group">
              <summary
                className={`${rowClassName} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
              >
                <ProfileIcon src="/brand/portfolio/profile-version.svg" />
                <span className="flex min-w-0 flex-1 flex-col gap-[3px] text-xs leading-4 font-bold">
                  <span className="text-[var(--nudge-learn-violet-700)]">{t.version}</span>
                  <span className="text-[var(--nudge-learn-neutral-600)]">{trackSummary}</span>
                </span>
                <RowChevron />
              </summary>
              <div className="pb-4 pl-[46px] pr-1">
                <p className="mb-3 text-xs leading-4 text-[var(--nudge-learn-neutral-600)]">
                  {t.versionText}
                </p>
                <form action={changeTrack} className="flex flex-col gap-3">
                  <RadioGroup
                    name="track"
                    defaultValue={member.track}
                    aria-label={t.version}
                    className="gap-2"
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
              </div>
            </details>

            <div className="ml-[46px] mr-0 h-px bg-[var(--nudge-learn-neutral-200)]" />

            <Link
              href="/privacy-policy"
              className={`${rowClassName} text-[var(--nudge-learn-violet-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`}
            >
              <ProfileIcon src="/brand/portfolio/profile-help.svg" />
              <span className="min-w-0 flex-1 text-xs leading-4 font-bold">{t.helpPrivacy}</span>
              <RowChevron />
            </Link>
          </div>
        </section>

        <section aria-labelledby="profile-actions-heading" className="flex flex-col gap-2">
          <h2
            id="profile-actions-heading"
            className="font-display text-xs leading-4 font-bold text-[var(--nudge-learn-violet-700)]"
          >
            {t.actions}
          </h2>
          <div className={listClassName}>
            <ResetProgressSection
              mode="row"
              userId={member.id}
              title={t.resetTitle}
              text={t.resetText}
              action={t.resetAction}
              dialogTitle={t.resetDialogTitle}
              dialogText={t.resetDialogText(totalCompletedLessonCount(member.courseProgress))}
              confirm={t.resetConfirm}
              pendingLabel={t.resetPending}
              cancel={t.resetCancel}
              error={t.resetError}
            />
            <div className="ml-[46px] mr-0 h-px bg-[var(--nudge-learn-neutral-200)]" />
            <SignOutButton
              action={signOut}
              label={dictionary.dashboard.logOut}
              pendingLabel={dictionary.dashboard.logOutPending}
              iconSrc="/brand/portfolio/profile-logout.svg"
              mode="row"
              className="h-auto min-h-[60px] w-full justify-start gap-3 rounded-none px-0 py-[13px] text-xs leading-4 font-bold text-[var(--nudge-learn-violet-700)] hover:bg-transparent hover:text-[var(--nudge-learn-violet)]"
            />
            <div className="ml-[46px] mr-0 h-px bg-[var(--nudge-learn-neutral-200)]" />
            <Link
              href={deleteRequest}
              aria-label={`${t.deleteTitle}. ${t.deleteEmail} ${CONTACT_EMAIL}. ${t.deleteFrom} ${t.deletePrivacy} ${t.deleteRights}`}
              className={`${rowClassName} text-xs leading-4 font-bold text-[var(--nudge-learn-violet-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`}
            >
              <ProfileIcon src="/brand/learn-map/profile-delete.svg" />
              <span className="min-w-0 flex-1">{t.deleteTitle}</span>
              <RowChevron />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
