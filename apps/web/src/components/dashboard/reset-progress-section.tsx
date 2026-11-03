"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CircleAlert, LoaderCircle } from "lucide-react";
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

  return (
    <section aria-labelledby="account-reset" className="mt-6 rounded-3xl border border-border p-6">
      <h2 id="account-reset" className="font-display text-xl font-extrabold">
        {title}
      </h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">{text}</p>
      <Button type="button" variant="outline" className="mt-4" onClick={() => setOpen(true)}>
        {action}
      </Button>
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
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => setOpen(false)}
            >
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
    </section>
  );
}
