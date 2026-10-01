# Nudge — revue du prototype, phase 2

**Mise à jour du 1er octobre 2026 :** la PR #9 a ensuite été fusionnée. La nouvelle direction est publiée sur `/nudge-next` ; une nouvelle PR propose de l’afficher aussi sur la page d’accueil. Les notes ci-dessous décrivent la première revue du prototype.

Preview Vercel de la branche : https://side-project-nudge-git-emma-nudge-next-doodsito.vercel.app/nudge-next (connexion Vercel requise). La preview locale reste disponible sur http://127.0.0.1:3002/nudge-next tant que le serveur local est ouvert.

À la date de cette revue, le site public n’avait pas été modifié. La première publication concernait uniquement la preview de la branche `emma/nudge-next`, avant sa fusion dans `main`. L’ouverture de la pull request avait d’abord été refusée par les permissions du connecteur GitHub. Le bloc de variables CSS était limité au sélecteur `.nx-page` et ne s’appliquait alors qu’à la preview. Les composants, le favicon et la feuille de style de cette route étaient distincts de ceux du site principal de l’époque.

## Direction

« Le déclic » : rendre l’investissement manipulable et compréhensible. Un N plié sert de signature ; ses coupes obliques se retrouvent dans la languette d’explication et les étapes de progression. Le violet franc porte la marque, le lilas accueille l’expérience, le citron signale une compréhension. Space Grotesk donne la voix d’affichage et les chiffres ; DM Sans porte les explications. Un assemblage bref anime le signe à l’arrivée. Les autres transitions répondent aux choix ; le mode de mouvement réduit désactive ces animations.

## Ce qui fonctionne dans la preview

- Anglais par défaut ; français complet dans un dictionnaire typé. Les choix, la réponse au quiz, le sujet ouvert et la progression survivent au changement de langue. Les nombres utilisent `Intl.NumberFormat`.
- Cas d’Alex conservé : montant initial de 10 000 €, baisse fictive de 10 %, versement prévu de 500 € ; trois décisions et trois explications différentes.
- Le graphique distingue perte de marché et apport. Bouton de comparaison désactivé sans choix, retour possible, feedback de compréhension et focus après décision.
- Exploration du marché, du temps et de la diversification. Ce sont des explications interactives de notions, pas trois parcours complets.
- Progression réelle de la session : décision examinée, réponse comprise, notion explorée. Un rechargement remet le parcours à zéro, annoncé dans l’interface.

## Assets originaux

1. Signe N vectoriel, réutilisé dans la navigation et le parcours ; sa version compacte reprend les bandes, les plis et quelques stries du hero.
2. Favicon propre à la route d’exploration, avec la même silhouette simplifiée pour rester lisible en petit.
3. Grand ruban N à stries, plis et assemblage CSS.
4. Diagramme marché → contexte → décision, à trois languettes obliques.
5. Illustration temporelle avec unités égales pour 1 et 12 ans.
6. Diagramme de diversification, une position contre quatre parts égales.
7. Graphique proportionnel de baisse et d’apport, annoté et relié aux choix.
8. Parcours à trois segments obliques et languette de compréhension.

Les assets sont réalisés en SVG/CSS. Aucun raster généré, aucune photo de banque d’images, aucune dépendance visuelle ajoutée. Les icônes utilitaires viennent de Lucide, déjà installé ; elles ne sont pas présentées comme des créations originales. Les polices libres sont servies par le mécanisme `next/font` existant.

## Données et hypothèses

Aucune donnée historique, cotation en direct, performance réelle ou prévision n’est utilisée. Le cas reprend `src/lib/practice-case.ts` du dépôt fourni. Le calcul est : 10 000 × (1 − 0,10) = 9 000. Selon le choix, on ajoute 0, 500 ou 1 000 €. Le montant augmenté de 1 000 € est une hypothèse propre à cette démonstration, affichée dans l’option et les notes. Aucun mouvement ultérieur, frais ou impôt n’est modélisé. L’argent disponible reste distinct de la valeur investie.

La diversification compare une position à quatre parts égales : une position perd la moitié de sa valeur, les autres restent stables. Les pertes combinées illustratives sont donc 50 % et 12,5 %. Le texte précise que les placements peuvent aussi baisser ensemble. Le diagramme temporel compare des durées et ne promet aucun rendement. Les hypothèses sont accessibles dans l’interface.

## Auto-critique demandée

