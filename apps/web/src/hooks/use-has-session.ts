"use client";

import { useSyncExternalStore } from "react";

// The Supabase session cookie: sb-<project>-auth-token, split into .0, .1… when
// long. Not the -code-verifier cookie left by a sign-up waiting for its email.
const SESSION_COOKIE = /(?:^|;\s*)sb-[^=]+-auth-token(?:\.\d+)?=/;

const subscribe = () => () => {};

/**
 * Whether this browser holds a session, read from the cookie without a network
 * call, so marketing pages stay static. False on the server and during the
 * first render. For display only: signed-in pages check the session themselves.
 */
export function useHasSession() {
  return useSyncExternalStore(
    subscribe,
    () => SESSION_COOKIE.test(document.cookie),
    () => false,
  );
}
