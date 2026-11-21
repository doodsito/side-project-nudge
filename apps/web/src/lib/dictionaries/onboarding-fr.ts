import { BRAND } from "@/lib/brand";

export const onboardingFr = {
  welcome: `Bienvenue sur ${BRAND} !`,
  welcomeDetail: "Quelques questions pour te proposer un parcours qui te ressemble.",
  start: "C’est parti",
  next: "Continuer",
  back: "Retour",
  close: "Passer l’onboarding et ouvrir le Monde 0",
  progress: "Progression de l’onboarding",
  motivation: {
    title: "Pourquoi veux-tu apprendre à investir ?",
    detail: "On adapte ton parcours à ce qui t’amène ici.",
    choices: [
      "Mieux comprendre les bases",
      "Préparer mes futurs choix",
      "Je suis simplement curieux·se",
    ],
  },
  experience: {
    title: "Où en es-tu avec l’investissement ?",
    detail: "Épargne ou investissement, indique le niveau qui te ressemble.",
    choices: ["Débutant", "Quelques notions", "J’investis déjà"],
    summaries: [
      { detail: "Je n’ai pas encore investi et je veux comprendre les bases." },
      { detail: "Je connais les bases et je veux les mettre en pratique." },
      { detail: "Je veux approfondir mes connaissances et comparer mes options." },
    ],
  },
  topics: {
    title: "Qu’aimerais-tu apprendre ?",
    detail: "Choisis les sujets qui t’intéressent.",
    choices: [
      { title: "Comprendre les bases", detail: "Les notions essentielles" },
      { title: "Organiser mon budget", detail: "Épargne, dépenses et imprévus" },
      { title: "Comprendre l’investissement", detail: "Risques, durée et diversification" },
      { title: "Préparer mes projets", detail: "Faire des choix adaptés à mes objectifs" },
    ],
  },
  lessonChoice: {
    title: "Quelles leçons veux-tu explorer ?",
    detail: "Fais défiler et choisis ton univers.",
    recommended: "Pour toi",
    universes: [
      {
        title: "Mes bases",
        description: "Budget, épargne, sécurité.",
        goal: "Objectif : poser tes bases.",
      },
      {
        title: "Mes projets",
        description: "Projets, besoins, choix.",
        goal: "Objectif : préparer tes projets.",
      },
      {
        title: "Investir",
        description: "Risque, placements, options.",
        goal: "Objectif : comprendre le risque.",
      },
    ],
  },
  pace: {
    title: "Combien de temps veux-tu y consacrer par jour ?",
    detail: "Choisis un rythme qui te convient.",
    choices: ["Quelques minutes", "Un bon rythme", "Je suis motivé·e"],
  },
  reminder: {
    title: "Choisis un moment qui te convient.",
    detail: "On t’enverra un rappel pour garder le rythme.",
    time: "Heure du rappel par e-mail",
    skip: "Sans rappel",
    finish: "Enregistrer mon heure",
  },
  preparing: {
    title: "Ton petit rendez-vous prend forme…",
    detail: "Poggo prépare ton espace.",
    action: "On y est presque",
  },
  ready: {
    title: "Te voilà prêt !",
    detail: "Tu vas apprendre en pratiquant, sans argent réel en jeu.",
    action: "Commencer le Monde 0",
    durationLabel: "TON RYTHME",
    durationUnit: "par jour",
    timeLabel: "RAPPEL À",
    anytime: "À ton rythme",
  },
  ritual: "Ton petit rendez-vous",
  daily: "{minutes} min",
  preferredTime: "Heure choisie · {time}",
  reminderNote:
    "L’heure est enregistrée sur cet appareil. L’envoi des rappels par e-mail est en préparation.",
};
