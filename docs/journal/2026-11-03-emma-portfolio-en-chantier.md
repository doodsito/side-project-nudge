# Finaliser le parcours bêta et le portefeuille

- **Date:** 2026-11-03
- **Author:** Emma, avec Codex
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/78

**Why:** Présenter le portefeuille virtuel comme bientôt disponible, avec le visuel final choisi dans Figma.
**What changed:**
- Met à jour l’écran Portefeuille et sa navigation mobile selon le frame Figma final.
- Retire le bouton de feedback en doublon dans l’en-tête du dashboard.
- Reprend la Learn map Figma sans le monde 0 et ajoute l’écran de notation par étoiles.
- Rend les états « returning » et « lesson-feedback » visibles dans l’aperçu Vercel.
**Files:** `apps/web/src/app/dashboard/portfolio/page.tsx`, `apps/web/src/components/dashboard/`, `apps/web/src/lib/dictionaries/`
**Checked:** lint, typecheck et build passent.
**Next:** Vérifier l’aperçu GitHub sur desktop et mobile.
