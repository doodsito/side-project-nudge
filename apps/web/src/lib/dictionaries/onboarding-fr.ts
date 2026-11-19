import { BRAND } from "@/lib/brand";

export const onboardingFr = {
  welcome: `Bienvenue sur ${BRAND} !`,
  welcomeDetail: "Quelques questions pour te proposer un parcours qui te ressemble.",
  start: "C’est parti",
  next: "Continuer",
  close: "Passer l’onboarding et ouvrir le Monde 0",
  progress: "Progression de l’onboarding",
  soundMute: "Son activé · couper",
  soundEnable: "Activer le son",
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
      { title: "Je débute", detail: "Je n’ai pas encore investi et je veux comprendre les bases." },
      {
        title: "J’ai quelques notions",
        detail: "Je connais les bases et je veux les mettre en pratique.",
      },
      {
        title: "J’investis déjà",
        detail: "Je veux approfondir mes connaissances et comparer mes options.",
      },
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
  paths: {
    title: "Comment veux-tu explorer ?",
    detail: "Fais défiler les parcours et choisis celui qui te ressemble.",
    topics: "Tu exploreras",
    choose: "Choisir ce parcours",
    selected: "Parcours choisi",
    choices: [
      {
        label: "Explorer",
        title: "Un peu de tout",
        detail: "Compare différentes façons de faire grandir ou de protéger une somme.",
        topics: "Épargne · ETF · immobilier · crypto · actifs alternatifs",
      },
      {
        label: "Poser les bases",
        title: "À ton rythme",
        detail: "Commence par les repères du quotidien avant de découvrir d’autres options.",
        topics: "Budget · épargne · réserve · diversification",
      },
      {
        label: "Approfondir",
        title: "Aller plus loin",
        detail: "Pars de ce que tu connais déjà pour comparer les approches et leurs compromis.",
        topics: "ETF · actions · obligations · portefeuille virtuel",
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
    detail: "Choisis quand recevoir un rappel sur ton adresse d’inscription.",
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
    title: `Te voilà dans ${BRAND} !`,
    detail: "Tu vas apprendre en pratiquant, sans argent réel en jeu.",
    action: "Commencer le Monde 0",
  },
  ritual: "Ton petit rendez-vous",
  daily: "{minutes} min par jour",
  preferredTime: "Heure choisie · {time}",
  reminderNote:
    "L’heure est enregistrée sur cet appareil. L’envoi des rappels par e-mail est en préparation.",
};