| Question | Appréciation |
| --- | --- |
| 01. Un vrai produit grand public ? | Oui pour l’entrée directe et le cas manipulable ; la bibliothèque reste volontairement petite. |
| 02. Création visuelle ou assemblage ? | Le N, ses plis, les trois schémas et le parcours sont originaux. Les contrôles de formulaire restent conventionnels. |
| 03. L’investissement devient-il tangible ? | Oui : la personne voit exactement ce qui relève du marché et de son apport. |
| 04. Un point de vue identifiable ? | Le N plié, le violet affirmé et les segments obliques constituent un début de langage reconnaissable. |
| 05. Un produit vivant ? | L’arrivée du signe, les réponses et le parcours donnent du mouvement sans boucle décorative. L’animation reste volontairement légère. |
| 06. L’interface reste-t-elle compréhensible ? | Les choix nomment leurs effets et les montants sont directement étiquetés. La densité des explications mérite un test avec de vrais débutants. |
| 07. Qu’est-ce qui reste générique ? | La répartition titre/visuel du hero, certains boutons et la grande surface citron de progression sont encore des conventions. Le signe porte une part importante de la différence. |
| 08. Des cartes inutiles ? | Pas de grille de cartes ; un atelier encadre une interaction commune. La surface d’illustration distingue un objet à examiner. |
| 09. Chaque visuel sert-il un propos ? | Le hero exprime la marque ; les schémas expliquent une notion ; les segments représentent l’état réel. Le ruban n’est pas une donnée. |
| 10. Les données expliquent-elles ? | Oui, échelle commune depuis zéro, perte et apport séparés, hypothèses explicites. |
| 11. Une autre fintech pourrait-elle le reprendre tel quel ? | Les contrôles, oui ; le grand N et le langage des déclics nécessiteraient un changement d’identité. Ce n’est pas encore une identité complète et protégée. |
| 12. Des signes de template ou d’IA ? | Pas de gradients, objets 3D génériques, faux témoignages ou grille d’icônes. Le hero garde une structure de lecture familière à challenger pendant la revue. |

## Itérations avant présentation

- N initial trop ambigu : réalignement de la troisième bande et simplification des plis pour retrouver une lettre lisible.
- Petite promesse superposée au ruban : suppression de sa répétition dans le hero pour préserver le contraste et la hiérarchie.
- Motif marché pouvant évoquer une baisse suivie d’un rebond : remplacement par un schéma de décision sans trajectoire de prix.
- Repère de 1 an : alignement sur la largeur d’une unité de la frise de 12 ans.
- Repli étroit : déplacement et réduction du ruban pour dégager le texte. Ce garde-fou ne constitue pas un déploiement responsive exhaustif.

## Vérifications

- `npm run lint` : aucune erreur ; un avertissement préexistant sur l’image du logo de production, laissée intacte.
- `npm run typecheck` et `npm run build` : réussis après les refinements.
- Huit tests Node réussis, dont le test existant parcourant 243 combinaisons de profil/décision, et les nouveaux contrôles de calcul et de couverture EN/FR.
- Navigateur : trois décisions, retour au choix, réponse erronée puis correcte, changement EN/FR sans perte d’état, exploration des notions et progression à 3/3.
- Revue à 1440 px ; vérification de repli à 390 px. Aucun audit UX exhaustif ni mesure Core Web Vitals en conditions réelles.
- Pas d’erreur console relevée sur la version de preview compilée.

## Limites à garder pour la revue

La navigation et les montants de la preview sont bilingues ; les surfaces globales existantes, notamment les réglages de consentement, restent celles du site de base et ne sont pas retraduites. La progression n’est pas sauvegardée après rechargement. Il n’y a ni compte ni service de recommandation. Le système de marque, le motion design complet, le responsive final et les autres pages attendent une validation de cette direction.

## Captures

Les six fichiers sont dans `../../artifacts/nudge-next/` :

- `01-first-viewport.jpg` — première vue desktop.
- `02-hero-system.jpg` — système visuel du hero.
- `03-product-interaction.jpg` — choix, explication et quiz.
- `04-financial-visualisation.jpg` — baisse et apport distincts.
- `05-learning-exploration.jpg` — traitement des notions.
- `06-progress.jpg` — progression complétée dans la session.

Pour relancer localement : `npm run build`, puis `npm run start -w @nudge/web -- --hostname 127.0.0.1 --port 3002` depuis `app-source`.
