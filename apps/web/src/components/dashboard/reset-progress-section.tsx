"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CircleAlert, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { resetCourseProgress } from "@/app/dashboard/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { clearLearnLocalState } from "@/lib/learn-map-motion";

/** The Account page's reset section: confirms, erases the progress, then restarts from the dashboard. */
export function ResetProgressSection({
  userId,
  title,
  text,
  action,
  dialogTitle,
  dialogText,
  confirm,
  pendingLabel,
  cancel,
  error,
  mode = "section",
}: {
  userId: string;
  title: string;
  text: string;
  action: string;
  dialogTitle: string;
  dialogText: string;
  confirm: string;
  pendingLabel: string;
  cancel: string;
  error: string;
  mode?: "section" | "row";
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  function reset() {
    setFailed(false);
    startTransition(async () => {
      const { status } = await resetCourseProgress();
      if (status === "error") {
        setFailed(true);
        return;
      }
      clearLearnLocalState(userId);
      router.push("/dashboard");
    });
  }

  const dialog = (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (pending) return;
        setOpen(next);
        setFailed(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogText}</DialogDescription>
        </DialogHeader>
        {failed && (
          <Alert variant="destructive" aria-live="polite">
            <CircleAlert aria-hidden />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" disabled={pending} onClick={() => setOpen(false)}>
            {cancel}
          </Button>
          <Button type="button" variant="destructive" disabled={pending} onClick={reset}>
            {pending ? (
              <>
                <LoaderCircle className="animate-spin" aria-hidden /> {pendingLabel}
              </>
            ) : (
              confirm
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (mode === "row") {
    return (
      <>
        <Button
          type="button"
          variant="ghost"
          className="flex h-auto min-h-[60px] w-full items-center justify-start gap-3 rounded-none px-0 py-[13px] text-xs leading-4 font-bold text-[var(--nudge-learn-violet-700)] hover:bg-transparent hover:text-[var(--nudge-learn-violet)]"
          onClick={() => setOpen(true)}
        >
          <span className="grid size-[34px] shrink-0 place-items-center rounded-[10px] bg-white">
            <Image src="/brand/learn-map/profile-reset.svg" alt="" width={20} height={20} />
          </span>
          <span className="min-w-0 flex-1 text-left">{action}</span>
          <Image
            src="/brand/learn-map/profile-chevron-right.svg"
            alt=""
            width={16}
            height={16}
            className="shrink-0"
          />
        </Button>
        {dialog}
      </>
    );
  }

  return (
    <section aria-labelledby="account-reset" className="mt-6 rounded-3xl border border-border p-6">
      <h2 id="account-reset" className="font-display text-xl font-extrabold">
        {title}
      </h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">{text}</p>
      <Button type="button" variant="outline" className="mt-4" onClick={() => setOpen(true)}>
        {action}
      </Button>
      {dialog}
    </section>
  );
}
