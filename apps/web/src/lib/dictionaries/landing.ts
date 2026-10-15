import { BRAND } from "@/lib/brand";
export const landingCopy = {
  fr: {
    worlds: {
      description: "La mascotte bondit entre trois univers : risque, placements et portefeuille.",
      labels: ["Comprendre le risque", "Comparer les placements", "Construire son portefeuille"],
    },
    solutionLabels: ["Une situation concrète", "Ton choix", "Une explication"],
    lessonPreview: {
      preview: "Aperçu d’une leçon",
      collection: "Des questions aux bons réflexes",
      lessonPrompts: [
        "Qu’est-ce qu’il me reste vraiment ?",
        "Quand mettre de côté ?",
        "Comment savoir si j’ai compris ?",
      ],
      lessons: [
        "Repérer l’argent disponible",
        "Construire une habitude d’épargne",
        "Savoir expliquer ton choix",
      ],
      collectionNote:
        "Les premiers pas du parcours, avant d’aller plus loin dans l’investissement.",
      course: "Comprendre ton premier salaire",
      navigation: "Questions du cours",
      ambition: "Investir avec assurance",
      illustration: "Illustration d’un cours Nudge avec une réponse et son explication.",
      sceneLabels: ["Tu fais ton choix", "Tu comprends ce qu’il change"],
      reward: {
        preview: "Bientôt",
        complete: "Leçon terminée",
        title: "Tes connaissances prennent de la valeur.",
        balance: "Ton capital d’entraînement",
        unit: "crédits fictifs",
        next: "Prochain objectif",
        nextTitle: "Comprendre le risque",
        note: "Aperçu du futur système de récompenses. Montants illustratifs, sans valeur monétaire.",
      },
      ambitionIntro: "Ne t’arrête pas au rendement affiché.",
      investorSkills: [
        { title: "Comprendre le risque", text: "Ce que tu peux gagner. Ce que tu peux perdre." },
        { title: "Comparer les frais", text: "Ce qu’un placement te coûte vraiment." },
        { title: "Garder ton objectif en vue", text: "Quand auras-tu besoin de cet argent ?" },
      ],
      expenseNote:
        "Ces abonnements peuvent être résiliés ou remplacés par des offres moins chères, selon tes besoins.",
      transferIntro:
        "Il te reste 125 € sur ton compte. Une facture de téléphone de 25 € arrive la semaine prochaine.",
      transferQuestion: "Combien pourrais-tu mettre de côté ?",
      transferSuccess:
        "Les 25 € de facture sont déjà engagés. Il reste donc 100 € que tu pourrais mettre de côté.",
      questionCount: "Question",
      responseCorrect: "Tu as le bon raisonnement.",
      responseRetry: "Un détail à prendre en compte.",
      exerciseIntro: "Choisis une réponse pour explorer le raisonnement.",
      exercises: [
        {
          title: "Besoin ou envie ?",
          context:
            "Tu utilises ton téléphone pour travailler et te déplacer. Un nouveau modèle vient de sortir.",
          question: "Qu’est-ce qui distingue un besoin d’une envie ?",
          options: [
            "Le prix de l’achat",
            "Son utilité dans ta situation",
            "La fréquence à laquelle tu l’achètes",
          ],
          correct: 1,
          explanation:
            "Un téléphone peut être nécessaire au quotidien, sans que le dernier modèle le soit. C’est le rôle de la dépense dans ta vie qui compte, pas seulement son prix.",
        },
        {
          title: "Solde ou épargne ?",
          context:
            "Ton salaire est arrivé. Après tes dépenses du mois, il reste de l’argent sur ton compte.",
          question: "Ce qui reste est-il forcément de l’épargne ?",
          options: [
            "Oui, tant que je ne le dépense pas",
            "Non, je dois vérifier les dépenses encore prévues",
            "Seulement si le montant est important",
          ],
          correct: 1,
          explanation:
            "Le solde est une photo de ton compte à un instant donné. Une facture à venir peut déjà engager une partie de cet argent. Le reste peut être mis de côté, selon tes besoins.",
        },
        {
          title: "À toi de décider",
          context:
            "Il te reste 200 € sur ton compte. Ton abonnement de transport de 40 € sera prélevé demain.",
          question: "Quelle somme n’est pas encore engagée ?",
          options: ["200 €", "160 €", "40 €"],
          correct: 1,
          explanation:
            "200 € moins les 40 € prévus : il reste 160 € non engagés dans cet exemple. C’est ce montant que tu peux ensuite envisager de mettre de côté.",
        },
      ],
      heroTitle: "Ce qui reste n’est pas toujours disponible.",
      question: "Combien peux-tu vraiment mettre de côté ?",
      balance: "Sur ton compte",
      available: "Encore disponible",
      reserved: "Facture à venir",
      context:
        "Il te reste 200 € sur ton compte. Ton abonnement de transport de 40 € sera prélevé demain.",
      bill: "Abonnement de transport",
      due: "Prélèvement demain",
      try: "À toi d’essayer",
      invitation: "Choisis un montant pour découvrir le raisonnement.",
      correct: "Tu as pris en compte la facture.",
      reconsider: "Regarde ce qui est déjà prévu.",
      explanation:
        "200 € sur le compte, moins 40 € à payer : il reste 160 €. Avant d’épargner, on distingue le solde de l’argent réellement disponible.",
      hint: "La facture n’est pas encore débitée, mais cet argent est déjà engagé. Retire-la du solde pour trouver ce qui reste.",
      explore: "Essayer cet aperçu",
      caption: "Extrait simplifié du cours · Montants fictifs · Progression non enregistrée",
    },
    greeting: "Saluer la mascotte",
    hero: [
      "De ton premier euro aux bons réflexes.",
      "Deviens l’investisseur",
      "à la hauteur de tes ambitions.",
      "Apprends à mieux investir et prends en main ton avenir financier. Des leçons courtes et des situations concrètes pour progresser, de tes premiers pas à tes prochains objectifs.",
    ],
    reassurance: "Aucune connaissance requise. Tu t’exerces sans argent réel.",
    cta: "Rejoindre la liste d’attente",
    note: "On te fait signe dès que l’app est lancée !",
    preview: "Ce que tu apprendras à regarder",
    questions: ["Ton objectif", "Le temps devant toi", "Le risque que tu peux prendre"],
    previewNote: "Les bons repères, pour des décisions qui te ressemblent.",
    problem: [
      "Le point de départ",
      "Tu veux commencer. Mais par quoi ?",
      "Mettre de côté, investir, garder de l’argent disponible… Les conseils ne manquent pas. Comprendre lesquels ont du sens, et pourquoi, c’est une autre histoire.",
      `${BRAND} t’aide à construire les bases pour comprendre tes options, avant de prendre tes premières décisions.`,
    ],
    solution: [
      "Apprendre en décidant",
      "Fais un choix. Comprends pourquoi.",
      "Un premier salaire, un projet à préparer, une épargne à construire : les notions prennent du sens lorsqu’elles se rapprochent de ta vie.",
      "Tu fais un choix. Tu explores ce qu’il implique. Une explication t’aide à comprendre le raisonnement, sans décider à ta place.",
    ],
    benefitsTitle: "Des connaissances qui deviennent des réflexes.",
    benefits: [
      [
        "Comprendre où va ton argent",
        "Relier épargne, investissement, frais et risque pour comprendre ce que tu fais, au-delà des mots compliqués.",
      ],
      [
        "Te poser les bonnes questions",
        "Clarifier ton objectif, ton horizon et tes contraintes avant de prendre une décision.",
      ],
      [
        "Faire le tri dans les conseils",
        "Comprendre les compromis et repérer ce qu’une promesse séduisante laisse de côté.",
      ],
      [
        "Gagner en autonomie",
        "Construire ton propre raisonnement, petit à petit, plutôt que suivre celui de quelqu’un d’autre.",
      ],
    ],
    howTitle: "Quelques minutes. Une idée à comprendre.",
    steps: [
      ["Découvre", "Une leçon courte et une situation concrète."],
      ["Choisis", "Explore une décision, sans engager ton argent."],
      ["Comprends", "Observe la conséquence et découvre son explication."],
      ["Consolide", "Vérifie ce que tu as compris et avance à ton rythme."],
    ],
    accessTitle: "La bêta est déjà accessible sur invitation.",
    access:
      "Tu as reçu un code ? « Rejoindre la bêta » te permet de créer ton compte dès maintenant. La liste d’attente te permet, elle, d’être prévenu du lancement public de l’app.",
    faqTitle: "Avant de commencer",
    faq: [
      [
        "Faut-il déjà savoir investir ?",
        `Non. ${BRAND} est conçu pour apprendre les bases et comprendre les notions au fil de situations concrètes.`,
      ],
      [
        "La liste d’attente donne-t-elle accès aux leçons ?",
        "Non. Elle permet d’être prévenu du lancement public de l’app. La bêta est déjà accessible avec un code d’invitation.",
      ],
      [
        "Vais-je utiliser de l’argent réel ?",
        `Non. Les situations et montants servent à apprendre. Tu ne passes aucun ordre d’investissement sur ${BRAND}.`,
      ],
      [
        `${BRAND} me dit-il quoi acheter ?`,
        `Non. ${BRAND} t’aide à comprendre tes options et leurs conséquences. Il ne fournit pas de recommandations d’investissement personnalisées.`,
      ],
    ],
    end: [
      "Ton premier euro mérite de bonnes bases.",
      "Comprendre une notion. Questionner un réflexe. Prendre une décision plus éclairée. Ça s’apprend, un pas après l’autre.",
    ],
  },
  us: {
    worlds: {
      description: "The mascot jumps between three worlds: risk, investments and a portfolio.",
      labels: ["Understand risk", "Compare investments", "Build your portfolio"],
    },
    solutionLabels: ["A real-life situation", "Your choice", "An explanation"],
    lessonPreview: {
      preview: "Lesson preview",
      collection: "Turn questions into better habits",
      lessonPrompts: [
        "What’s actually left to use?",
        "When should I set money aside?",
        "How do I know I’ve understood?",
      ],
      lessons: [
        "Identify money that’s available",
        "Build a saving habit",
        "Explain the choice you make",
      ],
      collectionNote: "Your first steps, before exploring investing in more depth.",
      course: "Understanding your first paycheck",
      navigation: "Course questions",
      ambition: "Invest with confidence",
      illustration: "Illustration of a Nudge lesson with an answer and its explanation.",
      sceneLabels: ["You make a choice", "You see why it matters"],
      reward: {
        preview: "Coming soon",
        complete: "Lesson complete",
        title: "Build knowledge. Grow your potential.",
        balance: "Your practice balance",
        unit: "virtual credits",
        next: "Next goal",
        nextTitle: "Understand risk",
        note: "Preview of the planned reward system. Illustrative amounts with no monetary value.",
      },
      ambitionIntro: "Look beyond the advertised return.",
      investorSkills: [
        { title: "Understand the risk", text: "What you could gain. What you could lose." },
        { title: "Compare the fees", text: "What an investment really costs you." },
        { title: "Keep your goal in sight", text: "When will you need this money?" },
      ],
      expenseNote:
        "These subscriptions could be cancelled or replaced with cheaper options, depending on your needs.",
      transferIntro: "You have $125 left in your account. A $25 phone bill is due next week.",
      transferQuestion: "How much could you set aside?",
      transferSuccess: "The $25 bill is already committed. That leaves $100 you could set aside.",
      questionCount: "Question",
      responseCorrect: "You’ve got the reasoning.",
      responseRetry: "One detail to consider.",
      exerciseIntro: "Choose an answer to explore the reasoning.",
      exercises: [
        {
          title: "Need or want?",
          context: "You use your phone for work and getting around. A new model has just come out.",
          question: "What separates a need from a want?",
          options: [
            "The price of the purchase",
            "Its purpose in your situation",
            "How often you buy it",
          ],
          correct: 1,
          explanation:
            "Having a phone may be essential, but having the latest model may not be. What matters is the role the expense plays in your life, not just its price.",
        },
        {
          title: "Balance or savings?",
          context:
            "Your paycheck has arrived. After this month’s spending, some money remains in your account.",
          question: "Is what’s left automatically savings?",
          options: [
            "Yes, as long as I don’t spend it",
            "No, I need to check upcoming expenses",
            "Only if it’s a large amount",
          ],
          correct: 1,
          explanation:
            "Your balance is a snapshot of your account. An upcoming bill may already commit some of that money. What remains could be set aside, depending on your needs.",
        },
        {
          title: "Your decision",
          context:
            "You have $200 left in your account. Your $40 transit pass will be charged tomorrow.",
          question: "How much is not already committed?",
          options: ["$200", "$160", "$40"],
          correct: 1,
          explanation:
            "$200 minus the planned $40 leaves $160 uncommitted in this example. That’s the amount you can then consider setting aside.",
        },
      ],
      heroTitle: "What’s left isn’t always yours to use.",
      question: "How much could you actually set aside?",
      balance: "In your account",
      available: "Still available",
      reserved: "Upcoming bill",
      context:
        "You have $200 left in your account. Your $40 transit pass will be charged tomorrow.",
      bill: "Transit pass",
      due: "Due tomorrow",
      try: "Give it a try",
      invitation: "Choose an amount to explore the reasoning.",
      correct: "You accounted for the bill.",
      reconsider: "Check what’s already spoken for.",
      explanation:
        "$200 in your account, minus a $40 bill, leaves $160. Before saving, separate your balance from money that’s actually available.",
      hint: "The bill hasn’t left your account yet, but that money is already committed. Subtract it to see what remains.",
      explore: "Try this preview",
      caption: "Simplified course excerpt · Illustrative amounts · Progress isn’t saved",
    },
    greeting: "Say hello to the mascot",
    hero: [
      "From your first dollar to better habits.",
      "Become the investor",
      "your ambitions deserve.",
      "Learn to invest better and take charge of your financial future. Short lessons and real-life situations to help you grow, from your first steps to your next goals.",
    ],
    reassurance: "No prior knowledge needed. Practice without using real money.",
    cta: "Join the waitlist",
    note: "We’ll let you know as soon as the app launches!",
    preview: "What you’ll learn to consider",
    questions: ["Your goal", "Your time horizon", "The risk you can take"],
    previewNote: "Clear foundations for decisions that fit your life.",
    problem: [
      "Where to begin",
      "You want to start. But where?",
      "Save, invest, keep money within reach… There’s no shortage of advice. Understanding what makes sense, and why, is another matter.",
      `${BRAND} helps you build the foundations to understand your options before making your first decisions.`,
    ],
    solution: [
      "Learn by deciding",
      "Make a choice. Understand why.",
      "A first paycheck, a future plan, savings to build: ideas make more sense when they connect to your life.",
      "Make a choice. Explore what it means. An explanation helps you understand the reasoning without deciding for you.",
    ],
    benefitsTitle: "Knowledge that becomes better habits.",
    benefits: [
      [
        "Understand where your money goes",
        "Connect saving, investing, fees and risk to understand what you’re doing, beyond the jargon.",
      ],
      [
        "Ask better questions",
        "Consider your goal, time horizon and constraints before making a decision.",
      ],
      [
        "See through the noise",
        "Understand the trade-offs and notice what an appealing promise leaves out.",
      ],
      [
        "Build your independence",
        "Develop your own reasoning, one step at a time, instead of borrowing someone else’s.",
      ],
    ],
    howTitle: "A few minutes. One idea to understand.",
    steps: [
      ["Discover", "A short lesson and a real-life situation."],
      ["Choose", "Explore a decision without putting your money at risk."],
      ["Understand", "See the consequence and the explanation behind it."],
      ["Reflect", "Check your understanding and move at your own pace."],
    ],
    accessTitle: "The beta is already available by invitation.",
    access:
      "Have a code? Choose “Join the beta” to create your account now. The waitlist is for hearing when the app launches publicly.",
    faqTitle: "Before you begin",
    faq: [
      [
        "Do I need investing experience?",
        `No. ${BRAND} is designed to teach the foundations through real-life situations.`,
      ],
      [
        "Does the waitlist unlock lessons?",
        "No. It lets you hear when the app launches publicly. The beta is already available with an invitation code.",
      ],
      [
        "Will I use real money?",
        `No. Situations and amounts are for learning. You don’t place investment orders on ${BRAND}.`,
      ],
      [
        `Does ${BRAND} tell me what to buy?`,
        `No. ${BRAND} helps you understand options and consequences. It does not provide personalized investment recommendations.`,
      ],
    ],
    end: [
      "Your first dollar deserves good foundations.",
      "Understand an idea. Question an instinct. Make a more informed decision. Learn it one step at a time.",
    ],
  },
};
