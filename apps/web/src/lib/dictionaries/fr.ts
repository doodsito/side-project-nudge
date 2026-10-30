// Site copy for the French track: French, amounts in euros.
import { BRAND } from "@/lib/brand";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/auth-rules";
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
    signUp: "Accéder à la bêta",
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
    emailPlaceholder: "toi@exemple.com",
    submit: "Rejoindre la liste",
    saving: "Inscription…",
    done: "Tu es sur la liste.",
    error: "Impossible d’enregistrer ta place pour le moment. Réessaie.",
    consent: `On t’écrira seulement au sujet de l’accès anticipé et du lancement de ${BRAND}. Tu peux quitter la liste à tout moment. Tu dois avoir 15 ans ou plus.`,
    privacy: "Politique de confidentialité (en anglais)",
  },
  tracks: {
    title: `Bienvenue sur ${BRAND}`,
    description: "Tu es où ? Tu pourras changer en bas de page.",
    continue: "Continuer",
    options: {
      fr: { country: "France", detail: "En français, en euros" },
      us: { country: "États-Unis", detail: "En anglais, en dollars" },
    },
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
  auth: {
    pages: {
      login: {
        metaTitle: "Se connecter",
        metaDescription: `Connecte-toi à ton compte ${BRAND}.`,
        eyebrow: "Content de te revoir",
        title: "Se connecter",
        intro: "Utilise le compte que tu as créé.",
      },
      signupCode: {
        metaTitle: "S’inscrire",
        metaDescription: `Crée ton compte ${BRAND} avec ton code d’invitation.`,
        eyebrow: "Sur invitation",
        title: "Entre ton code d’invitation",
        intro: `${BRAND} ouvre à quelques personnes à la fois. Entre le code qu’on t’a donné pour créer ton compte.`,
      },
      signupAccount: {
        eyebrow: "Code accepté",
        title: "Crée ton compte",
        intro: "Il te faut seulement ton adresse e-mail et un mot de passe.",
      },
      forgot: {
        metaTitle: "Mot de passe oublié\u00a0?",
        eyebrow: "Mot de passe oublié",
        title: "Mot de passe oublié\u00a0?",
        intro: "Entre ton adresse e-mail et on t’envoie un lien pour en choisir un nouveau.",
      },
      reset: {
        metaTitle: "Choisis un nouveau mot de passe",
        eyebrow: "Mot de passe oublié",
        title: "Choisis un nouveau mot de passe",
        intro: "Tu l’utiliseras avec ton adresse e-mail pour te connecter.",
      },
      signedIn: {
        eyebrow: "Connecté",
        title: "Tu es déjà connecté",
        intro: "Tu es connecté avec",
        open: "Ouvrir",
      },
    },
    links: {
      forgot: "Mot de passe oublié\u00a0?",
      newHere: "Nouveau ici\u00a0?",
      signUp: "S’inscrire",
      noCode: "Pas encore de code\u00a0?",
      joinWaitlist: "Rejoindre la liste d’attente",
      haveAccount: "Déjà un compte\u00a0?",
      logIn: "Se connecter",
      remembered: "Ça te revient\u00a0?",
      differentCode: "Utiliser un autre code d’invitation",
      consentBefore: "En créant un compte, tu acceptes les",
      terms: "Conditions d’utilisation (en anglais)",
      consentMiddle: "et confirmes avoir lu la",
      privacy: "Politique de confidentialité (en anglais)",
      consentAfter: ". Tu dois avoir 15 ans ou plus.",
    },
    form: {
      email: "Adresse e-mail",
      emailPlaceholder: "toi@exemple.com",
      password: "Mot de passe",
      newPassword: "Nouveau mot de passe",
      showPassword: "Afficher le mot de passe",
      hidePassword: "Masquer le mot de passe",
      signUp: "Créer mon compte",
      signUpPending: "Création…",
      logIn: "Se connecter",
      logInPending: "Connexion…",
      savePassword: "Enregistrer mon nouveau mot de passe",
      savePasswordPending: "Enregistrement…",
      checkInboxBefore: "Regarde ta boîte mail\u00a0: on a envoyé un lien à",
      checkInboxAfter:
        "pour confirmer ton adresse. Ouvre-le dans ce navigateur pour finir de créer ton compte.",
      resetSentBefore: "Si un compte utilise",
      resetSentAfter:
        ", on lui a envoyé un lien pour choisir un nouveau mot de passe. Ouvre-le dans ce navigateur.",
      resetSubmit: "M’envoyer un lien",
      resetAgain: "Renvoyer le lien",
      resetPending: "Envoi…",
      code: "Code d’invitation",
      codePlaceholder: "Ton code…",
      codeSubmit: "Continuer",
      codePending: "Vérification…",
      google: "Continuer avec Google",
      googlePending: "Ouverture de Google…",
      or: "ou",
      strength: "Force du mot de passe",
      levels: ["Mot de passe faible", "Mot de passe moyen", "Mot de passe fort"],
      ruleDone: "(fait)",
      ruleMissing: "(manquant)",
      rules: {
        length: `Au moins ${PASSWORD_MIN_LENGTH} caractères`,
        letter: "Une lettre",
        number: "Un chiffre",
      },
    },
    urlErrors: {
      access: "Ce compte n’a pas encore accès. Entre ton code d’invitation, puis reconnecte-toi.",
      auth: "La connexion n’a pas abouti. Réessaie.",
      link: "Ce lien a expiré ou a été ouvert dans un autre navigateur. Si tu viens de confirmer ton adresse, connecte-toi avec ton mot de passe.",
      reset:
        "Ce lien a expiré, a déjà servi ou a été ouvert dans un autre navigateur. Demandes-en un nouveau ci-dessous, puis ouvre-le dans ce navigateur.",
    },
    errors: {
      tooMany: "Trop de tentatives. Attends quelques minutes, puis réessaie.",
      tryAgain: "Un problème est survenu de notre côté. Réessaie.",
      noAccess: "Ce compte n’a pas encore accès. Entre d’abord ton code d’invitation.",
      codeFormat: "Entre le code d’invitation qu’on t’a donné\u00a0: lettres, chiffres et tirets.",
      codeCheck: "Impossible de vérifier ton code pour le moment. Réessaie.",
      codeInvalid: "Ce code n’est pas valide ou a expiré.",
      codeExpired: "Ton code d’invitation a expiré. Entre-le à nouveau pour continuer.",
      email: "Entre une adresse e-mail valide, comme toi@exemple.com.",
      passwordMissing: "Entre ton mot de passe.",
      tooShort: `Utilise au moins ${PASSWORD_MIN_LENGTH} caractères pour ton mot de passe.`,
      tooLong: `Utilise au plus ${PASSWORD_MAX_LENGTH} caractères pour ton mot de passe.`,
      rules: "Utilise au moins une lettre et un chiffre dans ton mot de passe.",
      accountExists: "Un compte utilise déjà cette adresse. Connecte-toi plutôt.",
      confirmFirst:
        "Confirme d’abord ton adresse\u00a0: ouvre le lien qu’on t’a envoyé, puis connecte-toi.",
      wrongCredentials: "Adresse e-mail ou mot de passe incorrect.",
      resetExpired: "Ton lien a expiré. Demandes-en un nouveau depuis la page de connexion.",
      samePassword: "Choisis un mot de passe différent de l’actuel.",
    },
  },
  learning: {
    shared: {
      lessonProgress: (current, total) => `Progression\u00a0: étape ${current} sur ${total}`,
      leaveLesson: "Quitter la leçon",
      educationalNote: "Simulation pédagogique uniquement. Ceci n’est pas un conseil financier.",
    },
    courses: {
      yourCourses: "Tes cours",
      nextLesson: "Prochaine leçon",
      viewAllLessons: "Voir toutes les leçons",
      roadmap: "Les autres mondes",
      journeyLabel: "Ton parcours d’apprentissage",
      journeyTitle: "Neuf mondes. Une décision à la fois.",
      journeyIntro:
        "Construis les bases, entraîne-toi avec de l’argent virtuel et débloque les connaissances utiles à tes premières décisions d’investissement.",
      worldsCompleted: "0 monde sur 9",
      firstWorldReady: "Le monde 1 est prêt",
      mapLabel: "Carte du parcours",
      mapTitle: "Choisis ton monde",
      mapIntro:
        "Termine un monde pour ouvrir le suivant. Les mondes verrouillés restent visibles pour que tu saches toujours où mène le parcours.",
      world: "Monde",
      ready: "Prêt à explorer",
      locked: "Verrouillé",
      lessonsComplete: (completed, total) =>
        `${completed} leçon${completed > 1 ? "s" : ""} sur ${total} terminée${completed > 1 ? "s" : ""} · Environ 35 minutes`,
      worldProgress: (completed, total) =>
        `Progression du monde 1\u00a0: ${completed} leçon${completed > 1 ? "s" : ""} sur ${total}`,
      enterWorld: "Entrer dans le monde",
      worlds: [
        {
          title: "Construis tes bases financières",
          description: "Donne un rôle à chaque euro avant de chercher à le faire fructifier.",
        },
        {
          title: "Pourquoi investir ?",
          description:
            "Découvre comment le temps, l’inflation et les intérêts composés changent la donne.",
        },
        {
          title: "Découvre le monde de l’investissement",
          description:
            "Découvre les actions, obligations, ETF, cryptos, liquidités et les enveloppes qui les accueillent.",
        },
        {
          title: "Risque, diversification et psychologie",
          description:
            "Comprends l’incertitude, répartis les risques et repère les pièges émotionnels.",
        },
        {
          title: "Comprends les ETF",
          description:
            "Apprends ce que contient un ETF et quels éléments méritent d’être comparés.",
        },
        {
          title: "Construis ton premier portefeuille",
          description:
            "Transforme un objectif, un horizon et une limite de risque en portefeuille virtuel.",
        },
        {
          title: "Investir en France",
          description:
            "Associe les enveloppes et produits d’épargne français à leur véritable rôle.",
        },
        {
          title: "Comment fonctionne vraiment un achat",
          description:
            "Comprends les courtiers, les ordres, les frais et ce qui se passe après avoir cliqué sur Acheter.",
        },
        {
          title: "Ton premier investissement réel",
          description: "Rassemble tes connaissances, ta pratique et ton plan personnel.",
        },
      ],
      foundation: {
        metaTitle: "Construis tes bases financières",
        back: "Tous les mondes",
        label: "Monde 1 · Les bases de l’argent",
        title: "Construis tes bases financières",
        intro:
          "Avant d’investir, comprends ce que ton argent doit financer aujourd’hui, bientôt et beaucoup plus tard.",
        progress: "Progression",
        totalTime: "Durée totale",
        duration: "~35 min",
        progressLabel: (completed, total) =>
          `Progression du monde\u00a0: ${completed} leçon${completed > 1 ? "s" : ""} sur ${total}`,
        pathLabel: "Ton parcours",
        pathTitle: "Huit décisions avant les marchés",
        pathIntro:
          "Commence avec un premier salaire. Chaque courte leçon ouvre la prochaine étape du parcours.",
        lesson: "Leçon",
        completed: "Terminée",
        unlocked: "Débloquée",
        practicalDecision: "Une décision concrète",
        virtualMoney: "Argent virtuel",
        review: "Revoir la leçon",
        start: "Commencer la leçon",
        rewardLabel: "Récompense du monde",
        rewardTitle: "Huit leçons pour construire tes bases",
        rewardIntro:
          "Termine le Monde 1 pour faire le point sur ce que tu as appris dans cette bêta.",
        rewardCompleteTitle: "Tes bases sont acquises",
        rewardCompleteIntro: "Tu as terminé les huit leçons. Merci d’avoir exploré cette bêta.",
        lessons: [
          {
            title: "Où va ton argent ?",
            description:
              "Aide Alex à calculer ce qu’il lui reste vraiment après ses dépenses essentielles.",
          },
          {
            title: "Paie-toi en premier",
            description:
              "Découvre pourquoi épargner d’abord change la donne par rapport à épargner ce qui reste.",
          },
          {
            title: "Combien devrais-tu épargner ?",
            description:
              "Utilise les pourcentages courants comme repères souples, pas comme règles fixes.",
          },
          {
            title: "Construis ton filet de sécurité",
            description:
              "Comprends pourquoi chaque situation demande une réserve de précaution différente.",
          },
          {
            title: "L’argent dont tu auras bientôt besoin",
            description:
              "Sépare tes besoins proches de l’argent qui peut rester investi plus longtemps.",
          },
          {
            title: "Rembourser une dette ou investir ?",
            description:
              "Compare le coût certain d’un emprunt au rendement incertain d’un investissement.",
          },
          {
            title: "Les liquidités ne sont pas sans risque",
            description:
              "Observe comment l’inflation réduit ce que la même somme permet d’acheter.",
          },
          {
            title: "Épargner ou investir ?",
            description:
              "Choisis entre disponibilité, stabilité et potentiel de croissance à long terme.",
          },
        ],
      },
      lessonTwo: {
        metaTitle: "Paie-toi en premier",
        back: "Monde 1",
        label: "Monde 1 · Leçon 2",
        title: "Paie-toi en premier",
        intro:
          "Tu as terminé ta première leçon. Découvre maintenant pourquoi mettre de l’argent de côté avant de dépenser peut rendre l’épargne plus simple et plus régulière.",
        unlocked: "Leçon 2 débloquée",
        comingNext: "Prochaine étape",
        placeholder:
          "La leçon interactive complète sera construite ensuite. Ta progression est déjà enregistrée sur ton compte : tu peux partir et revenir sans rien perdre.",
        viewProgress: "Voir ta progression",
      },
      lessonThree: {
        metaTitle: "Combien devrais-tu épargner ?",
        back: "Monde 1",
        label: "Monde 1 · Leçon 3",
        title: "Combien devrais-tu épargner ?",
        intro:
          "Tu as vu quand Alex peut mettre de l’argent de côté. Découvre maintenant comment choisir une somme adaptée à un budget réel.",
        unlocked: "Leçon 3 débloquée",
        comingNext: "Prochaine étape",
        placeholder:
          "La leçon interactive complète est en cours de conception. Ta progression est enregistrée sur ton compte : tu peux partir et revenir sans rien perdre.",
        viewProgress: "Voir ta progression",
      },
    },
    payYourselfFirst: {
      metaTitle: `Paie-toi en premier | ${BRAND}`,
      feedbackCorrect: "Exactement",
      feedbackThinking: "Bien vu",
      art: {
        nextStep: "La prochaine étape d’Alex",
        saveFirst: "Épargner d’abord ?",
      },
      welcome: {
        action: "Commencer la leçon",
        label: "Monde 1 · Leçon 2",
        title: "Alex sait ce qu’il lui reste. Quand devrait-il épargner ?",
        intro: "Aide Alex à donner une place à son objectif d’épargne dans le mois.",
      },
      recap: {
        action: "Faire un plan",
        label: "Reprends là où Alex s’est arrêté",
        title: "L’abonnement de transport passe en premier.",
        description: (remainder, pass) =>
          `Il restait ${remainder} à Alex, mais son abonnement de ${pass} doit bientôt être payé.`,
        available: "Potentiellement disponible",
        note: "D’autres dépenses à venir peuvent encore modifier cette somme.",
      },
      decision: {
        action: "Voir ce qui change",
        hint: "Choisis l’organisation qui rend l’objectif visible le plus tôt.",
        label: "Un objectif, deux approches",
        question: (amount) =>
          `Alex aimerait mettre ${amount} de côté. Comment peut-il rendre cet objectif visible\u00a0?`,
        options: [
          () => "Attendre et épargner ce qu’il reste",
          (amount) => `Mettre ${amount} de côté après avoir vérifié les dépenses à venir`,
        ],
        correct: "L’objectif a sa propre place avant les dépenses ajustables.",
        retry:
          "Attendre peut fonctionner, mais l’objectif reste mélangé à l’argent qu’Alex pourrait dépenser.",
      },
      consequence: {
        action: "Découvrir le concept",
        label: "Qu’est-ce qui change ?",
        title: "L’argent est le même. L’ordre change.",
        intro: (amount) => `Imagine qu’Alex envisage un achat facultatif de ${amount}.`,
        waitTitle: "Attendre la fin du mois",
        waitDetail: (available, purchase) => `${available} − ${purchase} d’achat facultatif`,
        waitResult: (amount) => `${amount} à épargner`,
        firstTitle: (amount) => `Mettre d’abord ${amount} de côté`,
        firstDetail: (available, goal) => `${available} − ${goal} pour l’objectif`,
        firstResult: (amount) => `${amount} disponibles`,
        takeaway: (amount) =>
          `Alex voit maintenant que l’achat de ${amount} modifierait son plan d’épargne.`,
      },
      concept: {
        action: "En faire une habitude",
        label: "Concept débloqué",
        title: "Paie-toi en premier",
        intro:
          "Après avoir vérifié les dépenses connues, réserve une somme raisonnable pour ton épargne",
        emphasis: "avant les dépenses ajustables.",
        flexibleTitle: "Un plan flexible",
        flexibleBody:
          "Les factures doivent toujours être payées. La somme peut évoluer quand la vie change.",
      },
      habit: {
        action: "Tester l’habitude",
        hint: "Les deux approches peuvent aider. Choisis-en une pour l’explorer.",
        label: "Au prochain salaire",
        question: "Comment Alex pourrait-il se souvenir de son plan ?",
        options: [
          "Programmer un rappel après le salaire",
          "Programmer un virement après le salaire",
        ],
        reminder:
          "Un rappel permet à Alex de vérifier son budget avant d’effectuer le virement lui-même.",
        transfer:
          "Un virement programmé peut faciliter la répétition, à condition qu’Alex vérifie son budget et la date du prélèvement.",
      },
      change: {
        action: "Terminer la leçon",
        hint: "Applique l’idée à une nouvelle dépense.",
        expenseLabel: "Nouvelle dépense à payer",
        expense: (amount) => `Régularisation d’électricité · ${amount}`,
        label: "La vie change le plan",
        question: (amount) => `Alex doit-il maintenir le virement de ${amount}\u00a0?`,
        remaining: (amount) => `Il reste au maximum ${amount} après cette nouvelle dépense.`,
        options: [
          (amount) => `Maintenir le virement de ${amount}`,
          () => "Le revoir et le réduire ou le suspendre",
          () => "Utiliser un découvert pour maintenir le plan",
        ],
        correct:
          "Une habitude d’épargne peut s’adapter. Alex peut réduire ou suspendre le virement, puis y revenir plus tard.",
        retry:
          "Les dépenses connues passent en premier. Alex peut modifier le virement au lieu d’emprunter ou de déséquilibrer son budget.",
      },
      complete: {
        replay: "Rejouer la leçon",
        saving: "Enregistrement de la progression…",
        saveAgain: "Réenregistrer la progression",
        continue: "Continuer vers la leçon 3",
        back: "Retourner au monde 1",
        label: "Leçon terminée",
        title: "Tu as donné une place à l’épargne avant les dépenses ajustables.",
        steps: [
          "Vérifie d’abord les dépenses à venir.",
          "Mets une somme raisonnable de côté avant les dépenses ajustables.",
          "Adapte le plan lorsque ta situation change.",
        ],
        takeaway: "Se payer en premier est une habitude flexible, pas une somme fixe.",
      },
    },
    firstPaycheck: {
      metaTitle: `Ton premier salaire | ${BRAND}`,
      metaDescription:
        "Aide Alex à comprendre où va son premier salaire et ce qu’il peut mettre de côté. Aucun compte requis.",
      ogDescription:
        "Une courte leçon pour débuter et calculer ce qu’il reste après un mois de dépenses.",
      artLabel: "Premier salaire",
      feedbackCorrect: "Exactement",
      feedbackRetry: "Bien essayé",
      welcome: {
        skip: "Je connais déjà : faire le test rapide",
        start: "Commencer la leçon",
        label: "Monde 1 · Leçon 1",
        title: "Ton premier salaire vient d’arriver. Où va-t-il ?",
        intro: "Fais connaissance avec Alex. Environ 4 minutes.",
      },
      skip: {
        startRefresher: "Commencer le rappel",
        check: "Vérifier mes réponses",
        hint: "Réponds aux 3 questions. Obtiens 3 sur 3 pour passer la leçon.",
        label: "Test rapide · 3 questions",
        passedTitle: "Un petit rappel, puis tu peux continuer.",
        title: "Tu connais déjà\u00a0?",
        questions: [
          {
            prompt: (money) =>
              `Tu gagnes ${money(1200)} ce mois-ci et dépenses ${money(1000)}. Combien te reste-t-il\u00a0?`,
            options: ["", "", ""],
            reason: (money) =>
              `Argent reçu − argent dépensé\u00a0: ${money(1200)} − ${money(1000)} = ${money(200)}.`,
          },
          {
            prompt: () => "Laquelle de ces dépenses est essentielle\u00a0?",
            options: ["Le loyer", "Un abonnement de streaming", "Une place de concert"],
            reason: () =>
              "Le loyer est essentiel pour garder son logement. Les deux autres dépenses peuvent être réduites ou supprimées.",
          },
          {
            prompt: (money) =>
              `Il te reste ${money(200)}. Une facture de ${money(50)} est due la semaine prochaine. Combien peux-tu mettre de côté\u00a0?`,
            options: ["", "", ""],
            reason: (money) =>
              `Les ${money(50)} sont déjà réservés\u00a0: ${money(200)} − ${money(50)} = ${money(150)}.`,
          },
        ],
      },
      story: {
        action: "Voir les dépenses",
        label: "Le mois d’Alex",
        title: (money) => `Alex a reçu ${money(1850)}.`,
        introBefore: "Alex vient de commencer son premier emploi. C’est son",
        income: "revenu",
        introAfter: " : l’argent qui entre.",
      },
      budget: {
        lastAction: "Voir ce qu’il reste",
        nextAction: "Dépense suivante",
        hint: "Dépense essentielle ou ajustable ?",
        heading: "Où est parti l’argent d’Alex",
        count: (current, total) => `${current} sur ${total}`,
        question: "Pour Alex, cette dépense est-elle essentielle ou ajustable ?",
        need: "Essentielle : Alex doit la payer",
        want: "Ajustable : Alex peut la réduire ou la supprimer",
        tryAgain: " Réessaie.",
        items: [
          {
            label: "Loyer et factures",
            note: "Alex doit les payer pour garder son logement et ses services essentiels.",
          },
          { label: "Courses alimentaires", note: "Alex a besoin de manger chaque semaine." },
          { label: "Transports", note: "Alex en a besoin pour aller travailler." },
          {
            label: "Abonnements",
            note: "Alex pourrait les résilier ou choisir des offres moins chères.",
          },
          {
            label: "Sorties",
            note: "S’amuser compte, mais Alex pourrait réduire cette dépense si nécessaire.",
          },
        ],
      },
      result: {
        action: "Qu’est-ce que cela signifie ?",
        label: "Ce qu’il reste",
        title: (money) => `Il reste ${money(100)}.`,
        formula: "Argent reçu − argent dépensé = argent restant.",
        moneyIn: "Argent reçu",
        moneyOut: "Argent dépensé",
        moneyLeft: "Argent restant",
      },
      conceptCheck: {
        action: "Voir l’idée essentielle",
        hint: "Choisis la meilleure réponse.",
        label: "Test rapide",
        question: (money) => `Que représentent les ${money(100)} d’Alex\u00a0?`,
        options: [
          {
            label: "De l’argent à dépenser librement",
            feedback:
              "Pas tout à fait. Une partie est peut-être déjà réservée à une facture. Réessaie.",
          },
          {
            label: "De l’argent à investir tout de suite",
            feedback:
              "Pas encore. Alex doit d’abord vérifier si une partie est déjà réservée. Réessaie.",
          },
          {
            label: "De l’argent qu’Alex pourrait épargner",
            feedback:
              "Oui. C’est l’argent restant qu’Alex pourrait épargner, si rien n’est déjà prévu.",
          },
        ],
      },
      concept: {
        action: "Essayer une nouvelle situation",
        label: "L’idée essentielle",
        title: "L’argent que tu pourrais épargner",
        before: "L’argent restant est de l’argent que tu",
        might: "pourrais",
        middle: "épargner. Vérifie d’abord si une partie est",
        promised: "déjà réservée",
        after: ", par exemple pour une facture à payer la semaine prochaine.",
      },
      transfer: {
        action: "Terminer la leçon",
        hint: "Applique l’idée essentielle : quelle somme est déjà réservée ?",
        due: "À payer la semaine prochaine",
        bill: "Forfait téléphone",
        label: "Une nouvelle situation",
        intro: (money) =>
          `Sam est étudiant·e. Son travail d’été lui a rapporté ${money(600)}. Sam a dépensé ${money(475)}.`,
        question: "Combien Sam pourrait mettre de côté ?",
        feedback: [
          (money) =>
            `Il reste ${money(125)}, mais ${money(25)} sont déjà réservés au forfait téléphone. Réessaie.`,
          (money) =>
            `Oui. Il reste ${money(125)}, mais ${money(25)} sont déjà réservés. Sam peut donc mettre ${money(100)} de côté.`,
          () => "Sam ne peut pas tout mettre de côté, mais une partie est disponible. Réessaie.",
        ],
      },
      complete: {
        replay: "Rejouer la leçon",
        saving: "Enregistrement de la progression…",
        retry: "Réenregistrer la progression",
        continue: "Continuer vers la leçon 2",
        back: "Retour à l’accueil",
        label: "Leçon terminée",
        skippedTitle: "3 sur 3. Tu maîtrises déjà cette leçon.",
        title: "Tu as trouvé ce qu’il restait, puis vérifié ce qui était déjà réservé.",
        takeaways: [
          "Argent reçu − argent dépensé = argent restant.",
          "Vérifie ce qui est déjà réservé.",
          "Ce qui est vraiment disponible est ce que tu pourrais épargner.",
        ],
        moreTitle: "Pour aller plus loin : pourquoi dit-on « pourrait » ?",
        more: "Une somme peut sembler disponible sans vraiment l’être. Une facture annuelle, comme une assurance téléphone, peut tomber n’importe quel mois. Un imprévu aussi, comme un écran cassé. Voilà pourquoi nous disons « pourrait ». La leçon 4 parlera de ton filet de sécurité.",
      },
    },
  },
  lesson3: {
    enabled: true,
    metaTitle: "Combien épargner ?",
    chrome: {
      skip: "Aller au contenu",
      progress: "Progression de la leçon : étape {current} sur {total}",
      leave: "Quitter la leçon",
    },
    feedback: { correct: "Exactement", retry: "Regarde encore une fois" },
    welcome: {
      eyebrow: "Monde 1 · Leçon 3",
      title: "Un pourcentage est un repère, pas une règle.",
      intro:
        "Aide Alex à choisir un montant adapté à ce mois-ci, puis à le réévaluer quand la situation change.",
      action: "Commencer la leçon",
      cardLabel: "La prochaine question d’Alex",
      cardTitle: "Combien épargner ?",
    },
    snapshot: {
      eyebrow: "Un nouveau mois pour Alex",
      title: "Commence par le budget réel.",
      income: "Revenu net",
      spending: "Dépenses connues et prévues",
      capacity: "Montant potentiellement disponible",
      note: "Ce montant n’est pas une promesse : une dépense oubliée ou un imprévu peut encore le modifier.",
      action: "Comparer les chiffres",
    },
    reference: {
      eyebrow: "Le budget avant le pourcentage",
      title: "Qu’est-ce qui doit fixer la limite d’Alex ce mois-ci ?",
      prompt: "Choisis le chiffre qui doit venir en premier.",
      options: [
        "Ce qui reste après les dépenses connues et prévues",
        "Un pourcentage trouvé dans une règle générale",
      ],
      correct:
        "Le budget réel fixe la limite. Un pourcentage peut ensuite aider à comparer plusieurs montants.",
      incorrect:
        "Un pourcentage général ne connaît ni le loyer, ni les factures, ni les projets d’Alex. Le budget vient d’abord.",
      action: "Voir les pourcentages",
    },
    comparison: {
      eyebrow: "Même revenu, montants très différents",
      title: "Les pourcentages deviennent des euros.",
      intro: "Voici ce que donnent trois repères souvent cités avec un revenu de {income}.",
      within: "Dans la limite de {capacity}",
      above: "Au-dessus de la limite de {capacity}",
      takeaway:
        "Aucun de ces pourcentages ne connaît le mois d’Alex. Ce sont des outils de comparaison, pas des consignes.",
      action: "Retenir l’idée",
    },
    concept: {
      eyebrow: "Idée débloquée",
      title: "D’abord le budget. Ensuite la régularité.",
      body: "Pars d’un montant inférieur à ce que le budget pourrait supporter, garde une marge, puis réévalue ce choix dans le temps.",
      cardTitle: "Il n’existe pas de pourcentage parfait pour tout le monde.",
      cardBody:
        "Les revenus, les dépenses et les priorités diffèrent. Le bon réflexe consiste à revoir le montant sans ignorer les besoins connus.",
      action: "Choisir un montant",
    },
    amount: {
      eyebrow: "Alex pourrait mettre jusqu’à {capacity} de côté",
      title: "Quel choix laisse le plus de place pour s’adapter ?",
      prompt: "Choisis le point de départ le plus souple pour ce cas fictif.",
      options: [
        "{saving}, avec {margin} de marge",
        "{capacity}, en utilisant tout le montant disponible",
        "{twenty}, pour atteindre le repère de 20 %",
      ],
      correct:
        "{saving} donne une place à l’épargne tout en laissant {margin} de marge dans cet exemple.",
      incorrect:
        "Utiliser toute la somme disponible — ou la dépasser pour atteindre un pourcentage — laisse moins de place aux changements du mois.",
      action: "Tester un autre mois",
    },
    stress: {
      eyebrow: "Le montant rentre encore, mais de justesse",
      title: "Que devrait faire Alex avant de répéter le virement de {saving} ?",
      cardLabel: "Le mois suivant",
      cardText: "Disponible : {capacity} · Marge après épargne : {margin}",
      prompt: "Teste le même montant pendant un mois plus serré.",
      options: [
        "Garder automatiquement {saving}, puisque cela fonctionnait avant",
        "Vérifier si une marge de {margin} suffit pour ce mois",
        "Passer à {ten} pour atteindre le repère de 10 %",
      ],
      correct:
        "Un montant peut rentrer dans le calcul et mériter quand même d’être revu. La marge et les dépenses à venir comptent aussi.",
      incorrect:
        "Répéter ou augmenter le montant sans regarder la marge plus faible transforme un repère en règle.",
      action: "Terminer la leçon",
    },
    complete: {
      eyebrow: "Leçon terminée",
      title: "Tu as choisi un montant à partir du budget, pas d’une règle.",
      points: [
        "Trouver le montant réellement disponible.",
        "Utiliser les pourcentages comme repères seulement.",
        "Garder une marge et réévaluer le montant.",
      ],
      takeaway:
        "Un montant utile correspond à la personne, au mois et aux informations disponibles aujourd’hui.",
      note: "Simulation éducative avec de l’argent virtuel. Ceci n’est pas un conseil financier.",
      replay: "Rejouer la leçon",
      saving: "Enregistrement…",
      retry: "Réessayer d’enregistrer",
      next: "Continuer vers la leçon 4",
      back: "Retour au Monde 1",
    },
    worldCard: {
      title: "Combien épargner ?",
      description: "Utilise les pourcentages comme des repères souples, jamais comme des règles.",
      duration: "4 min",
    },
  },
  lesson4: {
    enabled: true,
    metaTitle: "Construire ton filet de sécurité",
    feedback: { correct: "Exactement", retry: "Regarde encore une fois" },
    welcome: {
      eyebrow: "Monde 1 · Leçon 4",
      title: "Un filet de sécurité doit correspondre à la vie qu’il protège.",
      intro:
        "Alex a commencé à épargner. Aide-le à donner un rôle clair à une partie de cet argent et à l’adapter quand sa situation change.",
      action: "Commencer la leçon",
      cardLabel: "La prochaine question d’Alex",
      cardTitle: "Que doit protéger cet argent ?",
    },
    purpose: {
      eyebrow: "Un rôle différent pour une partie de l’épargne",
      title: "Une réserve donne le temps de réagir.",
      body: "Un filet de sécurité est une somme qui reste accessible pour continuer à payer les dépenses essentielles lorsque les revenus ou les dépenses changent.",
      cardTitle: "Ce n’est pas un objectif universel.",
      cardBody:
        "Son montant utile dépend des dépenses essentielles, de la stabilité des revenus, des responsabilités et des autres solutions dont dispose la personne.",
      action: "Voir le point de départ d’Alex",
    },
    snapshot: {
      eyebrow: "Le point de départ d’Alex",
      title: "Commence par ce qui doit continuer à fonctionner.",
      income: "Revenu net mensuel",
      essentials: "Dépenses essentielles mensuelles",
      buffer: "Filet de sécurité accessible",
      monthlySaving: "Épargne mensuelle actuelle",
      note: "Les 360 € sont un point de départ, pas la preuve qu’Alex a atteint le bon montant pour toutes les situations.",
      action: "Regarder au-delà du montant",
    },
    factors: {
      eyebrow: "Le montant seul ne suffit pas",
      title: "Quelles informations sont les plus utiles quand Alex revoit son filet ?",
      prompt: "Choisis les informations qui reflètent la situation réelle d’Alex.",
      options: [
        "Un nombre universel de mois que tout le monde doit épargner",
        "Ses dépenses essentielles, la stabilité de ses revenus, ses responsabilités et ses autres solutions",
        "L’objectif le plus élevé qu’il trouve, sans tenir compte de son budget actuel",
      ],
      correct:
        "Ces facteurs montrent ce que l’argent doit protéger et la marge de manœuvre dont Alex dispose déjà.",
      incorrect:
        "Un objectif fixe ou démesuré oublie la personne derrière le chiffre. Alex doit partir de ses propres coûts et contraintes.",
      action: "Comparer deux situations",
    },
    comparison: {
      eyebrow: "Mêmes factures, besoin de souplesse différent",
      title: "La situation peut changer avant les dépenses.",
      intro: "Dans les deux situations, Alex a {essentials} de dépenses essentielles mensuelles.",
      steadyLabel: "Alex aujourd’hui",
      steadyTitle: "Un mois plus stable",
      steadyPoints: [
        "Ses heures de travail sont régulières",
        "Certaines dépenses peuvent être ajustées",
        "Personne d’autre ne dépend de son revenu",
      ],
      changedLabel: "Alex après un changement",
      changedTitle: "Moins de marge pour absorber un écart",
      changedPoints: [
        "Ses heures de travail peuvent varier",
        "Il aide à couvrir les besoins d’une autre personne",
        "Moins de dépenses peuvent être reportées",
      ],
      takeaway:
        "Les mêmes dépenses essentielles peuvent demander une réserve différente. C’est une raison de revoir le plan, pas une formule qui choisit le montant à la place d’Alex.",
      action: "Choisir la prochaine étape",
    },
    decision: {
      eyebrow: "Construire avec les informations d’aujourd’hui",
      title: "Quelle prochaine étape est la plus utile pour Alex ?",
      cardLabel: "Plan actuel",
      cardText: "Accessible : {buffer} · Ajout : {saving} par mois",
      prompt: "Choisis l’étape qui reste utile si la situation d’Alex évolue.",
      options: [
        "Considérer les {buffer} comme un objectif terminé et ne plus jamais le revoir",
        "Garder les {buffer} accessibles et continuer à construire au rythme permis par son budget",
        "Affecter les {buffer} à un objectif de long terme puisqu’il n’en a pas encore eu besoin",
      ],
      correct:
        "Alex garde l’argent disponible pour son rôle et peut revoir les {buffer} comme les {saving} lorsque sa situation évolue.",
      incorrect:
        "Déclarer l’objectif terminé — ou donner à l’argent un rôle de long terme — oublie pourquoi Alex a constitué cette réserve.",
      action: "Mettre le plan à l’épreuve",
    },
    rebuild: {
      eyebrow: "L’utiliser fait partie du plan",
      title: "Comment Alex peut-il reconstruire sans comprimer le mois suivant ?",
      cardLabel: "Après une difficulté",
      cardText: "Utilisé : {disruption} · Filet restant : {remaining}",
      prompt: "Alex dispose de {capacity} le mois suivant. Choisis une réponse adaptable.",
      options: [
        "Remettre immédiatement les {disruption}, même si seulement {capacity} sont disponibles",
        "Mettre {rebuild} de côté, garder {margin} de marge et revoir la situation le mois suivant",
        "Arrêter de reconstruire puisque le filet a déjà servi une fois",
      ],
      correct:
        "La reconstruction peut être progressive. Ici, {rebuild} restaure une partie de la réserve tout en laissant {margin} pour le mois.",
      incorrect:
        "Un filet peut être utilisé puis reconstruit. La nouvelle contribution doit toujours respecter le budget au lieu de créer une autre tension.",
      action: "Terminer la leçon",
    },
    complete: {
      eyebrow: "Leçon terminée",
      title: "Tu as construit le filet d’Alex autour de sa situation, pas d’une règle universelle.",
      points: [
        "Partir des dépenses essentielles et des responsabilités réelles.",
        "Garder la réserve accessible et la revoir lorsque la vie change.",
        "Après l’avoir utilisée, la reconstruire au rythme permis par le budget.",
      ],
      takeaway:
        "Un filet utile est personnel, accessible et adaptable lorsque les besoins et la stabilité évoluent.",
      note: "Simulation éducative avec de l’argent virtuel. Ceci n’est pas un conseil financier.",
      replay: "Rejouer la leçon",
      saving: "Enregistrement…",
      retry: "Réessayer d’enregistrer",
      next: "Continuer vers la leçon 5",
      back: "Retour au Monde 1",
    },
  },
  lesson5: {
    enabled: true,
    metaTitle: "L’argent dont tu auras bientôt besoin",
    feedback: { correct: "Exactement", retry: "Regarde encore une fois" },
    welcome: {
      eyebrow: "Monde 1 · Leçon 5",
      title: "Une date change le rôle de ton argent.",
      intro:
        "Alex a séparé son filet de sécurité. Aide-le maintenant à préparer une dépense connue sans la confondre avec un imprévu ou un objectif lointain.",
      action: "Commencer la leçon",
      cardLabel: "La prochaine question d’Alex",
      cardTitle: "Quand en aura-t-il besoin ?",
    },
    roles: {
      eyebrow: "Trois rôles, trois questions",
      title: "Commence par la prochaine mission de l’argent.",
      intro:
        "L’étiquette « épargne » ne dit pas quand l’argent servira ni ce qui arriverait s’il n’était pas disponible.",
      cards: [
        {
          title: "Filet de sécurité",
          body: "Pour un imprévu dont la date et le montant ne sont pas connus.",
        },
        {
          title: "Dépense planifiée",
          body: "Pour un besoin attendu, avec un montant et une échéance à préparer.",
        },
        {
          title: "Long terme",
          body: "Pour de l’argent qui peut rester inutilisé bien plus longtemps malgré des variations.",
        },
      ],
      takeaway:
        "Le rôle vient avant le support : urgence possible, date prévue ou horizon beaucoup plus lointain.",
      action: "Voir le projet d’Alex",
    },
    snapshot: {
      eyebrow: "Une dépense connue à l’avance",
      title: "Alex peut transformer une date en plan.",
      intro:
        "Il prévoit de déménager. Les cartons, le transport et les frais d’installation qu’il anticipe restent distincts de son filet de sécurité.",
      cost: "Frais de déménagement",
      saved: "Déjà mis de côté",
      deadline: "Échéance",
      deadlineValue: "Dans {months} mois",
      capacity: "Capacité d’épargne mensuelle",
      note: "Les montants servent à explorer une décision. Ils ne constituent pas une recommandation personnelle.",
      action: "Donner un rôle à cette somme",
    },
    classify: {
      eyebrow: "Le rôle vient de la situation",
      title: "Comment classer l’argent du déménagement d’Alex ?",
      prompt: "Choisis le rôle qui correspond à un coût connu et daté.",
      options: [
        "Son filet de sécurité, car toute dépense future est un imprévu",
        "Une dépense planifiée, séparée de son filet de sécurité",
        "Un objectif de très long terme sans date d’utilisation",
      ],
      correct:
        "Le déménagement est prévu et chiffré. Le préparer séparément évite de présenter une dépense prévisible comme une urgence.",
      incorrect:
        "La date et le coût sont déjà connus. Le filet sert aux imprévus, tandis qu’un objectif lointain n’a pas cette échéance proche.",
      action: "Construire le calendrier",
    },
    timeline: {
      eyebrow: "Du projet au montant mensuel",
      title: "Le calendrier révèle un rythme possible.",
      intro: "Alex peut comparer ce qu’il lui reste à réunir au nombre de mois disponibles.",
      gapLabel: "Reste à réunir",
      gapText: "{cost} moins {saved}",
      monthlyLabel: "Pour le déménagement",
      monthlyText: "{gap} répartis sur {months} mois",
      otherLabel: "Pour d’autres priorités",
      otherText: "Reste sur sa capacité mensuelle actuelle",
      takeaway:
        "Ce calcul décrit une option avec les informations d’aujourd’hui. Il ne fixe pas une règle valable pour tout le monde.",
      action: "Choisir ce qui compte à l’approche de la date",
    },
    stability: {
      eyebrow: "Une date proche et peu flexible",
      title: "Quelle caractéristique compte le plus pour cette somme ?",
      cardLabel: "Besoin planifié",
      cardText: "{cost} dans {months} mois",
      prompt: "Choisis la réponse qui respecte le rôle et l’échéance de l’argent.",
      options: [
        "Chercher avant tout une forte hausse, même si la somme peut baisser au mauvais moment",
        "Garder la somme suffisamment stable et accessible pour la date prévue",
        "Mélanger la somme avec le filet de sécurité puisqu’elles doivent toutes deux rester disponibles",
      ],
      correct:
        "Une date proche et peu flexible rend la stabilité et l’accessibilité importantes. Alex doit pouvoir payer au moment prévu.",
      incorrect:
        "Une hausse incertaine ne garantit pas le montant à la bonne date, et deux sommes accessibles peuvent tout de même avoir des rôles distincts.",
      action: "Voir ce qui se passe si la date change",
    },
    change: {
      eyebrow: "Quand le calendrier ne rentre plus dans le budget",
      title: "Quelle réponse reste réaliste pour Alex ?",
      cardLabel: "Nouvelle échéance",
      cardText:
        "{gap} en {earlierMonths} mois = {earlierContribution} par mois · capacité : {capacity}",
      prompt:
        "Il manque {shortfall} par mois. Choisis une réponse qui ne transforme pas le manque en pari.",
      options: [
        "Chercher un gain rapide pour combler les {shortfall} manquants chaque mois",
        "Revoir le coût, la date ou son budget, puis recalculer un plan réalisable",
        "Prendre automatiquement la différence dans son filet de sécurité",
      ],
      correct:
        "Le nouveau rythme dépasse sa capacité de {shortfall}. Revoir les paramètres rend le plan explicite sans compter sur un résultat incertain.",
      incorrect:
        "Une échéance trop serrée demande de revoir le plan. Un gain rapide est incertain et le filet de sécurité a déjà une autre mission.",
      action: "Terminer la leçon",
    },
    complete: {
      eyebrow: "Leçon terminée",
      title: "Tu as donné une échéance et un rôle clair à l’argent d’Alex.",
      points: [
        "Une dépense prévisible n’est pas une urgence.",
        "Plus la date est proche et fixe, plus stabilité et accessibilité comptent.",
        "Si le calendrier dépasse la capacité disponible, il faut revoir le plan.",
      ],
      takeaway:
        "Avant de décider quoi faire de ton argent, demande-toi quand tu en auras besoin et à quel point cette date peut bouger.",
      note: "Simulation éducative avec de l’argent virtuel. Ceci n’est pas un conseil financier.",
      replay: "Rejouer la leçon",
      saving: "Enregistrement…",
      retry: "Réessayer d’enregistrer",
      next: "Continuer vers la leçon 6",
      back: "Retour au Monde 1",
    },
  },
  lesson6: {
    enabled: true,
    metaTitle: "Rembourser une dette ou investir ?",
    feedback: { correct: "Exactement", retry: "Regarde encore une fois" },
    welcome: {
      eyebrow: "Monde 1 · Leçon 6",
      title: "Un pourcentage ne suffit pas pour décider.",
      intro:
        "Alex a protégé son filet de sécurité et son déménagement. Aide-le maintenant à comparer le coût connu d’une dette au résultat incertain d’un investissement.",
      action: "Commencer la leçon",
      cardLabel: "La prochaine décision d’Alex",
      cardTitle: "Dette ou investissement ?",
    },
    snapshot: {
      eyebrow: "Deux usages pour la même somme",
      title: "Alex a 100 € réellement disponibles.",
      intro:
        "Ses dépenses, ses mensualités obligatoires, son filet de sécurité et son déménagement sont déjà prévus. Il peut décider du rôle des 100 € restants.",
      extra: "Disponible chaque mois",
      debt: "Dette restante",
      rate: "Taux affiché",
      rateValue: "TAEG fixe : {rate} %",
      horizon: "Objectif d’investissement",
      horizonValue: "{years} ans",
      note: "Le contrat ne prévoit pas de frais de remboursement anticipé. Les montants servent uniquement à explorer une décision.",
      action: "Lire le taux",
    },
    rate: {
      eyebrow: "Trois lettres à décoder",
      title: "Le mot important est caché dans le A.",
      intro:
        "TAEG signifie taux annuel effectif global. Le contrat peut simplement afficher « 12 % » : ce nombre est tout de même exprimé sur une base annuelle.",
      contractLabel: "Extrait du contrat",
      contractValue: "TAEG fixe : {rate} %",
      contractHint:
        "Le TAEG rassemble les intérêts et certains frais obligatoires pour aider à comparer le coût des crédits.",
      action: "Interpréter le pourcentage",
    },
    interpret: {
      eyebrow: "Le taux annuel n’est pas le coût total",
      title: "Que signifie le « {rate} % » affiché ?",
      prompt: "Choisis l’interprétation qui tient compte du temps.",
      options: [
        "Alex paiera exactement 12 % en plus sur toute la durée du crédit",
        "La banque ajoute 12 % au montant restant chaque mois",
        "Le taux est exprimé sur une base annuelle ; le coût total dépend aussi de la durée, des remboursements et des frais",
      ],
      correct:
        "Le pourcentage est annualisé. Le montant total dû et l’échéancier montrent ce qu’Alex paiera si le contrat est suivi jusqu’au bout.",
      incorrect:
        "Le A de TAEG signifie annuel. Ce n’est ni un supplément unique pour toute la durée, ni un taux appliqué chaque mois.",
      action: "Voir un exemple en euros",
    },
    example: {
      eyebrow: "Du pourcentage aux euros",
      title: "Une année complète donne un point de repère.",
      intro:
        "Imaginons seulement pour comprendre le taux que les {debt} restent dus pendant une année entière et qu’aucun autre frais ne s’ajoute.",
      formulaLabel: "Exemple volontairement simplifié",
      formulaText:
        "Les {annualCost} représentent 12 % de {debt} sur une année complète. Ce n’est pas automatiquement le coût total du crédit.",
      balanceLabel: "Quand Alex rembourse",
      balanceText:
        "Le capital restant dû diminue. Les intérêts suivants ne reposent donc plus sur les 600 € du départ pendant toute la durée.",
      note: "Dans un vrai crédit, le calcul dépend du contrat, des dates, des mensualités et des frais. Il faut consulter le montant total dû et l’échéancier.",
      action: "Comparer les deux choix",
    },
    compare: {
      eyebrow: "Deux pourcentages, deux niveaux de certitude",
      title: "Le taux de la dette et un rendement espéré ne promettent pas la même chose.",
      intro:
        "Alex peut décrire l’effet du remboursement. Il ne peut pas connaître à l’avance le résultat de l’investissement.",
      debtLabel: "Rembourser",
      debtTitle: "Réduit un coût contractuel",
      debtPoints: [
        "Le capital restant dû baisse immédiatement",
        "La base des intérêts futurs devient plus petite",
        "L’effet dépend du taux et des règles du contrat",
      ],
      investLabel: "Investir",
      investTitle: "Accepte un résultat incertain",
      investPoints: [
        "La valeur peut monter ou baisser",
        "Un rendement moyen passé n’est pas une promesse",
        "L’horizon de dix ans laisse du temps, sans garantir le résultat",
      ],
      takeaway:
        "Comparer 12 % de dette à un rendement d’investissement supposé ne transforme pas ce rendement en certitude.",
      action: "Prendre une décision pour Alex",
    },
    decision: {
      eyebrow: "Les autres priorités sont déjà protégées",
      title: "Quelle réponse utilise le mieux les informations disponibles ?",
      cardLabel: "Situation actuelle",
      cardText: "{extra} disponibles · dette : {debt} à {rate} %",
      prompt: "Choisis la réponse qui sépare le coût connu du résultat incertain.",
      options: [
        "Investir les {extra}, car un portefeuille diversifié rapportera forcément plus de 12 %",
        "Utiliser les {extra} pour réduire la dette et son coût connu, sans toucher aux autres priorités",
        "Vider le filet de sécurité pour rembourser immédiatement toute la dette",
      ],
      correct:
        "Dans cette situation fictive, Alex réduit un coût élevé et connu avec de l’argent réellement disponible. Cette conclusion dépend des informations du scénario.",
      incorrect:
        "Un rendement n’est pas garanti et le filet de sécurité a déjà un autre rôle. La comparaison porte seulement sur les {extra} disponibles.",
      action: "Changer une information",
    },
    change: {
      eyebrow: "Le taux change la comparaison",
      title: "La même réponse est-elle toujours évidente ?",
      intro:
        "La mensualité obligatoire tient dans le budget, les autres priorités restent protégées et aucun frais supplémentaire n’est prévu.",
      cardLabel: "Nouvelles conditions",
      cardText: "Taux : {lowerRate} % pendant {lowerMonths} mois",
      prompt: "Choisis le raisonnement qui reste valable lorsque le coût de la dette change.",
      options: [
        "Toujours rembourser toute dette avant d’envisager un autre objectif",
        "Toujours investir dès que le taux de la dette est faible",
        "Revoir les échéances, le budget et les objectifs : rembourser, investir ou partager la somme peuvent maintenant se défendre",
      ],
      correct:
        "À 0 %, le coût connu ne domine plus la comparaison de la même façon. La décision dépend davantage des échéances, de la marge budgétaire et des objectifs.",
      incorrect:
        "Un seul taux ne crée pas une règle universelle. Les paiements obligatoires, les échéances et la capacité à supporter le risque comptent aussi.",
      action: "Construire la checklist",
    },
    checklist: {
      eyebrow: "Avant de choisir",
      title: "Alex peut poser les questions dans le bon ordre.",
      intro:
        "Cette checklist ne choisit pas à sa place. Elle évite de comparer deux pourcentages comme s’ils avaient la même certitude.",
      points: [
        "Les paiements obligatoires sont-ils couverts ?",
        "Les besoins proches et le filet de sécurité restent-ils protégés ?",
        "Que signifient le taux, la durée, les frais et le montant total dû ?",
        "Quel coût diminue avec certitude si la dette est remboursée ?",
        "L’argent investi peut-il rester placé malgré une baisse ?",
        "Qu’est-ce qui changerait la décision ?",
      ],
      takeaway:
        "La bonne comparaison commence par le contrat et le calendrier, pas par une promesse de rendement.",
      action: "Terminer la leçon",
    },
    complete: {
      eyebrow: "Leçon terminée",
      title: "Tu as comparé un coût connu à un résultat incertain.",
      points: [
        "Le A de TAEG signifie annuel, pas « sur toute la durée ».",
        "Le coût total dépend aussi du temps, des remboursements et des frais.",
        "Le taux, le budget et les échéances peuvent changer la décision.",
      ],
      takeaway:
        "Quel coût disparaît avec certitude si je rembourse, et quel risque est-ce que j’accepte si j’investis à la place ?",
      note: "Simulation éducative avec de l’argent virtuel. Ceci n’est pas un conseil financier. Les calculs simplifiés ne remplacent pas le contrat et son échéancier.",
      replay: "Rejouer la leçon",
      saving: "Enregistrement…",
      retry: "Réessayer d’enregistrer",
      next: "Continuer vers la leçon 7",
      back: "Retour au Monde 1",
    },
  },
  lesson7: {
    enabled: true,
    metaTitle: "Les liquidités ne sont pas sans risque",
    feedback: { correct: "Exactement", retry: "Regarde encore une fois" },
    welcome: {
      eyebrow: "Monde 1 · Leçon 7",
      title: "Ton solde peut rester le même pendant que ce qu’il achète diminue.",
      intro:
        "Alex voit une somme stable sur son compte et pense qu’elle ne court aucun risque. Aide-le à distinguer la stabilité du solde de celle du pouvoir d’achat.",
      action: "Observer l’argent d’Alex",
      cardLabel: "La prochaine question d’Alex",
      cardTitle: "Stable pour combien de temps ?",
    },
    snapshot: {
      eyebrow: "Un exemple volontairement simplifié",
      title: "Alex garde une somme disponible sur son compte.",
      intro: "Son solde ne fluctue pas. Son projet coûte aujourd’hui exactement la même somme.",
      cash: "Argent disponible",
      rate: "Rémunération du compte",
      goal: "Prix actuel du projet",
      inflation: "Hypothèse d’inflation sur un an",
      note: "Ici, « liquidités » désigne de l’argent disponible rapidement dont le montant affiché reste stable. Les taux sont fictifs et servent uniquement à apprendre.",
      action: "Comprendre l’inflation",
    },
    inflation: {
      eyebrow: "Un pourcentage moyen",
      title: "Que signifie une inflation de {inflationRate} % ?",
      prompt: "Choisis l’interprétation qui décrit une moyenne de prix.",
      options: [
        "Tous les produits deviennent exactement {inflationRate} % plus chers",
        "Les prix augmentent en moyenne d’environ {inflationRate} % sur la période",
        "La banque retire {inflationRate} % de l’argent présent sur les comptes",
      ],
      correct:
        "L’inflation décrit une évolution moyenne. Le panier de chaque personne et le prix de chaque produit peuvent évoluer différemment.",
      incorrect:
        "L’inflation n’est ni une hausse identique de tous les prix, ni un prélèvement sur le compte. Elle mesure une évolution moyenne des prix.",
      action: "Voir l’effet en euros",
    },
    priceExample: {
      eyebrow: "Le même projet, un an plus tard",
      title: "Le prix bouge même si le solde ne bouge pas.",
      intro:
        "Dans notre exemple, le projet qui coûte {startingCash} aujourd’hui suit exactement l’hypothèse d’inflation de {inflationRate} %.",
      today: "Aujourd’hui",
      later: "Dans un an",
      fullGoal: "Le solde couvre entièrement le projet",
      shortfall: "Avec {cashAfterYear} sur son compte, il manque {cashGap}",
      takeaway:
        "Alex n’a pas perdu d’euros sur son relevé. Il a perdu une partie de ce que ces euros permettent d’acheter.",
      action: "Interpréter ce changement",
    },
    balance: {
      eyebrow: "Le risque ne se voit pas toujours sur le relevé",
      title: "Que s’est-il réellement passé ?",
      cardLabel: "Après un an",
      cardText: "Compte : {cashAfterYear} · projet : {futurePrice}",
      prompt: "Choisis la réponse qui distingue solde et pouvoir d’achat.",
      options: [
        "Le compte d’Alex a été débité de {cashGap}",
        "Son solde est resté stable, mais il permet d’acheter moins",
        "Alex a évité tous les risques parce que son solde n’a pas baissé",
      ],
      correct:
        "Le nombre d’euros n’a pas changé. C’est l’écart entre ce nombre et le nouveau prix du projet qui révèle la baisse de pouvoir d’achat.",
      incorrect:
        "Aucune somme n’a été retirée du compte. Un solde stable protège le montant affiché, mais pas automatiquement ce qu’il permet d’acheter.",
      action: "Ajouter des intérêts",
    },
    interestExample: {
      eyebrow: "Un solde peut monter et rester en retard",
      title: "Et si l’argent rapporte {savingsRate} % ?",
      intro:
        "Plaçons les {startingCash} sur un support fictif, sans frais ni fiscalité, rémunéré {savingsRate} % pendant un an.",
      accountLabel: "Solde après les intérêts",
      accountText: "Alex a gagné {interestEarned} sur son relevé",
      goalLabel: "Prix du même projet",
      goalText: "Il manque encore {savingsGap} pour le financer",
      note: "Un rendement positif en euros ne garantit pas un gain de pouvoir d’achat. Il faut aussi regarder l’évolution du prix de l’objectif.",
      action: "Comparer les deux évolutions",
    },
    interest: {
      eyebrow: "Deux hausses différentes",
      title: "Quelle conclusion décrit correctement l’année ?",
      prompt: "Compare le solde de {savingsAfterYear} au projet de {futurePrice}.",
      options: [
        "Alex a gagné {interestEarned}, donc son pouvoir d’achat a forcément augmenté",
        "Son solde a progressé, mais moins vite que le prix de son projet",
        "Dès qu’un compte rapporte moins que l’inflation, il faut tout investir",
      ],
      correct:
        "Le relevé montre un gain, mais le projet a augmenté davantage. Dans cet exemple précis, le pouvoir d’achat de la somme a diminué.",
      incorrect:
        "Un gain affiché et un gain de pouvoir d’achat ne sont pas la même chose. Et cet écart ne suffit pas, à lui seul, pour choisir un placement.",
      action: "Redonner un rôle à l’argent",
    },
    nearTerm: {
      eyebrow: "L’inflation n’est pas le seul risque",
      title: "Que doit surtout protéger Alex ?",
      cardLabel: "Nouvelle information",
      cardText: "Une caution à payer dans {nearMonths} mois",
      prompt: "Choisis la caractéristique la plus importante pour cette somme.",
      options: [
        "Sa disponibilité et la stabilité de son montant",
        "Le rendement potentiel le plus élevé possible",
        "Une promesse de rendement supérieur à l’inflation",
      ],
      correct:
        "Avec une date proche et fixe, une baisse au mauvais moment peut être plus gênante que l’érosion progressive des prix.",
      incorrect:
        "Cette somme a une date proche. Chercher davantage de rendement peut introduire un risque de baisse ou d’indisponibilité au mauvais moment.",
      action: "Changer l’horizon",
    },
    longTerm: {
      eyebrow: "La durée change le compromis",
      title: "Qu’est-ce qui change maintenant ?",
      intro:
        "L’érosion du pouvoir d’achat compte davantage sur une longue durée, mais investir ajoute un risque de fluctuation et de perte.",
      cardLabel: "Nouvelle information",
      cardText: "Somme inutilisée pendant au moins {longYears} ans",
      prompt: "Choisis la réponse qui reconnaît plusieurs risques.",
      options: [
        "Alex doit obligatoirement tout investir",
        "Alex doit obligatoirement tout conserver en liquidités",
        "Il peut comparer disponibilité, stabilité, inflation et risque de baisse",
      ],
      correct:
        "Un horizon long rend l’inflation plus importante dans la comparaison sans supprimer les autres risques. La prochaine leçon comparera ces compromis.",
      incorrect:
        "Aucun horizon ne crée une règle automatique. Le rôle de la somme et la capacité à accepter une baisse restent essentiels.",
      action: "Construire la checklist",
    },
    checklist: {
      eyebrow: "Avant de décider",
      title: "Alex peut commencer par le rôle et la date.",
      intro:
        "Cette checklist évite de traiter l’inflation comme un ordre d’investir ou la stabilité comme une absence totale de risque.",
      points: [
        "Quand cette somme sera-t-elle utilisée ?",
        "La date est-elle fixe ou flexible ?",
        "Le montant doit-il rester stable ?",
        "L’argent doit-il être disponible immédiatement ?",
        "La somme produit-elle des intérêts ?",
        "Alex peut-il accepter une baisse temporaire ?",
      ],
      takeaway: "L’inflation est un risque à comprendre, pas un ordre d’investir.",
      action: "Terminer la leçon",
    },
    complete: {
      eyebrow: "Leçon terminée",
      title: "Tu as distingué euros affichés et pouvoir d’achat.",
      points: [
        "L’inflation mesure une évolution moyenne des prix.",
        "Un solde peut augmenter tout en achetant moins qu’avant.",
        "Les liquidités protègent l’accès et la stabilité, pas toujours le pouvoir d’achat.",
        "Le rôle de l’argent et sa date d’utilisation guident la comparaison.",
      ],
      takeaway:
        "Qu’est-ce que cette somme doit protéger : une dépense proche, un montant stable ou un objectif lointain ?",
      note: "Simulation éducative avec de l’argent virtuel. Ceci n’est pas un conseil financier. Les taux sont fictifs et les calculs volontairement simplifiés.",
      replay: "Rejouer la leçon",
      saving: "Enregistrement…",
      retry: "Réessayer d’enregistrer",
      next: "Continuer vers la leçon 8",
      back: "Retour au Monde 1",
    },
  },
  lesson8: {
    metaTitle: "Épargner ou investir ?",
    feedback: {
      correct: "Ce raisonnement convient",
      rethink: "Regarde le compromis",
      reflect: "Une question utile pour la suite",
      answer: "Le raisonnement à retenir",
      check: "Vérifier ma réponse",
    },
    welcome: {
      eyebrow: "Monde 1 · Leçon 8",
      title: "Épargner ou investir : quel rôle pour cet argent ?",
      intro:
        "Alex a de l’argent pour différents objectifs. Aide-le à voir ce que chaque somme doit protéger avant de chercher ce qu’elle pourrait rapporter.",
      action: "Commencer la leçon",
      note: "Exemples fictifs avec de l’argent virtuel. Ceci est une leçon, pas un conseil financier.",
    },
    difference: {
      eyebrow: "Deux façons de mettre de côté",
      title: "La différence commence par ce que tu attends de la somme.",
      intro:
        "Dans cette leçon, épargner signifie garder une somme accessible avec un solde nominal stable. Investir signifie accepter que sa valeur varie, avec une perte possible, pour un potentiel de croissance à long terme.",
      savingTitle: "Épargner",
      savingText:
        "Privilégier la disponibilité et un montant stable en euros. La hausse des prix peut quand même réduire ce qu’il permet d’acheter.",
      investingTitle: "Investir",
      investingText:
        "Accepter des hausses, des baisses et une perte possible pour un potentiel de croissance. Cette croissance n’est jamais garantie.",
      nuance:
        "Investir est aussi une façon de mettre de l’argent de côté. Ici, nous comparons deux usages différents.",
      action: "Essayer un exemple",
    },
    sameAmount: {
      eyebrow: "Mêmes euros, objectifs différents",
      title: "Qu’est-ce qui change quand la date change ?",
      intro:
        "Ces {amount} sont fictifs. Imagine en avoir besoin dans deux mois, puis imagine ne pas en avoir besoin avant dix ans.",
      soon: "Nécessaires dans deux mois",
      later: "Pour un objectif dans dix ans",
      prompt: "Quel élément compte le plus pour comparer épargne et investissement ?",
      options: [
        "Le montant est le même, donc le choix doit être le même.",
        "La date, le besoin de disponibilité et la possibilité d’attendre après une baisse.",
        "Investir est toujours préférable quand l’objectif est lointain.",
      ],
      feedback: [
        "Une même somme peut avoir plusieurs rôles. Une baisse juste avant une dépense nécessaire a plus de conséquences que pour un objectif lointain et flexible.",
        "Exactement. Le montant seul ne décide pas : la date et les conséquences d’une baisse changent le compromis.",
        "Un horizon lointain peut rendre l’investissement envisageable, mais il ne garantit pas un gain et ne supprime pas le risque de perte.",
      ],
      action: "Découvrir les objectifs d’Alex",
    },
    alex: {
      eyebrow: "Alex a plusieurs objectifs",
      title: "Tout son argent n’a pas le même rôle.",
      intro:
        "Alex est un jeune actif. Ses dépenses courantes sont couvertes, mais il a plusieurs raisons de mettre de l’argent de côté.",
      cards: [
        {
          title: "Filet de sécurité",
          body: "Une somme dont il pourrait avoir besoin sans prévenir.",
        },
        { title: "Déménagement dans six mois", body: "Une dépense prévue à une date proche." },
        {
          title: "Objectif lointain",
          body: "Une somme distincte dont il ne prévoit pas d’avoir besoin avant dix ans.",
        },
      ],
      note: "Son cas est un exemple, pas une règle pour toutes les personnes au même âge.",
      action: "Décider pour le déménagement",
    },
    nearTerm: {
      eyebrow: "Une date proche",
      title: "Que doit privilégier Alex pour son déménagement dans six mois ?",
      prompt: "Choisis ce qui protège le rôle de cette somme.",
      options: [
        "Garder cette somme stable et disponible pour le déménagement.",
        "L’investir pour espérer un meilleur rendement d’ici le déménagement.",
        "Utiliser plutôt le filet de sécurité, puisque les deux sommes sont disponibles.",
      ],
      feedback: [
        "Oui. Une baisse au mauvais moment pourrait l’empêcher de payer une dépense prévue. La stabilité du solde ne garantit toutefois pas le pouvoir d’achat.",
        "Un gain possible n’est pas assuré en six mois. Si la valeur baisse près de la date prévue, Alex peut manquer de la somme nécessaire.",
        "Le filet sert aux imprévus ; le déménagement est déjà planifié. Deux sommes disponibles peuvent avoir des rôles différents.",
      ],
      action: "Examiner l’objectif lointain",
    },
    longTerm: {
      eyebrow: "Un objectif lointain",
      title:
        "Que peut envisager Alex pour une somme distincte dont il n’aura pas besoin avant dix ans ?",
      prompt: "Choisis un raisonnement qui tient compte du potentiel de croissance et de perte.",
      options: [
        "Comparer épargne et investissement, notamment sa capacité à accepter une perte.",
        "Investir automatiquement : dix ans garantissent une hausse.",
        "Tout garder en épargne : un solde stable signifie qu’il n’y a aucun risque.",
      ],
      feedback: [
        "Oui. Le temps peut rendre l’investissement envisageable, pas obligatoire. Alex doit aussi considérer les pertes possibles, ses besoins et le coût connu de ses dettes éventuelles.",
        "Dix ans ne promettent aucun gain. Un investissement peut encore valoir moins lorsque Alex en aura besoin.",
        "Un solde stable en euros peut être utile, mais l’inflation peut réduire ce qu’il permet d’acheter au fil du temps.",
      ],
      action: "Faire le lien avec ta situation",
    },
    reflection: {
      eyebrow: "Et toi ?",
      title: "Pourrais-tu laisser une petite somme de côté pendant 10 ans ?",
      context:
        "Pense à aujourd’hui ou aux prochains mois. Tu pourrais chercher à faire fructifier cette somme en l’investissant, mais sa valeur pourrait aussi baisser.",
      prompt:
        "Choisis ce qui se rapproche le plus de ta situation. Il n’y a pas de mauvaise réponse.",
      check: "Voir ce que cela implique",
      hint: "Choisis une réponse pour continuer.",
      options: [
        "Oui, je pourrais ne pas y toucher pendant 10 ans ou plus.",
        "Peut-être, mais je pourrais en avoir besoin après 12 mois et avant 10 ans.",
        "Non, j’en aurais besoin dans les 12 prochains mois.",
        "Je ne sais pas encore quand j’en aurais besoin.",
      ],
      feedback: [
        "Avec cet horizon, tu peux comparer épargne et investissement. Vérifie que cette somme ne sert pas à un besoin prévu ou à ton filet de sécurité, et garde en tête le risque de perte.",
        "Précise d’abord la date de ton besoin. Tu pourras ensuite comparer la disponibilité de l’épargne et la croissance possible, mais incertaine, d’un investissement.",
        "Si tu peux en avoir besoin dans les 12 mois, sa disponibilité et sa stabilité comptent. Tu pourras réexaminer la question pour un autre projet, plus lointain.",
        "Tu n’as pas besoin de décider maintenant. Commence par définir à quoi cette somme pourrait servir et quand tu en aurais besoin.",
      ],
      action: "Terminer le Monde 1",
    },
    complete: {
      eyebrow: "Monde 1 · Bêta terminée",
      pendingTitle: "Ta dernière leçon est prête à être enregistrée.",
      title: "Tu as terminé le Monde 1 !",
      count: "8 leçons sur 8 terminées",
      thanks:
        "Merci d’avoir découvert cette première version. Tu sais maintenant relier chaque somme à son objectif, sa date et ses risques.",
      saved: "Ta progression est enregistrée.",
      saving: "Enregistrement de ta progression…",
      error: "Nous n’avons pas pu confirmer ta progression. Réessaie de l’enregistrer.",
      retry: "Réessayer d’enregistrer",
      teaserTitle: "Et après ?",
      teaser:
        "Nous préparons de nouveaux mondes et explorons des portefeuilles virtuels utilisant des données de marché réelles. L’entraînement resterait en argent virtuel ; ces fonctions ne sont pas encore disponibles.",
      feedbackIntro:
        "Tes retours nous aideront à choisir ce que nous construirons ensuite. Qu’est-ce qui t’a aidé, qu’est-ce qui n’était pas clair, et qu’aimerais-tu essayer ?",
      feedbackPrompt:
        "Qu’est-ce qui t’a aidé à apprendre, qu’est-ce qui n’était pas clair, et qu’aimerais-tu essayer ensuite ?",
      feedbackButton: "Donner mon avis",
      dashboard: "Retour au tableau de bord",
      replay: "Rejouer la leçon",
      note: "Exercice éducatif avec des sommes fictives. Ceci n’est pas un conseil financier.",
    },
  },
  dashboard: {
    home: "accueil",
    tabsLabel: "Tableau de bord",
    tabs: { home: "Accueil", courses: "Cours", portfolio: "Portefeuille", account: "Compte" },
    preview: {
      title: "Aperçu local de l’accueil",
      label: "Aperçu local · données fictives",
      description:
        "La progression affichée est un exemple (2 leçons sur 8). Les autres pages du tableau de bord demandent une connexion.",
    },
    homeScreen: {
      eyebrow: "Ta prochaine étape",
      startHeading: "Ton parcours commence ici.",
      continueHeading: "Reprends là où tu en es.",
      completeHeading: "Voici ton parcours accompli.",
      review: "Revoir ton parcours",
      worldComplete: "Monde 1 terminé",
      explore: "Explorer tous les cours",
    },
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
    feedback: {
      trigger: "Donner mon avis",
      title: "Dis-nous ce que tu en penses",
      intro: "Un bug, une idée, une remarque ? On lit tout.",
      categoryLegend: "De quoi s’agit-il ?",
      categories: { bug: "Un bug", idea: "Une idée", other: "Autre chose" },
      messageLabel: "Ton message",
      messagePlaceholder: "Décris ce que tu as vu ou ce que tu voudrais…",
      submit: "Envoyer",
      submitPending: "Envoi…",
      success: "Merci, c’est envoyé !",
      error: "Impossible d’envoyer ton message pour le moment. Réessaie.",
      messageMissing: "Écris un message avant d’envoyer.",
      messageTooLong: "Message trop long (2000 caractères maximum).",
    },
  },
};
