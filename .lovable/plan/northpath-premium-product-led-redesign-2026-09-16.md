# Northpath premium product-led redesign

## Goal
Transform the existing Northpath homepage into the supplied practice-first experience, while preserving the working signup integration, analytics, routes, configuration, and brand foundation.

## Homepage
- Replace the current section composition with the requested narrative: premium sticky navigation, product-led hero, editorial waiting-cost story, numbered benefits, three-step method, interactive challenge, before/after transformation, FAQ, immersive practice call-to-action, early access, and footer.
- Use the supplied wording and retain Northpath’s warm off-white, near-black, indigo, and mint identity while making the visual hierarchy more editorial and cohesive.
- Build a new animated product window with an illustrative six-month chart, count-up portfolio value, sequential stats, and restrained depth.
- Make all practice actions navigate client-side to `/practice`; keep `/demo` available as a compatible entry point.
- Preserve the current saved early-access flow and present it inline in the requested final section.

## Practice experience
- Add a complete four-stage `/practice` journey: learning profile, simulated portfolio decision, deterministic profile-aware feedback, and reasoning summary.
- Store the four profile answers, selected decision, current step, and feedback state in React state only.
- Vary the educational explanation meaningfully for short versus long horizons, weaker versus stronger safety buffers, volatility response, investing routine, and selected decision.
- Include replay, profile editing, home navigation, educational disclaimers, animated progress, and mobile-first layouts.

## Motion, access, and verification
- Reuse and extend the lightweight IntersectionObserver/CSS animation approach instead of adding a heavy animation dependency.
- Add staggered reveals, chart drawing, number animation, selected-card feedback, navbar scroll treatment, smooth accordion behavior, and restrained button/card motion.
- Respect reduced-motion settings, keyboard access, focus visibility, semantic landmarks, contrast, and comfortable touch targets.
- Test every homepage anchor, challenge answer, practice branch, signup state, FAQ, old `/demo` entry, and responsive layout; finish with clean build and browser diagnostics.

## Technical details
- Split the homepage and practice journey into focused reusable components rather than growing one route file.
- Add route-specific metadata for `/practice`; preserve existing homepage metadata and structured FAQ data with updated copy.
- Keep database schemas and signup RPCs unchanged unless verification proves a repair is required.
