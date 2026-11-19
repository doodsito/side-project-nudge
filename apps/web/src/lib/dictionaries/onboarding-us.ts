import { BRAND } from "@/lib/brand";

export const onboardingUs = {
  welcome: `Welcome to ${BRAND}!`,
  welcomeDetail: "A few questions to find out what you’d like to learn.",
  start: "Let’s go",
  next: "Continue",
  close: "Skip onboarding and open World 0",
  progress: "Onboarding progress",
  soundMute: "Sound on · mute",
  soundEnable: "Turn sound on",
  motivation: {
    title: "Why do you want to learn about investing?",
    detail: "Tell us what brought you here.",
    choices: ["Understand the basics", "Prepare for future decisions", "I’m just curious"],
  },
  experience: {
    title: "How much do you know about investing?",
    detail: "Pick the level that fits your experience with saving or investing.",
    choices: ["Beginner", "Some experience", "Already investing"],
    summaries: [
      {
        title: "I’m just starting",
        detail: "I haven’t invested yet and I want to understand the basics.",
      },
      {
        title: "I know a little",
        detail: "I understand the basics and want to put them into practice.",
      },
      {
        title: "I already invest",
        detail: "I want to build on what I know and compare my options.",
      },
    ],
  },
  topics: {
    title: "What would you like to learn?",
    detail: "Choose the topics that interest you.",
    choices: [
      { title: "Understand the basics", detail: "The essential concepts" },
      { title: "Build a budget", detail: "Savings, spending, and unexpected costs" },
      { title: "Understand investing", detail: "Risk, time, and diversification" },
      { title: "Plan for my goals", detail: "Make choices that fit my priorities" },
    ],
  },
  paths: {
    title: "How would you like to explore?",
    detail: "Browse the paths and choose one that feels right.",
    topics: "What you’ll explore",
    choose: "Choose this path",
    selected: "Path selected",
    choices: [
      {
        label: "Explore",
        title: "A bit of everything",
        detail: "Compare different ways to grow or protect a sum of money.",
        topics: "Savings · ETFs · real estate · crypto · alternative assets",
      },
      {
        label: "Build the basics",
        title: "At your own pace",
        detail: "Start with everyday money decisions before exploring other options.",
        topics: "Budgeting · savings · emergency funds · diversification",
      },
      {
        label: "Go deeper",
        title: "Build on what you know",
        detail: "Compare approaches and weigh their trade-offs.",
        topics: "ETFs · stocks · bonds · virtual portfolio",
      },
    ],
  },
  pace: {
    title: "How much time can you spend each day?",
    detail: "Pick a pace that fits your day.",
    choices: ["A few minutes", "A steady pace", "I’m ready for more"],
  },
  reminder: {
    title: "Pick a time that works for you.",
    detail: "Choose when to receive a reminder at the email address you signed up with.",
    time: "Email reminder time",
    skip: "Skip reminders",
    finish: "Save my time",
  },
  preparing: {
    title: "Your routine is taking shape…",
    detail: "Poggo is getting your space ready.",
    action: "Almost there",
  },
  ready: {
    title: `You’re in ${BRAND}!`,
    detail: "You’ll learn by practicing without putting real money at risk.",
    action: "Start World 0",
  },
  ritual: "Your daily practice",
  daily: "{minutes} min per day",
  preferredTime: "Preferred time · {time}",
  reminderNote:
    "Your time is saved on this device. Email reminders are coming in a future version.",
};
