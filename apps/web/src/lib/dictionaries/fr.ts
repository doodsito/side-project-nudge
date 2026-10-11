// Site copy for the French track: French, amounts in euros.
import { BRAND } from "@/lib/brand";
import type { Dictionary } from "./us";

export const fr: Dictionary = {
  skipLink: "Aller au contenu",
  meta: {
    title: "T’entraîner à investir",
    description:
      "Entraîne-toi à prendre de vraies décisions d’investissement avec de l’argent virtuel, et comprends le raisonnement avant de risquer ton épargne.",
    ogTitle: "T’entraîner à investir avant de risquer ton argent",
    ogDescription:
      "Construis ta façon de décider grâce à des simulations réalistes, de l’argent virtuel et des explications adaptées à ta situation.",
  },
  nav: {
    main: "Navigation principale",
    mobile: "Navigation mobile",
    toggle: "Ouvrir ou fermer le menu",
    home: "accueil",
    challenge: "Faire un défi",
    howItWorks: "Comment ça marche",
    logIn: "Se connecter",
    signUp: "S’inscrire",
    open: "Ouvrir",
    accountMenu: "Menu du compte",
    account: "Compte",
    logOut: "Se déconnecter",
  },
  hero: {
    eyebrow: "Pour les étudiants et les premiers jobs",
    title: "Tes premières décisions d’argent.",
    titleAccent: "Un peu plus claires.",
    intro:
      "Tu débutes avec l’épargne ou l’investissement\u00a0? Commence avec le premier salaire d’Alex. Choisis quoi faire de 100\u00a0€, explore les compromis et vérifie ce que tu as retenu, sans argent réel.",
    cta: "Rejoindre la liste d’attente",
    points: ["Gratuit", "Un cas court", "Sans compte"],
    scrollHint: "Essaie une question rapide",
  },
  heroWindow: {
    title: "Un aperçu de ton premier cas",
    badge: "Exemple fictif",
    left: "Il reste 100\u00a0€ à Alex après ses dépenses essentielles.",
    savings: "Épargne disponible\u00a0: 200\u00a0€.",
    event: "Les marchés baissent de 10\u00a0%",
    question: "Que vérifierais-tu avant d’agir\u00a0?",
    options: [
      "Investir les 100\u00a0€ maintenant",
      "Garder les 100\u00a0€ en épargne disponible",
      "Partager les 100\u00a0€ entre les deux",
    ],
    footer:
      "Compare épargne et investissement dans le cas pratique. Pas d’argent réel, pas de conseils boursiers.",
  },
  challenge: {
    label: "Apprendre en décidant",
    title: "Commence par une petite décision.",
    text: "Essaie cette question avant le cas complet. Choisis une réponse pour explorer le raisonnement.",
    promises: [
      "Pas de «\u00a0bonne réponse\u00a0» détachée de ta situation",
      "Pas de conseils boursiers ni de pression pour trader",
      "Pas de vrai capital en jeu",
    ],
    badge: "Défi de 20 secondes",
    count: "1 sur 1",
    context:
      "Tu comptais investir pendant 10 ans. Les marchés baissent de 10\u00a0% cette semaine.",
    question: "Que dois-tu regarder en premier\u00a0?",
    answersLabel: "Réponses du défi",
    answers: {
      A: {
        answer: "Les actions qui ont le plus baissé",
        title: "La variation des prix n’est qu’une partie de la décision.",
        copy: "Savoir ce qui a baissé te dit ce qu’a fait le marché, pas si ton objectif, ton horizon ou ta capacité à prendre des risques ont changé. Un prix plus bas ne suffit pas à justifier d’agir.",
      },
      B: {
        answer: "Si ton objectif, ton horizon ou ta capacité de risque ont changé",
        title: "Commence par ce qui a changé pour toi.",
        copy: "Ta décision d’investissement doit partir de ta situation, pas du mouvement du marché de cette semaine.",
      },
      C: {
        answer: "Ce qu’achètent les influenceurs finance",
        title: "La décision de quelqu’un d’autre ne colle peut-être pas à ta vie.",
        copy: "Son objectif, son horizon, ses finances et sa tolérance aux pertes peuvent être complètement différents. Une conviction empruntée tient mal quand les marchés bougent.",
      },
    },
    prompt: `Choisis une réponse pour voir comment ${BRAND} transforme un réflexe en décision réfléchie.`,
    checks: [
      ["Objectif", "La raison pour laquelle tu investis a-t-elle changé\u00a0?"],
      ["Horizon", "As-tu toujours à peu près autant de temps devant toi\u00a0?"],
      [
        "Capacité de risque",
        "Ta capacité financière à encaisser des pertes a-t-elle changé\u00a0?",
      ],
    ],
    takeaway: "Les prix du marché ont changé. Ton plan, peut-être pas.",
    nudge: "Tu veux voir comment ça change selon ta situation\u00a0?",
    cta: "Essayer le cas pratique complet",
  },
  how: {
    label: `Comment marche ${BRAND}`,
    title: "Choisis. Comprends. Recommence.",
    step: "ÉTAPE",
    steps: [
      [
        "01",
        "Découvre une situation fictive.",
        "Il reste 100\u00a0€ à Alex après ses dépenses essentielles. Décide quoi en faire avant de répondre à la moindre question personnelle.",
      ],
      [
        "02",
        "Choisis avec de l’argent virtuel.",
        "Compare épargne disponible, premier investissement ou un partage des deux. Les montants sont fictifs.",
      ],
      [
        "03",
        "Retiens une idée.",
        "Vois la conséquence sur ta trésorerie, vérifie ce que tu as compris et, si tu veux, explore comment ta situation change l’explication.",
      ],
    ],
    cta: "Essayer le cas pratique",
  },
  faq: {
    label: "Avant de commencer",
    title: "Les bonnes questions méritent des réponses claires.",
    text: `${BRAND} aide les débutants à se forger un jugement, pas à choisir leurs investissements à leur place.`,
    items: [
      [
        "Faut-il déjà savoir investir\u00a0?",
        `Non. ${BRAND} part des décisions que rencontrent les primo-investisseurs et explique les notions au moment où elles deviennent utiles.`,
      ],
      [
        "Vais-je utiliser de l’argent réel\u00a0?",
        `Non. ${BRAND} utilise des portefeuilles simulés et de l’argent virtuel, pour apprendre.`,
      ],
      [
        `${BRAND} me dit-il quoi acheter\u00a0?`,
        `Non. ${BRAND} t’aide à comprendre le raisonnement derrière une décision d’investissement, sans recommander de produit financier.`,
      ],
      [
        "Quelle différence avec une vidéo sur la finance\u00a0?",
        `Une vidéo explique des notions. ${BRAND} te demande d’abord de décider, puis t’apprend les notions à travers les conséquences et le raisonnement de ton choix.`,
      ],
      [
        "Est-ce du conseil financier\u00a0?",
        `Non. ${BRAND} sert à apprendre, avec des simulations. Il ne donne aucune recommandation d’investissement personnalisée.`,
      ],
    ],
  },
  earlyAccess: {
    label: `Accès anticipé à ${BRAND}`,
    title: "Continue de t’entraîner avant de risquer ton argent.",
    text: `Rejoins la liste d’accès anticipé pour être parmi les premiers à t’entraîner sur de nouveaux scénarios avec ${BRAND}.`,
    profileLegend: "Qu’est-ce qui te décrit le mieux\u00a0?",
    profiles: {
      student: "Étudiant·e",
      young_professional: "Jeune actif·ve",
      other: "Autre",
    },
    profileError: "Choisis l’option qui te décrit le mieux.",
    emailLabel: "Adresse e-mail",
    submit: "Rejoindre la liste",
    saving: "Inscription…",
    done: "Tu es sur la liste.",
    error: "Impossible d’enregistrer ta place pour le moment. Réessaie.",
    consent: `On t’écrira seulement au sujet de l’accès anticipé et du lancement de ${BRAND}. Tu peux quitter la liste à tout moment. Tu dois avoir 15 ans ou plus.`,
    privacy: "Politique de confidentialité (en anglais)",
  },
  footer: {
    disclaimer: `${BRAND} est une simulation pédagogique avec de l’argent virtuel. Ce n’est ni un conseil financier, ni une recommandation, ni une évaluation de ta situation. Investir comporte des risques, y compris la perte en capital.`,
    rights: "Tous droits réservés.",
    nav: "Informations légales et du site",
    privacy: "Confidentialité",
    terms: "Conditions",
    legal: "Mentions légales",
    cookies: "Cookies",
    version: "Version",
  },
  dashboard: {
    home: "tableau de bord",
    tabsLabel: "Tableau de bord",
    tabs: { courses: "Cours", portfolio: "Portefeuille", account: "Compte" },
    logOut: "Se déconnecter",
    logOutPending: "Déconnexion…",
    usComingSoon: "D’autres leçons pour les États-Unis arrivent bientôt.",
    portfolio: {
      title: "Portefeuille",
      intro: "Uniquement de l’argent virtuel. Rien n’est réel ici.",
      emptyTitle: "Ton portefeuille virtuel arrive bientôt",
      emptyText:
        "Les décisions que tu t’entraînes à prendre formeront un portefeuille en euros virtuels, pour voir comment tes choix évoluent dans le temps. C’est une simulation pour apprendre, pas un conseil financier.",
      cta: "S’entraîner sur une décision",
    },
    account: {
      title: "Compte",
      passwordUpdated: "Mot de passe modifié. Utilise-le à ta prochaine connexion.",
      details: "Tes informations",
      email: "E-mail",
      signedInWith: "Connexion avec",
      google: "Google",
      password: "E-mail et mot de passe",
      code: "Code d’invitation",
      memberSince: "Membre depuis",
      version: "Version",
      versionText: `Choisis la version de ${BRAND} avec laquelle tu apprends\u00a0: sa langue, son marché et sa devise.`,
      versionSaved: "Version modifiée.",
      versionError: "Impossible de changer ta version pour le moment. Réessaie.",
      versionSave: "Enregistrer",
      versionSaving: "Enregistrement…",
      deleteTitle: "Supprimer ton compte",
      deleteEmail: "Écris à",
      deleteFrom:
        "depuis l’adresse ci-dessus. Nous supprimons ton compte et ses données sous un mois. Consulte la",
      deletePrivacy: "Politique de confidentialité",
      deleteRights: "pour tes autres droits.",
      deleteSubject: `Supprimer mon compte ${BRAND}`,
    },
  },
};
