# Anime le bouton de démarrage de leçon

- **Date:** 2026-11-11
- **Author:** Emma, with Codex
- **Pull request:** https://github.com/doodsito/side-project-nudge/pull/90

**Why:** Le bouton « Commencer la leçon » du parcours utilisait un lien personnalisé et n’avait pas reçu le shimmer des boutons principaux.

**What changed:** Le bouton de la carte de leçon reprend le reflet Nudge de gauche à droite, sur 4 secondes.

**Files:** `apps/web/src/components/dashboard/world-one-path.tsx`

**Checked:** lint et typecheck passent; build local bloqué par une erreur interne Turbopack. CI et aperçu Vercel à vérifier.

**Next:** Vérifier les checks et l’aperçu de la PR.
