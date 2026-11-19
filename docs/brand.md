# Nudge — Guide de marque

Référence pour écrire, concevoir et illustrer Nudge. Mise à jour le 19 novembre 2026 à partir du dépôt local. Les éléments de la V0 d’onboarding et les rappels par e-mail sont des travaux en cours.

## Produit et public

**Nudge est une app mobile-first qui apprend à investir par la pratique.** On part d’une situation réaliste, on prend une décision avec de l’argent virtuel, puis on comprend ses effets et les compromis qu’elle implique.

Le public prioritaire découvre l’épargne et l’investissement. Cela inclut des étudiants qui approchent de la vie active et des jeunes professionnels qui commencent à gagner leur vie. Le premier salaire, une dépense imprévue et un objectif à financer sont des situations d’entrée documentées. Le statut étudiant ne conditionne pas l’accès.

| Élément                                  | Référence                                                         |
| ---------------------------------------- | ----------------------------------------------------------------- |
| Nom du produit                           | **Nudge**. Le mot-symbole peut afficher **nudge** en minuscules.  |
| Promesse FR observée sur la landing      | « Apprends à investir, simplement. »                              |
| Promesse US dans le dictionnaire du site | “Learn to invest, simply.”                                        |
| Signature anglaise dans le code          | “Learn to invest before your money is on the line.”               |
| Mécanique pédagogique                    | Situation → choix → conséquence → explication → prochaine action. |
| CTA de la landing locale                 | « Commencer à apprendre ».                                        |
| Site de référence                        | [nudge.doodsito.com](https://nudge.doodsito.com).                 |

Nudge fait de l’éducation financière. Toute simulation indique qu’elle est fictive et explicite ses hypothèses. Les contenus décrivent le risque, l’horizon, les frais et les compromis pertinents. Une baisse simulée ne permet pas de prédire un rebond. Les exemples ne donnent aucune consigne d’achat, recommandation individuelle ni promesse de rendement. Une simulation de portefeuille doit être présentée comme un exercice. L’onglet Portefeuille du parcours bêta affiche un aperçu. La landing évoque le portefeuille virtuel dans la proposition produit.

Sources du dépôt [Vision produit](product/product-vision.md) · [Parcours pré-lancement](product-journey.md) · [Constantes de marque](../apps/web/src/lib/brand.ts) · [Landing](../apps/web/src/components/marketing/landing-preview.tsx) · [Portefeuille bêta](../apps/web/src/app/dashboard/portfolio/page.tsx).

## Voix et textes

- **Chaleureuse, directe et crédible.** Tutoyer en français, employer des mots courants et expliquer les termes financiers quand ils deviennent utiles. Donner un exemple concret dès que possible.
- **Une action par écran.** Le libellé dit ce qui va se passer. « Commencer la leçon », « Reprendre la leçon », « Voir le raisonnement » et « Réessayer » sont des formulations utiles.
- **Encourager le raisonnement.** Dire ce qui change dans le scénario et laisser le choix de comparer. Féliciter un apprentissage ou une étape terminée. Éviter la pression à investir, les slogans génériques et les encouragements automatiques.
- **Distinguer sélection et résultat.** Confirmer un choix au moment du clic. Donner le feedback pédagogique après vérification, en texte et avec un repère visuel.
- **S’appuyer sur des faits vérifiables.** Les retours de bêta publiés doivent être authentiques, correctement attribués ou anonymisés. Présenter l’expérience de l’équipe et les logos avec leur contexte. Ne pas suggérer un partenariat ou une validation institutionnelle sans preuve.
- **Localiser le fond autant que le texte.** France par défaut, français et euros avec les exemples et enveloppes français. États-Unis en anglais américain, dollars et références américaines. Ajouter les mêmes clés dans les deux dictionnaires.

| Situation             | Exemple                                                                           |
| --------------------- | --------------------------------------------------------------------------------- |
| Présenter une action  | « Choisis quoi faire des 100 € restants. »                                        |
| Expliquer un enjeu    | « Si Alex a besoin de cette somme bientôt, la disponibilité de l’argent compte. » |
| Annoncer une leçon    | « Pourquoi s’intéresser à l’investissement ? »                                    |
| Résumer l’expérience  | « Choisis. Comprends. Recommence. »                                               |
| Adapter en anglais US | “Start World 0” ou “Continue learning”, selon le contexte.                        |

Les exemples d’action et d’explication sont des formulations de référence pour les prochains écrans. Les libellés en production restent dans les dictionnaires. Sources [FR](../apps/web/src/lib/dictionaries/fr.ts) · [US](../apps/web/src/lib/dictionaries/us.ts) · [Pays et langues](../apps/web/src/lib/tracks.ts) · [Principes UX](design/ux-principles.md).

## Identité visuelle

### Palette C approuvée

| Rôle                  | Couleur    | HEX       | Usage                                   |
| --------------------- | ---------- | --------- | --------------------------------------- |
| Action principale     | Violet 600 | `#6236E8` | CTA, hiérarchie, accents de marque      |
| Accent pédagogique    | Or 300     | `#E6B44A` | Repères, synthèses, contenus éditoriaux |
| Accent de progression | Teal 300   | `#2DC9BE` | Progression et petits détails           |
| Fond clair            | Lavande    | `#F3F0FF` | Surfaces de marque et parcours          |
| Surface de lecture    | Blanc      | `#FFFFFF` | Cartes, textes longs, formulaires       |
| Texte principal       | Encre      | `#222039` | Texte sur fond clair                    |
| Texte secondaire      | Neutre 600 | `#655F78` | Descriptions et détails utiles          |
| Bordure discrète      | Neutre 200 | `#E3DFEA` | Séparations et contours légers          |

Le rapport **60 violet / 30 or / 10 teal** guide les compositions de marque. La couleur secondaire sert à créer du contraste et à structurer les compositions plus détaillées. Elle est facultative. Une composition simple peut utiliser du violet dominant, des surfaces de lecture blanches et du teal réservé à l’action. Le rose appartient à Poggo. Les états succès, avertissement, erreur et information utilisent leurs propres couleurs et s’accompagnent d’un libellé, d’une icône ou d’un autre repère.

Pour un bouton violet, utiliser le libellé blanc, le violet 700 `#522ACD` au survol et le violet 800 `#4321AD` à l’appui. Sur les aplats or et teal, privilégier le texte encre. La référence fixe des contrastes de **4,5:1** pour le texte courant et **3:1** pour le grand texte et les limites essentielles des contrôles. Préserver un contour de focus visible. La Palette C est documentée pour le thème clair. Le code possède également des variables sombres.

Sources [Identité approuvée](design/brand-identity.md) · [Gammes et états](design/design-system.md) · [Référence Palette C](design/references/Nudge_Colour_System_C_Only.pdf).

### Logo, typographie et composants

- **Bascule** est le signe en usage. La forme violette repose sur un carré teal aux angles arrondis. Réutiliser le SVG ou le composant partagé. Les exports PNG et l’icône d’onglet sont disponibles dans le site.
- **Logo dans l’expérience.** Le signe sert de repère sur les surfaces de marque. Dans la direction Figma récente, l’onboarding et la leçon commencent directement par le contenu, avec la progression et les commandes utiles en haut.
- **Typographie en usage dans le web.** **Manrope** pour les titres, **Inter** pour le texte courant. **Space Grotesk** et **DM Sans** appartiennent à l’exploration « Le déclic » et à ses composants dédiés. Les règles de typographie tous supports, la zone de protection du logo et les tailles minimales restent à formaliser.
- **Composants web.** Réutiliser les primitives shadcn et les tokens sémantiques de `styles.css`. Le rayon de base dans le code est de 14 px avec la taille de police racine habituelle. Le bouton d’action `lg` fait 48 px et le `xl` 52 px. Ce sont des valeurs d’implémentation.
- **Iconographie et illustrations.** Réutiliser Lucide pour les icônes utilitaires et les SVG Nudge pour les repères du parcours. Les mondes ont leurs illustrations propres. Les graphiques pédagogiques utilisent des unités, échelles et légendes lisibles. Une courbe décorative ne doit pas suggérer un résultat financier.

Sources [Logo SVG](../apps/web/public/brand/nudge-bascule.svg) · [Composant logo](../apps/web/src/components/brand/nudge-logo.tsx) · [Décision Bascule](journal/2026-10-13-emma-bascule-logo.md) · [Tokens](../apps/web/src/styles.css) · [Règles UI](ui.md) · [Exploration Le déclic](nudge-next-brief.md).

## Poggo

Poggo est le cochon-tirelire rose et lilas de Nudge. Préserver son corps rond, sa fente de tirelire, ses yeux étoilés, ses sabots lilas et sa matière satinée. Le pack de référence garde la même silhouette et les mêmes proportions, avec un fond transparent. Laisser respirer la silhouette et garder les libellés et boutons entièrement visibles sur mobile.

| Pose        | Usage                                                                |
| ----------- | -------------------------------------------------------------------- |
| `welcome`   | Accueillir sur la landing ou au début de l’onboarding.               |
| `curious`   | Inviter à examiner une question sans donner d’indice sur la réponse. |
| `encourage` | Accompagner une explication ou une nouvelle tentative.               |
| `celebrate` | Marquer une leçon ou une étape terminée.                             |
| `guide`     | Attirer l’attention vers la prochaine action.                        |
| `walk`      | Évoquer la progression avec une pose fixe.                           |

Le pack recommande environ 80–160 px en UI et 220–360 px en hero, à adapter à l’espace. Utiliser un texte alternatif vide si l’illustration répète le contenu voisin. Donner un texte alternatif si elle apporte une information utile. La progression, la réussite et l’erreur restent lisibles sans la mascotte.

Le Hero possède des calques d’yeux préparés pour le clignement et les clins d’œil. Aligner les PNG transparents **1254 × 1254 px** dans le même carré. Conserver un seul état par œil et changer les calques sans fondu. Le PSD reste la source éditable. Pour le mouvement réduit, utiliser la pose statique. Les illustrations par étape et le son de sélection de l’onboarding restent à travailler.

Sources [Pack de poses et manifeste](<design/references/nudge-mascot-pack (1)/README.md>) · [Assets web](../apps/web/public/brand/mascot/) · [Calques d’animation](design/poggo/README.md) · [Assets animables](../apps/web/public/assets/poggo/prepared/) · [Note d’intégration landing](landing-waitlist-mascot.md).

## Application par surface

| Surface          | Direction                                                                                                                                                                                                                                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Landing          | Montrer rapidement la promesse et le produit. Donner la priorité au CTA et utiliser une capture ou Poggo pour expliquer l’expérience. Employer uniquement des retours de V0 authentiques.                                                                                                                                                                               |
| Apprendre        | Présenter la leçon accessible et sa prochaine action. Le Monde 0 introduit l’investissement, les intérêts composés et le risque. Le Monde 1 travaille les bases financières. Les autres mondes peuvent apparaître en aperçu avec leur état.                                                                                                                             |
| Leçon            | Préserver la place pour la situation, les choix et leurs conséquences. Garder visibles les commandes utiles et la progression. Éviter toute confusion entre récompense de jeu et résultat financier.                                                                                                                                                                    |
| Onboarding V0    | Direction locale. Questions courtes, cartes sélectionnables, Poggo, progression sans numéros visibles et arrivée au Monde 0. Le rappel est facultatif. Les préférences de durée et d’heure sont locales dans cette V0.                                                                                                                                                  |
| E-mail de rappel | Maquette Figma. Objet et titre **« C’est l’heure de ta minute investissement »**. Envoi prévu à l’adresse d’inscription, à l’heure locale choisie après activation. Lavande dominante, encart de texte blanc et un seul bouton teal à libellé encre. Selon la progression, **Commencer le Monde 0** ou **Reprendre ma leçon**. L’envoi automatique reste à implémenter. |

Sources [Monde 0 et parcours bêta](journal/2026-11-03-emma-world0-interactive-onboarding.md) · [Les huit mondes sur Home](journal/2026-11-11-emma-preview-sync-main.md) · [Illustrations et icônes du parcours](../apps/web/public/brand/learn-map/) · [Maquette Nudge](https://www.figma.com/design/pSYrI208fCfrE0N238pOAZ/Nudge-Learn-Map-Redesign?node-id=537-972). Les consignes de rappel sont consignées dans `docs/onboarding-next-checklist.md` sur la branche locale d’onboarding.

## Vérification avant publication

- La prochaine action est visible et compréhensible sur mobile.
- Les textes, les devises et les exemples correspondent au pays choisi.
- Le statut d’une fonction annoncée correspond à ce que la personne peut réellement utiliser.
- Les chiffres, captures, citations et logos ont une source vérifiable.
- La progression et les messages restent compréhensibles au clavier, sans perception des couleurs et avec le mouvement réduit.
- Les visuels de Poggo et du logo sont pris dans les sources du dépôt. Les explorations visuelles restent identifiables comme telles.
