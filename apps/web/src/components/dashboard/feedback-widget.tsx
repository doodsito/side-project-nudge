"use client";

import {
  createContext,
  useActionState,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CircleAlert, CircleCheck, MessageSquarePlus } from "lucide-react";
import { submitFeedback, type FeedbackFormState } from "@/app/dashboard/actions";
import { SubmitButton } from "@/components/auth/submit-button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

const FEEDBACK_CATEGORIES = ["bug", "idea", "other"] as const;
type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

const openFeedbackContext = createContext<(() => void) | null>(null);

const initialState: FeedbackFormState = {};

/**
 * Wraps the whole dashboard: owns the feedback Dialog (floating button to
 * open it) and lets `FeedbackHeaderButton`, anywhere inside, open the same
 * Dialog through context. Radix unmounts `DialogContent` while closed, so
 * `FeedbackForm` always starts fresh the next time it opens.
 */
export function FeedbackProvider({
  t,
  children,
}: {
  t: Dictionary["dashboard"]["feedback"];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <openFeedbackContext.Provider value={() => setOpen(true)}>
      {children}
      <Button
        type="button"
        size="icon"
        aria-label={t.trigger}
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-40 hidden h-14 w-14 rounded-full shadow-lift sm:inline-flex"
      >
        <MessageSquarePlus className="size-6" aria-hidden />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
            <DialogDescription>{t.intro}</DialogDescription>
          </DialogHeader>
          <FeedbackForm t={t} />
        </DialogContent>
      </Dialog>
    </openFeedbackContext.Provider>
  );
}

/** The form itself: a fresh instance every time the Dialog mounts it. */
function FeedbackForm({ t }: { t: Dictionary["dashboard"]["feedback"] }) {
  const [category, setCategory] = useState<FeedbackCategory>("idea");
  const [message, setMessage] = useState("");
  const [state, formAction] = useActionState(submitFeedback, initialState);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state.error) textareaRef.current?.focus();
  }, [state]);

  if (state.success) {
    return (
      <Alert role="status">
        <CircleCheck aria-hidden />
        <AlertDescription>{t.success}</AlertDescription>
      </Alert>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <RadioGroup
        name="category"
        value={category}
        onValueChange={(value) => setCategory(value as FeedbackCategory)}
        aria-label={t.categoryLegend}
        className="grid-cols-3 gap-2"
      >
        {FEEDBACK_CATEGORIES.map((key) => (
          <label
            key={key}
            htmlFor={`feedback-category-${key}`}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-border p-3 text-sm transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-soft"
          >
            <RadioGroupItem id={`feedback-category-${key}`} value={key} />
            {t.categories[key]}
          </label>
        ))}
      </RadioGroup>
      <div>
        <label htmlFor="feedback-message" className="mb-2 block text-sm font-bold">
          {t.messageLabel}
        </label>
        <Textarea
          ref={textareaRef}
          id="feedback-message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          maxLength={2000}
          rows={4}
          placeholder={t.messagePlaceholder}
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "feedback-message-error" : undefined}
        />
      </div>
      {state.error && (
        <Alert variant="destructive" id="feedback-message-error" aria-live="polite">
          <CircleAlert aria-hidden />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      <DialogFooter>
        <SubmitButton pendingLabel={t.submitPending}>{t.submit}</SubmitButton>
      </DialogFooter>
    </form>
  );
}

/** Opens the dashboard's feedback dialog from the desktop header or mobile Account page. */
export function FeedbackHeaderButton({ label, className }: { label: string; className?: string }) {
  const openFeedback = useContext(openFeedbackContext);
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => openFeedback?.()}
      className={cn("h-10 px-4 text-sm", className)}
    >
      <MessageSquarePlus aria-hidden /> {label}
    </Button>
  );
}
