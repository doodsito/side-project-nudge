import { BRAND } from "./brand";
import { PRACTICE_CASE, type Decision } from "./practice-case";

export type NudgeLocale = "en" | "fr";
export type Topic = "markets" | "time" | "spread";

type Copy = {
  nav: string[];
  start: string;
  skip: string;
  home: string;
  language: string;
  hero: string[];
  intro: string;
  enter: string;
  promise: string;
  ribbon: string[];
  demoTitle: string;
  demoIntro: string;
  caseLabel: string;
  caseTitle: string;
  caseBody: string;
  horizon: string;
  virtual: string;
  question: string;
  choose: string;
  options: Record<Decision, { title: string; detail: string; explanation: string }>;
  see: string;
  reset: string;
  result: string;
  takeaway: string;
  checkpoint: string;
  answers: string[];
  right: string;
  wrong: string;
  next: string;
  chartTitle: string;
  before: string;
  after: string;
  contribution: string;
  total: string;
  fall: string;
  chartNote: string;
  assumption: string;
  amountNote: string;
  exploreTitle: string;
  exploreIntro: string;
  open: string;
  topicRead: string;
  topics: Record<
    Topic,
    {
      name: string;
      title: string;
      subtitle: string;
      body: string;
      detail: string;
      labels: string[];
    }
  >;
  progressTitle: string;
  progressBody: string;
  progress: string;
  completed: string;
  milestones: string[];
  session: string;
  footer: string;
  brand: string;
  prototype: string;
};

