# Compacte l’entrée de la bêta sur mobile

- **Date:** 2026-11-11
- **Author:** Emma, with Codex
- **Pull request:** Pending

**Why:** Le parcours devait démarrer plus directement sur téléphone, et la demande d’avis prenait trop de place.

**What changed:** Le header mobile disparaît aussi dans l’aperçu du parcours. La carte d’avis tient sur une ligne, avec le texte secondaire masqué sur petit écran.

**Files:** `apps/web/src/app/dev/dashboard-preview/page.tsx`, `apps/web/src/app/dashboard/page.tsx`, `apps/web/src/components/dashboard/beta-survey-cta.tsx`, `apps/web/src/components/dashboard/dashboard-template.tsx`, `apps/web/src/components/layout/beta-colors.css`

**Checked:** lint et typecheck passent. Le build bloque sur Turbopack et l’accès réseau aux Google Fonts.

**Next:** Relancer le build avec l’accès réseau requis, puis ouvrir la PR.
