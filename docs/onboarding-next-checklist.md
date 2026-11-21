# Checklist de la prochaine itération de l’onboarding

- [x] Maquetter dans Figma deux versions du rappel Nudge inspirées de Brilliant. Pour un compte qui n’a commencé aucune leçon, montrer Poggo et un bouton **Commencer le Monde 0**. Pour un compte qui a déjà commencé, afficher la progression réelle et un bouton **Reprendre ma leçon**. [Démarrage](https://www.figma.com/design/pSYrI208fCfrE0N238pOAZ/Nudge-Learn-Map-Redesign?node-id=608-605) · [Reprise](https://www.figma.com/design/pSYrI208fCfrE0N238pOAZ/Nudge-Learn-Map-Redesign?node-id=608-632)
- [ ] Envoyer le rappel à l’heure locale choisie avec l’objet **C’est l’heure de ta minute investissement**. Utiliser aussi cette phrase comme titre dans la maquette Figma.
- [ ] Définir la cadence des rappels. Utiliser l’adresse d’inscription après activation explicite. Prévoir la modification de l’heure et la désactivation depuis le compte et l’e-mail.
- [ ] Réutiliser Resend, déjà en place pour les e-mails de compte. Choisir un planificateur qui respecte les fuseaux horaires. Vérifier la progression et l’activation juste avant l’envoi et empêcher les doublons.
- [ ] Tester un rappel de démarrage et un rappel de reprise sur des adresses de test. Vérifier les liens, le rendu mobile et les versions FR et US avant de lancer les envois.
- [x] Créer les illustrations de Poggo par étape. Travailler l’animation des cartes et le son à la sélection, avec une option muette et les préférences de mouvement réduit.
- [ ] Mesurer la fin de l’onboarding, le démarrage du Monde 0 et le retour en leçon après un rappel, avec les outils de mesure déjà autorisés.

## Travail de la branche `emma/onboarding-brand-poggo`

- Reprendre l’onboarding existant et ses poses Poggo sans changer le parcours ni les migrations.
- Pour l’onboarding, suivre l’e-mail Figma : titres d’étape Roboto Bold à 26 px ; textes, options et boutons en Inter avec une graisse adaptée.
- Utiliser les tokens de la palette C : violet d’action, or pédagogique, teal de progression, fond lavande, cartes blanches et encre.
- Ajouter la pose `nudge-walk.webp` depuis le pack d’illustrations et varier les poses et leur placement par écran.
- Sur l’écran final, animer Poggo et des billets SVG sans montant. L’animation est brève et respecte le mouvement réduit.
- Fichiers concernés : `apps/web/src/app/layout.tsx`, `apps/web/src/styles.css`, `apps/web/src/components/onboarding/onboarding-flow.tsx`, `apps/web/src/components/onboarding/onboarding-celebration.tsx`, `apps/web/src/components/dashboard/course-worlds.tsx`, `apps/web/src/components/dashboard/worlds-home.module.css`, `apps/web/public/brand/mascot/nudge-walk.webp`, `apps/web/public/assets/poggo/poggo-onboarding-celebrate.png`, `apps/web/package.json`, `package-lock.json`.

## Consigne pour Codex

Mène le travail de bout en bout, sans demander de validation intermédiaire à Emma. Prends les décisions courantes, résous les problèmes et vérifie le résultat. Préviens Emma une fois le travail terminé, avec les liens et les vérifications effectuées. Interromps-la uniquement si une action exige son autorisation ou si un blocage ne peut pas être résolu de ton côté.