export const nudgeCopy: Record<NudgeLocale, Copy> = {
  en: {
    brand: BRAND,
    nav: ["The experience", "Explore", "Your progress"],
    start: "Try a decision",
    skip: "Skip to the experience",
    home: `${BRAND} home`,
    language: "Language",
    hero: ["Get a feel", "for investing."],
    intro:
      "Less abstract. More hands-on. A place to practise investing, one small decision at a time.",
    enter: "Find your first nudge",
    promise: "Real questions. Virtual money. Room to try.",
    ribbon: ["Practise", "Understand", "Learn", "Repeat"],
    demoTitle: "A little practice.\nA different perspective.",
    demoIntro: "Put yourself in the moment. Make a choice. Then look at what actually changes.",
    caseLabel: "Inside the experience",
    caseTitle: "The market dips.\nNow what?",
    caseBody:
      "Alex has {portfolio} invested and a {planned} contribution planned. The market falls {drop}. The plan was long term. Does a lower price change the decision?",
    horizon: "Long-term plan",
    virtual: "Fictional case · Virtual money",
    question: "What would you explore?",
    choose: "Choose a possibility, then examine the trade-off.",
    options: {
      planned: {
        title: "Keep the planned contribution",
        detail: "Add {planned} to the invested amount",
        explanation: PRACTICE_CASE.decisions[0].tradeoff,
      },
      wait: {
        title: "Wait for now",
        detail: "Keep {planned} available in cash",
        explanation: PRACTICE_CASE.decisions[1].tradeoff,
      },
      more: {
        title: "Increase the contribution",
        detail: "Explore adding {extra} instead",
        explanation: PRACTICE_CASE.decisions[2].tradeoff,
      },
    },
    see: "See what changes",
    reset: "Try another choice",
    result: "Here’s the trade-off.",
    takeaway: PRACTICE_CASE.takeaway,
    checkpoint: "What changes the context most?",
    answers: [
      "A prediction of a quick recovery",
      "Alex now needs the money for an expense",
      "More people online are buying",
    ],
    right:
      "Exactly. A new need for the money changes the context. A price prediction doesn’t remove uncertainty.",
    wrong:
      "Look at Alex’s circumstances. Predictions and other people’s decisions don’t tell us when Alex needs this money.",
    next: "Explore another idea",
    chartTitle: "Separate the market from the money you add.",
    before: "Before the fall",
    after: "After the fall",
    contribution: "New contribution",
    total: "Invested after your choice",
    fall: "Market movement",
    chartNote:
      "Lengths show invested value on the same scale, starting at zero. A contribution is added money, not a return.",
    assumption:
      "Illustrative calculation · A 10% fall applies to the whole portfolio. No subsequent market movement, fees or taxes are modelled.",
    amountNote:
      "The increased contribution is assumed to be {extra} for this example. Cash is separate from invested value.",
    exploreTitle: "Follow your curiosity.",
    exploreIntro: "Small ideas. A clearer picture. Choose something you want to understand.",
    open: "Explore this idea",
    topicRead: "Mark as explored",
    topics: {
      markets: {
        name: "Market movements",
        title: "A dip is a moment.\nNot the whole story.",
        subtitle: "Prices & perspective",
        body: "A price can change before your plans do. Learn to separate what happened in the market from what changed in your life.",
        detail:
          "Alex’s example asks you to compare choices without guessing what happens next. A fall alone cannot tell you whether to invest.",
        labels: ["A market event", "Your circumstances", "Your decision"],
      },
      time: {
        name: "Time horizons",
        title: "Same money.\nDifferent timelines.",
        subtitle: "Time & uncertainty",
        body: "Money needed next year and money intended for a distant goal face different constraints. Timing changes how much flexibility a person has.",
        detail:
          "More time does not guarantee recovery. A nearer expense can leave less flexibility to wait through a fall. This diagram compares time, not expected returns.",
        labels: ["Needed in 1 year", "Intended for 12 years", "Time, not a forecast"],
      },
      spread: {
        name: "Diversification",
        title: "One basket?\nThink in pieces.",
        subtitle: "Exposure & balance",
        body: "Spreading investments changes how much depends on one holding. It does not make every piece independent or remove the possibility of loss.",
        detail:
          "Illustration: one holding versus four equal holdings. If one loses half its value and the others stay unchanged, the combined loss is 50% versus 12.5%. Real holdings can fall together.",
        labels: ["One holding", "Four equal holdings", "Illustrative exposure"],
      },
    },
    progressTitle: "Understanding adds up.",
    progressBody:
      "A choice, a reason, a new connection. Build a trail of things that make sense to you.",
    progress: "explored",
    completed: "Your first connections are in place.",
    milestones: ["Make a decision", "Check your reasoning", "Explore an idea"],
    session: "Your trail in this session. Refreshing starts a new session.",
    footer: "An educational experience. No real transactions or personalised investment advice.",
    prototype: "Direction study / 2026",
  },
  fr: {
    brand: BRAND,
    nav: ["L’expérience", "Explorer", "Votre parcours"],
    start: "Essayer une décision",
    skip: "Aller à l’expérience",
    home: `Accueil ${BRAND}`,
    language: "Langue",
    hero: ["L’investissement,", "ça se pratique."],
    intro:
      "Moins abstrait. Plus concret. Un espace pour comprendre l’investissement, une décision à la fois.",
    enter: "Trouver le premier déclic",
    promise: "De vraies questions. De l’argent virtuel. Le droit d’essayer.",
    ribbon: ["Pratiquer", "Comprendre", "Apprendre", "Recommencer"],
    demoTitle: "Un peu de pratique.\nUn autre regard.",
    demoIntro: "Entrez dans la situation. Faites un choix. Puis observez ce qui change vraiment.",
    caseLabel: "Au cœur de l’expérience",
    caseTitle: "Le marché baisse.\nEt maintenant ?",
    caseBody:
      "Alex a investi {portfolio} et prévoit un versement de {planned}. Le marché baisse de {drop}. Le projet est à long terme. Un prix plus bas change-t-il la décision ?",
    horizon: "Projet à long terme",
    virtual: "Cas fictif · Argent virtuel",
    question: "Quelle piste explorer ?",
    choose: "Choisissez une possibilité pour en comprendre les compromis.",
    options: {
      planned: {
        title: "Maintenir le versement prévu",
        detail: "Ajouter {planned} au montant investi",
        explanation:
          "Le montant prévu reste le même. Cela ne suffit pas à savoir si le projet correspond toujours aux besoins de la personne.",
      },
      wait: {
        title: "Attendre pour le moment",
        detail: "Garder {planned} disponibles",
        explanation:
          "Tant qu’il reste disponible, ce montant n’est pas exposé aux variations du marché, y compris à une hausse. Attendre ne rend pas le prochain point d’entrée prévisible.",
      },
      more: {
        title: "Augmenter le versement",
        detail: "Explorer un ajout de {extra}",
        explanation:
          "Un prix plus bas ne garantit pas un rebond. Investir davantage réduit aussi l’argent disponible pour d’autres besoins.",
      },
    },
    see: "Voir ce qui change",
    reset: "Essayer un autre choix",
    result: "Voici le compromis.",
    takeaway:
      "Une baisse des prix ne suffit pas à trancher. L’objectif, l’échéance, l’argent disponible et la capacité à supporter une perte comptent aussi. Aucun choix ne garantit de rendement.",
    checkpoint: "Qu’est-ce qui change le plus le contexte ?",
    answers: [
      "Une prévision de rebond rapide",
      "Alex a besoin de cet argent pour une dépense",
      "Davantage de personnes achètent en ligne",
    ],
    right:
      "Exactement. Un nouveau besoin change le contexte. Une prévision de prix ne supprime pas l’incertitude.",
    wrong:
      "Regardez la situation d’Alex. Les prévisions et les choix des autres ne disent pas quand Alex aura besoin de cet argent.",
    next: "Explorer une autre idée",
    chartTitle: "Distinguer le marché de l’argent ajouté.",
    before: "Avant la baisse",
    after: "Après la baisse",
    contribution: "Nouveau versement",
    total: "Montant investi après votre choix",
    fall: "Variation du marché",
    chartNote:
      "Les longueurs représentent le montant investi sur la même échelle, à partir de zéro. Un versement est un apport, pas un rendement.",
    assumption:
      "Calcul illustratif · La baisse de 10 % touche tout le portefeuille. Aucune variation ultérieure, aucuns frais ni impôts ne sont modélisés.",
    amountNote:
      "Dans cet exemple, le versement augmenté est fixé à {extra}. L’argent disponible est distinct du montant investi.",
    exploreTitle: "Suivez votre curiosité.",
    exploreIntro:
      "Une idée à la fois, les choses s’éclairent. Choisissez ce que vous voulez comprendre.",
    open: "Explorer cette idée",
    topicRead: "Marquer comme exploré",
    topics: {
      markets: {
        name: "Mouvements du marché",
        title: "Une baisse, un instant.\nPas toute l’histoire.",
        subtitle: "Prix et perspective",
        body: "Les prix peuvent changer avant vos projets. Apprenez à distinguer ce qui se passe sur le marché de ce qui change dans votre vie.",
        detail:
          "Le cas d’Alex invite à comparer les choix sans deviner la suite. Une baisse seule ne permet pas de décider s’il faut investir.",
        labels: ["Un événement de marché", "Votre situation", "Votre décision"],
      },
      time: {
        name: "Horizon de placement",
        title: "Même argent.\nAutres échéances.",
        subtitle: "Temps et incertitude",
        body: "L’argent nécessaire l’an prochain et celui destiné à un projet lointain n’impliquent pas les mêmes contraintes. L’échéance change la marge de manœuvre.",
        detail:
          "Plus de temps ne garantit pas un rebond. Une dépense proche peut laisser moins de liberté pour traverser une baisse. Ce schéma compare des durées, pas des rendements attendus.",
        labels: ["Nécessaire dans 1 an", "Prévu pour dans 12 ans", "Une durée, pas une prévision"],
      },
      spread: {
        name: "Diversification",
        title: "Un seul panier ?\nPensons en parts.",
        subtitle: "Exposition et équilibre",
        body: "Répartir ses investissements change la dépendance à un seul placement. Cela ne rend pas les placements indépendants et ne supprime pas le risque de perte.",
        detail:
          "Illustration : un placement contre quatre parts égales. Si un placement perd la moitié de sa valeur et les autres restent stables, la perte totale est de 50 % contre 12,5 %. En réalité, plusieurs placements peuvent baisser ensemble.",
        labels: ["Un placement", "Quatre parts égales", "Exposition illustrative"],
      },
    },
    progressTitle: "Les déclics s’additionnent.",
    progressBody:
      "Un choix, une raison, un lien nouveau. Construisez un parcours d’idées qui prennent sens.",
    progress: "explorés",
    completed: "Vos premiers liens prennent forme.",
    milestones: ["Faire un choix", "Vérifier son raisonnement", "Explorer une idée"],
    session: "Votre parcours dans cette session. Actualiser démarre une nouvelle session.",
    footer:
      "Une expérience pédagogique. Aucune transaction réelle ni aucun conseil d’investissement personnalisé.",
    prototype: "Étude de direction / 2026",
  },
};

export const CASE_VALUES = { portfolio: 10000, planned: 500, extra: 1000, fall: 0.1 } as const;
export function caseResult(decision: Decision | null) {
  const afterFall = CASE_VALUES.portfolio * (1 - CASE_VALUES.fall);
  const added =
    decision === "planned" ? CASE_VALUES.planned : decision === "more" ? CASE_VALUES.extra : 0;
  return { afterFall, added, total: afterFall + added };
}
export function formatters(locale: NudgeLocale) {
  const language = locale === "fr" ? "fr-FR" : "en-IE";
  const money = (value: number) =>
    new Intl.NumberFormat(language, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  const percent = (value: number) =>
    new Intl.NumberFormat(language, { style: "percent", maximumFractionDigits: 1 }).format(value);
  const interpolate = (value: string) =>
    value
      .replaceAll("{portfolio}", money(CASE_VALUES.portfolio))
      .replaceAll("{planned}", money(CASE_VALUES.planned))
      .replaceAll("{extra}", money(CASE_VALUES.extra))
      .replaceAll("{drop}", percent(CASE_VALUES.fall));
  return { money, percent, interpolate };
}
