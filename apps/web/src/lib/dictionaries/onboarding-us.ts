import { BRAND } from "@/lib/brand";

export const onboardingUs = {
  welcome: `Welcome to ${BRAND}!`,
  welcomeDetail: "A few questions to find out what you’d like to learn.",
  start: "Let’s go",
  next: "Continue",
  back: "Back",
  close: "Skip onboarding and open World 0",
  progress: "Onboarding progress",
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
      { detail: "I haven’t invested yet and want to understand the basics." },
      { detail: "I know the basics and want to put them into practice." },
      { detail: "I want to build on what I know and compare my options." },
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
  lessonChoice: {
    title: "Which lessons would you like to explore?",
    detail: "Scroll and choose your universe.",
    recommended: "For you",
    universes: [
      {
        title: "My foundations",
        description: "Budget, saving, safety.",
        goal: "Goal: build your foundation.",
      },
      {
        title: "My plans",
        description: "Goals, needs, choices.",
        goal: "Goal: prepare for your plans.",
      },
      {
        title: "Investing",
        description: "Risk, investments, options.",
        goal: "Goal: understand risk and options.",
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
    detail: "We’ll send a reminder to help you keep the rhythm.",
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
    title: "You’re ready!",
    detail: "You’ll learn by practicing without putting real money at risk.",
    action: "Start World 0",
    durationLabel: "YOUR ROUTINE",
    durationUnit: "per day",
    timeLabel: "REMINDER AT",
    anytime: "Whenever works",
  },
  ritual: "Your daily practice",
  daily: "{minutes} min",
  preferredTime: "Preferred time · {time}",
  reminderNote:
    "Your time is saved on this device. Email reminders are coming in a future version.",
};
