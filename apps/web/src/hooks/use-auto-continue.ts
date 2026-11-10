import { useEffect, useEffectEvent } from "react";

const AUTO_CONTINUE_DELAY = 1500;

/** After a correct answer, moves on by itself; the button still lets you go faster. */
export function useAutoContinue(active: boolean, onContinue: () => void) {
  const run = useEffectEvent(onContinue);

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(run, AUTO_CONTINUE_DELAY);
    return () => window.clearTimeout(timer);
  }, [active]);
}
