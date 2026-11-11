# Compacte et anime les CTA de la bêta

- **Date:** 2026-11-11
- **Author:** Emma, with Codex
- **Pull request:** Pending

**Why:** Le parcours devait démarrer plus directement sur téléphone, et la demande d’avis prenait trop de place.

**What changed:** Header mobile masqué dans l’aperçu; avis réduit; les CTA principaux ont un shimmer Nudge lent de 4 secondes, désactivé si l’utilisateur réduit les animations.

**Files:** `apps/web/src/app/dev/dashboard-preview/page.tsx`, `apps/web/src/app/dashboard/page.tsx`, `apps/web/src/components/dashboard/beta-survey-cta.tsx`, `apps/web/src/components/dashboard/dashboard-template.tsx`, `apps/web/src/components/layout/beta-colors.css`, `apps/web/src/components/ui/button.tsx`, `apps/web/src/styles.css`

**Checked:** lint et typecheck passent. Le build local bloque sur Turbopack et l’accès réseau aux Google Fonts.

**Next:** Ouvrir la PR et vérifier ses checks.
