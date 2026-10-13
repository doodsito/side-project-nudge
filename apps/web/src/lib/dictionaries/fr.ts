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
    emailPlaceholder: "toi@exemple.com",
    submit: "Rejoindre la liste",
    saving: "Inscription…",
    done: "Tu es sur la liste.",
    error: "Impossible d’enregistrer ta place pour le moment. Réessaie.",
    consent: `On t’écrira seulement au sujet de l’accès anticipé et du lancement de ${BRAND}. Tu peux quitter la liste à tout moment. Tu dois avoir 15 ans ou plus.`,
    privacy: "Politique de confidentialité (en anglais)",
  },
  tracks: {
    title: "Choisis ta version",
    description:
      "Ta langue, ton marché et ta devise. Tu pourras en changer plus tard en bas de page.",
    continue: "Continuer",
    options: {
      fr: { country: "France", detail: "Français · euros · PEA, assurance vie, livrets" },
      us: { country: "États-Unis", detail: "Anglais · dollars · 401(k), IRA, comptes-titres" },
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
        rewardTitle: "L’investissement débloqué",
        rewardIntro: "Termine les huit leçons pour ouvrir l’univers de l’investissement.",
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
