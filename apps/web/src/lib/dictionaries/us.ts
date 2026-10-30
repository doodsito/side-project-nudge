// Site copy for the US track: American English, amounts in dollars.
// The French copy (fr.ts) follows the same shape.
import { BRAND } from "@/lib/brand";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/auth-rules";

export const us = {
  skipLink: "Skip to content",
  meta: {
    title: "Practice Investing Decisions",
    description:
      "Practice realistic investing decisions with virtual money and understand the reasoning before your savings are on the line.",
    ogTitle: "Practice investing before real money is on the line",
    ogDescription:
      "Build an investing decision process through realistic simulations, virtual money and personalized educational feedback.",
  },
  nav: {
    main: "Main navigation",
    mobile: "Mobile navigation",
    toggle: "Toggle navigation",
    home: "home",
    challenge: "Try a challenge",
    howItWorks: "How it works",
    logIn: "Log in",
    signUp: "Access the beta",
    open: "Open",
    accountMenu: "Account menu",
    account: "Account",
    logOut: "Log out",
  },
  hero: {
    eyebrow: "For students & first-job starters",
    title: "Your first money decisions.",
    titleAccent: "A little clearer.",
    intro:
      "New to saving or investing? Start with Alex’s first paycheck. Choose what to do with $100, explore the trade-offs and check what you learned, without using real money.",
    cta: "Join the waitlist",
    points: ["Free", "One short case", "No account required"],
    scrollHint: "Try a quick question",
  },
  heroWindow: {
    title: "A preview of your first case",
    badge: "Fictional example",
    left: "Alex has $100 left after essentials.",
    savings: "Accessible savings: $200.",
    event: "Markets fall 10%",
    question: "What would you review before acting?",
    options: [
      "Invest the $100 now",
      "Keep the $100 in accessible savings",
      "Split the $100 between both",
    ],
    footer: "Compare savings and investing in the practice case. No real money, no stock tips.",
  },
  challenge: {
    label: "Learn by deciding",
    title: "Start with a small decision.",
    text: "Try this question before the full case. Choose an answer to explore the reasoning.",
    promises: [
      "No “perfect answer” detached from your situation",
      "No stock tips or pressure to trade",
      "No real capital at risk",
    ],
    badge: "20-second challenge",
    count: "1 of 1",
    context: "You planned to invest for 10 years. Markets fall 10% this week.",
    question: "What should you review first?",
    answersLabel: "Challenge answers",
    answers: {
      A: {
        answer: "Which stocks fell the most",
        title: "Price movement is only one piece of the decision.",
        copy: "Knowing what fell tells you what the market did, not whether your goal, timeline or ability to take risk changed. A lower price alone is not a complete reason to act.",
      },
      B: {
        answer: "Whether your goal, timeline or risk capacity changed",
        title: "Start with what changed for you.",
        copy: "Your investment decision should begin with your situation, not with this week’s market movement.",
      },
      C: {
        answer: "What financial influencers are buying",
        title: "Someone else’s decision may not fit your life.",
        copy: "Their goal, time horizon, finances and tolerance for loss may be completely different. Borrowed conviction is fragile when markets move.",
      },
    },
    prompt: `Choose an answer to see how ${BRAND} turns a reaction into a reasoned decision.`,
    checks: [
      ["Goal", "Has the reason you are investing changed?"],
      ["Timeline", "Do you still have roughly the same amount of time?"],
      ["Risk capacity", "Has your financial ability to tolerate losses changed?"],
    ] as Array<[string, string]>,
    takeaway: "Market prices changed. Your plan may not have.",
    nudge: "Want to see how this changes based on your situation?",
    cta: "Try the full practice case",
  },
  how: {
    label: `How ${BRAND} works`,
    title: "Choose. Understand. Try again.",
    step: "STEP",
    steps: [
      [
        "01",
        "Meet a fictional situation.",
        "Alex has $100 left after essentials. Decide what to do with it before answering any personal questions.",
      ],
      [
        "02",
        "Choose with virtual money.",
        "Compare accessible savings, a first investment or a split. The amounts are fictional.",
      ],
      [
        "03",
        "Take one idea away.",
        "See the cash consequence, check your understanding and optionally explore how your context changes the explanation.",
      ],
    ] as Array<[string, string, string]>,
    cta: "Try the practice case",
  },
  faq: {
    label: "Before you begin",
    title: "Good questions deserve clear answers.",
    text: `${BRAND} is designed to help beginners build judgment, not to make investment choices for them.`,
    items: [
      [
        "Do I need investing experience?",
        `No. ${BRAND} starts with the decisions first-time investors face and explains the concepts as they become useful.`,
      ],
      [
        "Will I use real money?",
        `No. ${BRAND} uses simulated portfolios and virtual money for educational practice.`,
      ],
      [
        `Does ${BRAND} tell me what to buy?`,
        `No. ${BRAND} helps you understand the reasoning behind investment decisions rather than recommending specific financial products.`,
      ],
      [
        "How is this different from a finance video?",
        `Videos explain concepts. ${BRAND} asks you to make the decision first, then teaches the concepts through the consequences and reasoning behind that choice.`,
      ],
      [
        "Is this financial advice?",
        `No. ${BRAND} is designed for educational purposes and simulated practice. It does not provide personalized investment recommendations.`,
      ],
    ] as Array<[string, string]>,
  },
  earlyAccess: {
    label: `${BRAND} early access`,
    title: "Keep practicing before real money is on the line.",
    text: `Join the early access list to be among the first to practice new investing scenarios with ${BRAND}.`,
    profileLegend: "Which describes you best?",
    profiles: {
      student: "Student",
      young_professional: "Young professional",
      other: "Other",
    },
    profileError: "Choose the option that describes you best.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    submit: "Join early access",
    saving: "Joining…",
    done: "You’re on the list.",
    error: "We couldn’t save your place just now. Please try again.",
    consent: `We’ll only email you about early access and the launch of ${BRAND}. You can leave the list at any time. You must be 15 or older.`,
    privacy: "Privacy policy",
  },
  tracks: {
    title: `Welcome to ${BRAND}`,
    description: "Where are you based? You can switch at the bottom of the page.",
    continue: "Continue",
    options: {
      fr: { country: "France", detail: "In French, in euros" },
      us: { country: "United States", detail: "In English, in dollars" },
    },
  },
  footer: {
    disclaimer: `${BRAND} is an educational simulation using virtual money. It is not financial advice, a recommendation or a suitability assessment. Investing involves risk, including the possible loss of capital.`,
    rights: "All rights reserved.",
    nav: "Legal and site information",
    privacy: "Privacy",
    terms: "Terms",
    legal: "Legal",
    cookies: "Cookies",
    version: "Version",
  },
  auth: {
    pages: {
      login: {
        metaTitle: "Log in",
        metaDescription: `Log in to your ${BRAND} account.`,
        eyebrow: "Welcome back",
        title: "Log in",
        intro: "Use the account you created.",
      },
      signupCode: {
        metaTitle: "Sign up",
        metaDescription: `Create your ${BRAND} account with your invitation code.`,
        eyebrow: "Invitation only",
        title: "Enter your invitation code",
        intro: `${BRAND} opens to a few people at a time. Enter the code you were given to create your account.`,
      },
      signupAccount: {
        eyebrow: "Code accepted",
        title: "Create your account",
        intro: "Your email address and a password are all you need.",
      },
      forgot: {
        metaTitle: "Forgot your password?",
        eyebrow: "Password reset",
        title: "Forgot your password?",
        intro: "Enter your email address and we’ll send you a link to choose a new one.",
      },
      reset: {
        metaTitle: "Choose a new password",
        eyebrow: "Password reset",
        title: "Choose a new password",
        intro: "You’ll use it with your email address to log in.",
      },
      signedIn: {
        eyebrow: "Logged in",
        title: "You’re already logged in",
        intro: "You’re logged in as",
        open: "Open",
      },
    },
    links: {
      forgot: "Forgot your password?",
      newHere: "New here?",
      signUp: "Sign up",
      noCode: "No code yet?",
      joinWaitlist: "Join the waitlist",
      haveAccount: "Already have an account?",
      logIn: "Log in",
      remembered: "Remembered it?",
      differentCode: "Use a different invitation code",
      consentBefore: "By creating an account, you agree to the",
      terms: "Terms of service",
      consentMiddle: "and confirm you have read the",
      privacy: "Privacy policy",
      consentAfter: ". You must be 15 or older.",
    },
    form: {
      email: "Email address",
      emailPlaceholder: "you@example.com",
      password: "Password",
      newPassword: "New password",
      showPassword: "Show password",
      hidePassword: "Hide password",
      signUp: "Create my account",
      signUpPending: "Creating…",
      logIn: "Log in",
      logInPending: "Logging in…",
      savePassword: "Save my new password",
      savePasswordPending: "Saving…",
      checkInboxBefore: "Check your inbox: we sent a link to",
      checkInboxAfter:
        "to confirm your email. Open it in this browser to finish creating your account.",
      resetSentBefore: "If an account uses",
      resetSentAfter: ", we sent it a link to choose a new password. Open it in this browser.",
      resetSubmit: "Send me a reset link",
      resetAgain: "Send the link again",
      resetPending: "Sending…",
      code: "Invitation code",
      codePlaceholder: "Your code…",
      codeSubmit: "Continue",
      codePending: "Checking…",
      google: "Continue with Google",
      googlePending: "Opening Google…",
      or: "or",
      strength: "Password strength",
      levels: ["Weak password", "Fair password", "Strong password"] as [string, string, string],
      ruleDone: "(done)",
      ruleMissing: "(missing)",
      rules: {
        length: `At least ${PASSWORD_MIN_LENGTH} characters`,
        letter: "A letter",
        number: "A number",
      },
    },
    urlErrors: {
      access:
        "This account doesn’t have access yet. Enter your invitation code, then log in again.",
      auth: "The log-in didn’t finish. Please try again.",
      link: "This link has expired or was opened in another browser. If you just confirmed your email, log in with your password.",
      reset:
        "This reset link has expired, was already used or was opened in another browser. Ask for a new one below, then open it in this browser.",
    } as Record<string, string>,
    errors: {
      tooMany: "Too many attempts. Wait a few minutes, then try again.",
      tryAgain: "Something went wrong on our side. Please try again.",
      noAccess: "This account doesn’t have access yet. Enter your invitation code first.",
      codeFormat: "Enter the invitation code you were given: letters, numbers and dashes.",
      codeCheck: "We couldn’t check your code just now. Please try again.",
      codeInvalid: "This code isn’t valid or has expired.",
      codeExpired: "Your invitation code has expired. Enter it again to continue.",
      email: "Enter a valid email address, like you@example.com.",
      passwordMissing: "Enter your password.",
      tooShort: `Use at least ${PASSWORD_MIN_LENGTH} characters for your password.`,
      tooLong: `Use at most ${PASSWORD_MAX_LENGTH} characters for your password.`,
      rules: "Use at least one letter and one number in your password.",
      accountExists: "An account already uses this email. Log in instead.",
      confirmFirst: "Confirm your email first: open the link we sent you, then log in.",
      wrongCredentials: "Wrong email or password.",
      resetExpired: "Your reset link has expired. Ask for a new one from the log-in page.",
      samePassword: "Choose a password different from your current one.",
    },
  },
  learning: {
    shared: {
      lessonProgress: (current: number, total: number) =>
        `Lesson progress: step ${current} of ${total}`,
      leaveLesson: "Leave lesson",
      educationalNote: "Educational simulation only. Not investment advice.",
    },
    courses: {
      yourCourses: "Your courses",
      nextLesson: "Next lesson",
      viewAllLessons: "View all lessons",
      roadmap: "Other worlds",
      journeyLabel: "Your learning journey",
      journeyTitle: "Nine worlds. One decision at a time.",
      journeyIntro:
        "Build the foundations, practise with virtual money and unlock the knowledge behind your first investment decisions.",
      worldsCompleted: "0 of 9 worlds",
      firstWorldReady: "World 0 is ready",
      mapLabel: "Journey map",
      mapTitle: "Choose your world",
      mapIntro:
        "Start with World 0 if investing is new to you. World 1 stays open at your own pace; later worlds are still in the works.",
      world: "World",
      ready: "Ready to explore",
      locked: "Locked",
      lessonsComplete: (completed: number, total: number) =>
        `${completed} of ${total} lessons complete · About 35 minutes`,
      worldProgress: (completed: number, total: number) =>
        `World 1 progress: ${completed} of ${total} lessons`,
      enterWorld: "Enter world",
      worlds: [
        {
          title: "Build your financial foundation",
          description: "Give every dollar a job before you ask it to grow.",
        },
        {
          title: "Meet the investment world",
          description: "Discover stocks, bonds, ETFs, crypto, cash and the accounts around them.",
        },
        {
          title: "Risk, diversification & psychology",
          description: "Understand uncertainty, spread risk and spot emotional traps.",
        },
        {
          title: "Understand ETFs",
          description: "Learn what an ETF contains and which details are worth comparing.",
        },
        {
          title: "Build your first portfolio",
          description: "Turn a goal, a horizon and a risk limit into a virtual portfolio.",
        },
        {
          title: "Investing in the United States",
          description: "Match US accounts and savings vehicles to their real purpose.",
        },
        {
          title: "How buying actually works",
          description: "Understand brokers, orders, fees and what happens after you press Buy.",
        },
        {
          title: "Your first real investment",
          description: "Bring your knowledge, practice and personal plan together.",
        },
      ],
      intro: {
        label: "World 0 · Start here",
        title: "Why learn about investing?",
        description:
          "A short lesson on the idea, compounding, and risk. You do not need to invest today.",
        duration: "~3 min",
        start: "Explore World 0",
        review: "Review World 0",
        completed: "Lesson complete",
        progressLabel: (completed: number) => `World 0 progress: ${completed} of 1 lessons`,
      },
      foundation: {
        metaTitle: "Build your financial foundation",
        back: "All worlds",
        label: "World 1 · Money foundations",
        title: "Build your financial foundation",
        intro: "Before investing, learn what your money needs to do today, soon and much later.",
        progress: "Progress",
        totalTime: "Total time",
        duration: "~35 min",
        progressLabel: (completed: number, total: number) =>
          `World progress: ${completed} of ${total} lessons`,
        pathLabel: "Your path",
        pathTitle: "Eight decisions before the market",
        pathIntro:
          "Start with a first paycheck. Each short lesson opens the next part of the path.",
        lesson: "Lesson",
        completed: "Completed",
        unlocked: "Unlocked",
        practicalDecision: "One practical decision",
        virtualMoney: "Virtual money",
        review: "Review lesson",
        start: "Start lesson",
        rewardLabel: "World reward",
        rewardTitle: "Eight lessons to build your foundations",
        rewardIntro: "Finish World 1 to see what you have learned in this beta.",
        rewardCompleteTitle: "Your foundations are complete",
        rewardCompleteIntro: "You finished all eight lessons. Thank you for exploring this beta.",
        lessons: [
          {
            title: "Where does your money go?",
            description: "Help Alex work out what is really left after the essentials.",
          },
          {
            title: "Pay yourself first",
            description: "Explore why saving first feels different from saving what is left.",
          },
          {
            title: "How much should you save?",
            description: "Use common percentages as flexible reference points, not fixed rules.",
          },
          {
            title: "Build your safety net",
            description: "See why different lives can call for different cash buffers.",
          },
          {
            title: "Money you’ll need soon",
            description: "Separate near-term needs from money that can stay invested longer.",
          },
          {
            title: "Debt vs investing",
            description: "Compare a certain borrowing cost with an uncertain investment return.",
          },
          {
            title: "Cash isn’t risk-free",
            description: "Watch inflation change what the same amount of cash can buy.",
          },
          {
            title: "Savings vs investing",
            description: "Choose between accessibility, stability and long-term growth potential.",
          },
        ],
      },
      lessonTwo: {
        metaTitle: "Pay yourself first",
        back: "World 1",
        label: "World 1 · Lesson 2",
        title: "Pay yourself first",
        intro:
          "You completed your first lesson. Now explore why putting money aside before spending can make saving easier and more consistent.",
        unlocked: "Lesson 2 unlocked",
        comingNext: "Coming next",
        placeholder:
          "The complete interactive lesson will be built next. Your progress is already saved to your account, so you can safely leave and come back.",
        viewProgress: "View your progress",
      },
      lessonThree: {
        metaTitle: "How much should you save?",
        back: "World 1",
        label: "World 1 · Lesson 3",
        title: "How much should you save?",
        intro:
          "You have seen when Alex can put money aside. Next, explore how to choose an amount that works with a real budget.",
        unlocked: "Lesson 3 unlocked",
        comingNext: "Coming next",
        placeholder:
          "The complete interactive lesson is being designed. Your progress is saved to your account, so you can safely leave and come back.",
        viewProgress: "View your progress",
      },
    },
    payYourselfFirst: {
      metaTitle: `Pay yourself first | ${BRAND}`,
      feedbackCorrect: "Exactly",
      feedbackThinking: "Good thinking",
      art: {
        nextStep: "Alex’s next step",
        saveFirst: "Save first?",
      },
      welcome: {
        action: "Start lesson",
        label: "World 1 · Lesson 2",
        title: "Alex knows what’s left. When should Alex save?",
        intro: "Help Alex give a saving goal a place in the month.",
      },
      recap: {
        action: "Make a plan",
        label: "Pick up where Alex left off",
        title: "The transport pass comes first.",
        description: (remainder: string, pass: string) =>
          `Alex had ${remainder} left, but the ${pass} pass is due soon.`,
        available: "Potentially available",
        note: "Other upcoming needs could still change this amount.",
      },
      decision: {
        action: "See what changes",
        hint: "Choose the setup that makes the goal visible sooner.",
        label: "One goal, two approaches",
        question: (amount: string) =>
          `Alex would like to set aside ${amount}. How could Alex make that goal visible?`,
        options: [
          () => "Wait and save whatever is left",
          (amount: string) => `Move ${amount} after checking upcoming needs`,
        ],
        correct: "The goal gets its own place before flexible spending begins.",
        retry: "Waiting can work, but the goal stays mixed with the money Alex might spend.",
      },
      consequence: {
        action: "Unlock the concept",
        label: "What changes?",
        title: "The money is the same. The order is different.",
        intro: (amount: string) => `Imagine Alex considers a ${amount} optional purchase.`,
        waitTitle: "Wait until later",
        waitDetail: (available: string, purchase: string) =>
          `${available} − ${purchase} optional purchase`,
        waitResult: (amount: string) => `${amount} to save`,
        firstTitle: (amount: string) => `Set ${amount} aside first`,
        firstDetail: (available: string, goal: string) => `${available} − ${goal} towards the goal`,
        firstResult: (amount: string) => `${amount} flexible`,
        takeaway: (amount: string) =>
          `Alex can now see that the ${amount} purchase would change the saving plan.`,
      },
      concept: {
        action: "Make it a habit",
        label: "Concept unlocked",
        title: "Pay yourself first",
        intro: "After checking known needs, give a manageable amount a place in your savings",
        emphasis: "before flexible spending.",
        flexibleTitle: "A flexible plan",
        flexibleBody: "Bills still need covering. The amount can change when life does.",
      },
      habit: {
        action: "Test the habit",
        hint: "Both approaches can help. Choose one to explore.",
        label: "Next payday",
        question: "How could Alex remember the plan?",
        options: ["Set a reminder after payday", "Schedule a transfer after payday"],
        reminder: "A reminder lets Alex check the budget and make the transfer manually.",
        transfer:
          "A scheduled transfer can make the habit easier to repeat, as long as Alex checks the budget and timing.",
      },
      change: {
        action: "Finish lesson",
        hint: "Apply the idea to a new expense.",
        expenseLabel: "New expense due",
        expense: (amount: string) => `Electricity adjustment · ${amount}`,
        label: "Life changes the plan",
        question: (amount: string) => `Should Alex keep the ${amount} transfer unchanged?`,
        remaining: (amount: string) => `Up to ${amount} remains after this new expense.`,
        options: [
          (amount: string) => `Keep the ${amount} transfer unchanged`,
          () => "Review it and reduce or pause it",
          () => "Use an overdraft to keep the plan",
        ],
        correct:
          "A saving habit can bend. Alex can reduce or pause the transfer and revisit it later.",
        retry:
          "Known needs come first. Alex can change the transfer instead of borrowing or stretching the budget.",
      },
      complete: {
        replay: "Replay lesson",
        saving: "Saving progress…",
        saveAgain: "Save progress again",
        continue: "Continue to lesson 3",
        back: "Back to World 1",
        label: "Lesson complete",
        title: "You gave saving a place before flexible spending.",
        steps: [
          "Check upcoming needs first.",
          "Set a manageable amount aside before flexible spending.",
          "Adjust the plan when life changes.",
        ],
        takeaway: "Pay yourself first is a flexible habit, not a fixed amount.",
      },
    },
    firstPaycheck: {
      metaTitle: `Your First Paycheck | ${BRAND}`,
      metaDescription:
        "Help Alex see where a first paycheck goes and what money is left to save. No account required.",
      ogDescription: "A short beginner lesson about what is left after a month of spending.",
      artLabel: "First paycheck",
      feedbackCorrect: "Exactly",
      feedbackRetry: "Good try",
      welcome: {
        skip: "I know this: take the quick check",
        start: "Start lesson",
        label: "World 1 · Lesson 1",
        title: "Your first paycheck. Where does it go?",
        intro: "Meet Alex. About 4 minutes.",
      },
      skip: {
        startRefresher: "Start the refresher",
        check: "Check my answers",
        hint: "Answer all 3 questions. Get 3 out of 3 to skip the lesson.",
        label: "Quick check · 3 questions",
        passedTitle: "A quick refresher, then you’re through.",
        title: "Already know this?",
        questions: [
          {
            prompt: (money: (amount: number) => string) =>
              `You earn ${money(1200)} this month and spend ${money(1000)}. How much is left?`,
            options: ["", "", ""],
            reason: (money: (amount: number) => string) =>
              `Money in − money out: ${money(1200)} − ${money(1000)} = ${money(200)}.`,
          },
          {
            prompt: () => "Which of these is a need?",
            options: ["Rent", "A streaming subscription", "Concert tickets"],
            reason: () => "Rent must be paid to keep a home. The other two are wants.",
          },
          {
            prompt: (money: (amount: number) => string) =>
              `You have ${money(200)} left. A ${money(50)} bill is due next week. How much could you set aside?`,
            options: ["", "", ""],
            reason: (money: (amount: number) => string) =>
              `The ${money(50)} is already promised, so ${money(200)} − ${money(50)} = ${money(150)}.`,
          },
        ],
      },
      story: {
        action: "See the spending",
        label: "Alex’s month",
        title: (money: (amount: number) => string) => `Alex got paid ${money(1850)}.`,
        introBefore: "Alex just started their first job. This is Alex’s",
        income: "income",
        introAfter: ": money coming in.",
      },
      budget: {
        lastAction: "See what is left",
        nextAction: "Next expense",
        hint: "Is it a need or a want?",
        heading: "Where Alex’s money went",
        count: (current: number, total: number) => `${current} of ${total}`,
        question: "Is this a need or a want for Alex?",
        need: "A need: Alex must pay it",
        want: "A want: nice, but could change",
        tryAgain: " Try again.",
        items: [
          { label: "Rent & bills", note: "Alex must pay this to keep a home." },
          { label: "Groceries", note: "Alex needs food every week." },
          { label: "Transport", note: "Alex needs it to get to work." },
          {
            label: "Subscriptions",
            note: "Nice to have, but Alex could cancel or change them.",
          },
          {
            label: "Going out",
            note: "Fun matters, but Alex could spend less here if needed.",
          },
        ],
      },
      result: {
        action: "What does it mean?",
        label: "What’s left",
        title: (money: (amount: number) => string) => `${money(100)} is left.`,
        formula: "Money in − money out = money left.",
        moneyIn: "Money in",
        moneyOut: "Money out",
        moneyLeft: "Money left",
      },
      conceptCheck: {
        action: "See the big idea",
        hint: "Choose the best answer.",
        label: "Quick check",
        question: (money: (amount: number) => string) => `What is Alex’s ${money(100)}?`,
        options: [
          {
            label: "Money to spend on anything",
            feedback: "Not quite. Some of it might already be promised to a bill. Try again.",
          },
          {
            label: "Money to invest right now",
            feedback:
              "Not yet. First, Alex should check if any of it is already promised. Try again.",
          },
          {
            label: "Money Alex might be able to save",
            feedback:
              "Yes. It’s money left over that Alex might save, once nothing is already promised.",
          },
        ],
      },
      concept: {
        action: "Try a new situation",
        label: "The big idea",
        title: "Money you might save",
        before: "Money left is money you",
        might: "might",
        middle: "save. First, check if any of it is",
        promised: "already promised",
        after: ", like a bill due next week.",
      },
      transfer: {
        action: "Finish lesson",
        hint: "Use the big idea: what is already promised?",
        due: "Due next week",
        bill: "Phone bill",
        label: "A new situation",
        intro: (money: (amount: number) => string) =>
          `Sam is a student. A summer job paid ${money(600)}. Sam spent ${money(475)}.`,
        question: "How much could Sam set aside?",
        feedback: [
          (money: (amount: number) => string) =>
            `${money(125)} is left, but ${money(25)} is already promised to the phone bill. Try again.`,
          (money: (amount: number) => string) =>
            `Yes. ${money(125)} is left, but ${money(25)} is already promised. So ${money(100)} is free.`,
          () => "Sam can’t set it all aside, but some of it is free. Try again.",
        ],
      },
      complete: {
        replay: "Replay lesson",
        saving: "Saving progress…",
        retry: "Save progress again",
        continue: "Continue to lesson 2",
        back: "Back to home",
        label: "Lesson complete",
        skippedTitle: "3 out of 3. You already know this one.",
        title: "You found what’s left, then checked what’s promised.",
        takeaways: [
          "Money in − money out = money left.",
          "Check what is already promised.",
          "What is truly free is what you might save.",
        ],
        moreTitle: "Want to go further? Why we say “might”",
        more: "Some money looks free but isn’t. A yearly bill, like phone insurance, can arrive in any month. So can a surprise, like a broken phone screen. That is why we say “might”. Lesson 4 covers your safety net.",
      },
    },
  },
  lesson0: {
    metaTitle: "Why learn about investing?",
    welcome: {
      eyebrow: "World 0 · A short introduction",
      title: "Why learn about investing?",
      body: "You do not need to know the stock market or have money to invest today. Even if you are a student or waiting for your first paycheck, you can already understand what investing could offer and what could go wrong.",
      reassurance: "You can learn today and decide later whether investing is right for you.",
      action: "Explore the idea",
    },
    meaning: {
      eyebrow: "The basic idea",
      title: "Give some money a chance to grow",
      definition:
        "Investing means putting money into an asset whose value can rise or fall, hoping it may grow for a goal further away.",
      example:
        "Imagine Leah, a student today. Once she has an income, she could consider putting aside a small amount each month for a goal ten years away. She can start learning how investing works today and prepare to make her own choices.",
      boundary:
        "Money you may need soon has a different job. World 1 will help you tell these amounts apart.",
      action: "See how growth can build",
    },
    compound: {
      eyebrow: "A made-up calculation",
      title: "Gains can earn gains too",
      intro: "Imagine $1,000 growing by 5% each year for 20 years, with every gain left invested.",
      start: "Start",
      first: "After 10 years",
      second: "After 20 years",
      explanation:
        "At first, 5% of $1,000 earns $50. Then the gains left invested can earn gains of their own. That is compound growth.",
      comparison:
        "Without reinvesting the gains, the total would be $2,000 after 20 years. Here, reinvesting adds another $653.",
      caveat: "Real returns vary from year to year. This calculation leaves out fees and taxes.",
      action: "What happens when value falls?",
    },
    risk: {
      eyebrow: "What about downturns?",
      title: "A drop can be followed by a recovery",
      intro:
        "Imagine an investment spread across several companies. Here is one possible path over several years:",
      start: "Value at the start",
      dip: "Value after a drop",
      dipChange: "−20% · $200 less",
      recovery: "Value later, in this example",
      recoveryChange: "$300 more than at the start",
      example:
        "The 20% drop was not necessarily the end of the story. If you need the money soon, though, you might have to sell before any recovery.",
      historical:
        "Investor.gov notes that diversified US stock investments have had positive long-term average returns historically. Spreading investments also means relying less on any single company.",
      source: "Read Investor.gov’s introduction",
      sourceHref: "https://www.investor.gov/introduction-investing",
      warning:
        "This path and past results are not promises: even with time and diversification, a loss remains possible.",
      action: "Check what you understood",
    },
    question: {
      eyebrow: "One question",
      title: "What does more time change?",
      prompt: "Choose the statement that holds up even when markets fall.",
      options: [
        "After ten years, a gain is guaranteed.",
        "Time can help you wait through a fall, but a loss is still possible.",
        "Any money left over should be invested, even if you need it next month.",
      ],
      feedback: [
        "Ten years do not guarantee a gain. An investment can still be worth less when you need it.",
        "Exactly. More time can help you wait, but it cannot remove the risk of loss.",
        "Money needed soon must stay available. Investing it could force you to sell after a drop.",
      ],
      correct: "Correct!",
      rethink: "A useful distinction",
      answer: "A sounder answer",
      check: "See the explanation",
      hint: "Choose an answer to continue.",
      action: "Finish World 0",
    },
    complete: {
      eyebrow: "World 0 complete",
      title: "You can learn before you invest",
      summary:
        "Investing offers a chance to grow money for a distant goal. Gains left invested can build on earlier gains, but the value can also fall.",
      next: "In World 1, you will decide which money should stay available before considering a long-term goal.",
      saving: "Saving your progress…",
      saved: "Your progress is saved.",
      error: "We could not save your progress. Try again.",
      retry: "Try saving again",
      action: "Explore World 1",
      replay: "Replay World 0",
      source: "Read the SEC’s introduction to investing",
      sourceHref: "https://www.investor.gov/introduction-investing",
      note: "Fictional examples for learning. No investment advice or promised returns.",
    },
  },
  lesson3: {
    enabled: true,
    metaTitle: "How much should you save?",
    chrome: {
      skip: "Skip to content",
      progress: "Lesson progress: step {current} of {total}",
      leave: "Leave lesson",
    },
    feedback: { correct: "Exactly", retry: "Take another look" },
    welcome: {
      eyebrow: "World 1 · Lesson 3",
      title: "A percentage is a guide, not a rule.",
      intro:
        "Help Alex choose an amount that fits this month, then review it when his situation changes.",
      action: "Start lesson",
      cardLabel: "Alex’s next question",
      cardTitle: "How much should he save?",
    },
    snapshot: {
      eyebrow: "A new month for Alex",
      title: "Start with the real budget.",
      income: "Take-home pay",
      spending: "Known and planned spending",
      capacity: "Potentially available",
      note: "This amount is not a promise: a forgotten expense or surprise could still change it.",
      action: "Compare the numbers",
    },
    reference: {
      eyebrow: "Budget before percentage",
      title: "What should set Alex’s limit this month?",
      prompt: "Choose the number that should come first.",
      options: [
        "What remains after known and planned spending",
        "A percentage from a general rule",
      ],
      correct:
        "The real budget sets the limit. A percentage can then help compare different amounts.",
      incorrect:
        "A general percentage does not know Alex’s rent, bills or plans. The budget comes first.",
      action: "See the percentages",
    },
    comparison: {
      eyebrow: "Same income, very different amounts",
      title: "Percentages become dollars.",
      intro: "Here is what three commonly cited guideposts look like on {income} of take-home pay.",
      within: "Within the {capacity} limit",
      above: "Above the {capacity} limit",
      takeaway:
        "None of these percentages knows Alex’s month. They are comparison tools, not instructions.",
      action: "Keep the key idea",
    },
    concept: {
      eyebrow: "Concept unlocked",
      title: "Budget first. Consistency second.",
      body: "Start below what the budget might support, keep some breathing room, then review the amount over time.",
      cardTitle: "There is no perfect savings percentage for everyone.",
      cardBody:
        "Income, spending and priorities differ. The useful habit is to review the amount without ignoring known needs.",
      action: "Choose an amount",
    },
    amount: {
      eyebrow: "Alex could set aside up to {capacity}",
      title: "Which choice leaves the most room to adapt?",
      prompt: "Choose the most flexible starting point for this fictional example.",
      options: [
        "{saving}, with {margin} of breathing room",
        "{capacity}, using the full available amount",
        "{twenty}, to reach the 20% guidepost",
      ],
      correct:
        "{saving} gives saving a place while leaving {margin} of breathing room in this example.",
      incorrect:
        "Using the whole available amount—or exceeding it to hit a percentage—leaves less room for changes during the month.",
      action: "Test a tighter month",
    },
    stress: {
      eyebrow: "The amount still fits, but only just",
      title: "What should Alex do before repeating the {saving} transfer?",
      cardLabel: "The following month",
      cardText: "Available: {capacity} · Remaining after saving: {margin}",
      prompt: "Test the same amount during a tighter month.",
      options: [
        "Automatically keep {saving} because it worked before",
        "Check whether {margin} is enough breathing room this month",
        "Increase to {ten} to reach the 10% guidepost",
      ],
      correct:
        "An amount can fit the math and still deserve a review. Breathing room and upcoming expenses matter too.",
      incorrect:
        "Repeating or increasing the amount without checking the smaller margin turns a guidepost into a rule.",
      action: "Finish the lesson",
    },
    complete: {
      eyebrow: "Lesson complete",
      title: "You chose an amount from the budget, not from a rule.",
      points: [
        "Find what is truly available.",
        "Use percentages only as guideposts.",
        "Keep breathing room and review the amount.",
      ],
      takeaway: "A useful amount fits the person, the month and the information available today.",
      note: "Educational simulation using virtual money. This is not financial advice.",
      replay: "Replay lesson",
      saving: "Saving progress…",
      retry: "Try saving again",
      next: "Continue to lesson 4",
      back: "Back to World 1",
    },
    worldCard: {
      title: "How much should you save?",
      description: "Use percentages as flexible guideposts, never fixed rules.",
      duration: "4 min",
    },
  },
  lesson4: {
    enabled: true,
    metaTitle: "Build your safety net",
    feedback: { correct: "Exactly", retry: "Take another look" },
    welcome: {
      eyebrow: "World 1 · Lesson 4",
      title: "A safety net should fit the life it protects.",
      intro:
        "Alex has started saving. Help him give some of that money a clear job and adjust it as his situation changes.",
      action: "Start the lesson",
      cardLabel: "Alex’s next question",
      cardTitle: "What should this money protect?",
    },
    purpose: {
      eyebrow: "A different job for some savings",
      title: "A buffer buys room to respond.",
      body: "A safety net is money kept within reach so essential costs can continue when income or expenses change.",
      cardTitle: "It is not a universal target.",
      cardBody:
        "Its useful size depends on essential costs, income stability, responsibilities and the other options available to the person.",
      action: "See Alex’s starting point",
    },
    snapshot: {
      eyebrow: "Alex’s starting point",
      title: "Start with what must keep running.",
      income: "Monthly take-home pay",
      essentials: "Essential monthly costs",
      buffer: "Accessible safety net",
      monthlySaving: "Current monthly saving",
      note: "The $360 is a starting point, not proof that Alex has reached the right amount for every situation.",
      action: "Look beyond the amount",
    },
    factors: {
      eyebrow: "The amount alone is not enough",
      title: "Which information is most useful when Alex reviews his safety net?",
      prompt: "Choose the information that reflects Alex’s real situation.",
      options: [
        "A universal number of months that everyone must save",
        "His essential costs, income stability, responsibilities and other fallbacks",
        "The largest target he can find, regardless of his current budget",
      ],
      correct:
        "Those factors show what Alex may need the money to protect and how much flexibility he already has.",
      incorrect:
        "A fixed or oversized target ignores the person behind the number. Alex needs to start with his own costs and constraints.",
      action: "Compare two situations",
    },
    comparison: {
      eyebrow: "Same bills, different need for flexibility",
      title: "The situation can change before the expenses do.",
      intro: "In both situations, Alex has {essentials} of essential monthly costs.",
      steadyLabel: "Alex today",
      steadyTitle: "A steadier month",
      steadyPoints: [
        "His work hours are regular",
        "Some spending can be adjusted",
        "No one else relies on his income",
      ],
      changedLabel: "Alex after a change",
      changedTitle: "Less room to absorb a gap",
      changedPoints: [
        "His work hours can vary",
        "He helps cover another person’s needs",
        "Fewer expenses can be delayed",
      ],
      takeaway:
        "The same essential costs can call for a different cushion. That is a reason to review the plan—not a formula that chooses the amount for Alex.",
      action: "Choose a next step",
    },
    decision: {
      eyebrow: "Build from today’s information",
      title: "What is the most useful next step for Alex?",
      cardLabel: "Current plan",
      cardText: "Accessible: {buffer} · Adding: {saving} per month",
      prompt: "Choose the step that stays useful if Alex’s situation changes.",
      options: [
        "Treat {buffer} as a finished target and never review it",
        "Keep {buffer} accessible and continue building at a pace his budget can support",
        "Move the full {buffer} to a long-term goal because he has not needed it yet",
      ],
      correct:
        "Alex keeps the money available for its purpose and can review both the {buffer} and the {saving} as his situation changes.",
      incorrect:
        "Declaring the target finished—or giving the money a long-term job—ignores why Alex set this buffer aside.",
      action: "Put the plan to work",
    },
    rebuild: {
      eyebrow: "Using it is part of the plan",
      title: "How can Alex rebuild without squeezing the next month?",
      cardLabel: "After a disruption",
      cardText: "Used: {disruption} · Safety net left: {remaining}",
      prompt: "Alex has {capacity} available next month. Choose an adaptable response.",
      options: [
        "Replace the full {disruption} immediately, even though only {capacity} is available",
        "Set aside {rebuild}, keep {margin} of breathing room and review again next month",
        "Stop rebuilding because the safety net already did its job once",
      ],
      correct:
        "Rebuilding can be gradual. In this example, {rebuild} restores part of the buffer while leaving {margin} for the month.",
      incorrect:
        "A safety net can be used and rebuilt. The new contribution still needs to fit the budget instead of creating another squeeze.",
      action: "Finish the lesson",
    },
    complete: {
      eyebrow: "Lesson complete",
      title: "You built a safety net around Alex’s situation—not a universal rule.",
      points: [
        "Start with essential costs and real responsibilities.",
        "Keep the buffer accessible and review it when life changes.",
        "After using it, rebuild at a pace the budget can support.",
      ],
      takeaway:
        "A useful safety net is personal, accessible and adjustable as needs and stability change.",
      note: "Educational simulation using virtual money. This is not financial advice.",
      replay: "Replay lesson",
      saving: "Saving progress…",
      retry: "Try saving again",
      next: "Continue to lesson 5",
      back: "Back to World 1",
    },
  },
  lesson5: {
    enabled: true,
    metaTitle: "Money you’ll need soon",
    feedback: { correct: "Exactly", retry: "Take another look" },
    welcome: {
      eyebrow: "World 1 · Lesson 5",
      title: "A date changes the job of your money.",
      intro:
        "Alex has separated his safety net. Now help him prepare for a known expense without treating it like an emergency or a distant goal.",
      action: "Start the lesson",
      cardLabel: "Alex’s next question",
      cardTitle: "When will he need it?",
    },
    roles: {
      eyebrow: "Three jobs, three questions",
      title: "Start with the money’s next job.",
      intro:
        "The label “savings” does not say when the money will be used or what happens if it is not available.",
      cards: [
        {
          title: "Safety net",
          body: "For an unexpected event whose timing and cost are not yet known.",
        },
        {
          title: "Planned expense",
          body: "For an expected need with an amount and date to prepare for.",
        },
        {
          title: "Long term",
          body: "For money that can stay untouched much longer despite fluctuations.",
        },
      ],
      takeaway:
        "The job comes before the account: possible emergency, planned date or a much longer horizon.",
      action: "See Alex’s plan",
    },
    snapshot: {
      eyebrow: "An expense known in advance",
      title: "Alex can turn a date into a plan.",
      intro:
        "He plans to move. The boxes, transportation and setup costs he expects stay separate from his safety net.",
      cost: "Moving costs",
      saved: "Already set aside",
      deadline: "Due",
      deadlineValue: "In {months} months",
      capacity: "Monthly saving capacity",
      note: "The amounts are here to explore a decision. They are not a personal recommendation.",
      action: "Give this money a job",
    },
    classify: {
      eyebrow: "The situation defines the job",
      title: "How should Alex classify the money for his move?",
      prompt: "Choose the job that matches a known cost with a known date.",
      options: [
        "His safety net, because every future expense is an emergency",
        "A planned expense kept separate from his safety net",
        "A very long-term goal with no expected use date",
      ],
      correct:
        "The move is planned and estimated. Preparing for it separately avoids treating a predictable expense as an emergency.",
      incorrect:
        "The date and cost are already known. A safety net covers surprises, while a distant goal does not have this near-term deadline.",
      action: "Build the timeline",
    },
    timeline: {
      eyebrow: "From a goal to a monthly amount",
      title: "The timeline reveals one possible pace.",
      intro: "Alex can compare the amount still needed with the number of months available.",
      gapLabel: "Still needed",
      gapText: "{cost} minus {saved}",
      monthlyLabel: "For the move",
      monthlyText: "{gap} spread across {months} months",
      otherLabel: "For other priorities",
      otherText: "Left from his current monthly capacity",
      takeaway:
        "This calculation describes one option using today’s information. It is not a rule that fits everyone.",
      action: "Choose what matters as the date approaches",
    },
    stability: {
      eyebrow: "A near and fairly fixed date",
      title: "Which feature matters most for this money?",
      cardLabel: "Planned need",
      cardText: "{cost} in {months} months",
      prompt: "Choose the answer that fits the money’s job and deadline.",
      options: [
        "Prioritize a large gain, even if the amount could fall at the wrong time",
        "Keep the money stable enough and accessible for the planned date",
        "Mix it into the safety net because both amounts need to stay available",
      ],
      correct:
        "A near and fairly fixed date makes stability and access important. Alex needs the money to be there when payment is due.",
      incorrect:
        "An uncertain gain cannot promise the right amount on the right date, and two accessible amounts can still have different jobs.",
      action: "See what happens when the date changes",
    },
    change: {
      eyebrow: "When the timeline no longer fits the budget",
      title: "Which response stays realistic for Alex?",
      cardLabel: "New deadline",
      cardText:
        "{gap} in {earlierMonths} months = {earlierContribution} per month · capacity: {capacity}",
      prompt:
        "He is short {shortfall} per month. Choose a response that does not turn the gap into a bet.",
      options: [
        "Look for a quick gain to cover the missing {shortfall} each month",
        "Review the cost, date or budget, then recalculate a workable plan",
        "Automatically take the difference from his safety net",
      ],
      correct:
        "The new pace exceeds his capacity by {shortfall}. Reviewing the inputs makes the plan explicit without relying on an uncertain outcome.",
      incorrect:
        "A timeline that is too tight calls for a revised plan. A quick gain is uncertain, and the safety net already has another job.",
      action: "Finish the lesson",
    },
    complete: {
      eyebrow: "Lesson complete",
      title: "You gave Alex’s money a clear date and job.",
      points: [
        "A predictable expense is not an emergency.",
        "The nearer and firmer the date, the more stability and access matter.",
        "If the timeline exceeds the available capacity, review the plan.",
      ],
      takeaway:
        "Before deciding what to do with your money, ask when you will need it and how much that date can move.",
      note: "Educational simulation using virtual money. This is not financial advice.",
      replay: "Replay lesson",
      saving: "Saving progress…",
      retry: "Try saving again",
      next: "Continue to lesson 6",
      back: "Back to World 1",
    },
  },
  lesson6: {
    enabled: true,
    metaTitle: "Debt vs investing",
    feedback: { correct: "Exactly", retry: "Take another look" },
    welcome: {
      eyebrow: "World 1 · Lesson 6",
      title: "One percentage is not enough to decide.",
      intro:
        "Alex has protected his safety net and moving plan. Now help him compare a known borrowing cost with an uncertain investment outcome.",
      action: "Start the lesson",
      cardLabel: "Alex’s next decision",
      cardTitle: "Debt or investing?",
    },
    snapshot: {
      eyebrow: "Two jobs for the same amount",
      title: "Alex has $100 truly available.",
      intro:
        "His spending, required payments, safety net and moving plan are already covered. He can decide what job to give the remaining $100.",
      extra: "Available each month",
      debt: "Debt balance",
      rate: "Displayed rate",
      rateValue: "APR: {rate}%",
      horizon: "Investing goal",
      horizonValue: "{years} years",
      note: "There is no early payment fee. The amounts are here only to explore a decision.",
      action: "Read the rate",
    },
    rate: {
      eyebrow: "Three letters to decode",
      title: "The important word is hidden in the A.",
      intro:
        "APR means annual percentage rate. A statement may simply show “12%”: the number is still expressed on an annual basis.",
      contractLabel: "Statement excerpt",
      contractValue: "APR: {rate}%",
      contractHint:
        "APR is an annualized measure used to describe the cost of borrowing and compare credit offers.",
      action: "Interpret the percentage",
    },
    interpret: {
      eyebrow: "An annual rate is not the total cost",
      title: "What does the displayed “{rate}%” mean?",
      prompt: "Choose the interpretation that accounts for time.",
      options: [
        "Alex will pay exactly 12% extra over the entire life of the debt",
        "The lender adds 12% to the remaining balance every month",
        "The rate is expressed on an annual basis; the total cost also depends on time, payments and fees",
      ],
      correct:
        "The percentage is annualized. The payoff information and statements show what Alex will pay as the balance changes.",
      incorrect:
        "The A in APR means annual. It is neither a one-time charge for the full term nor a rate added every month.",
      action: "See an example in dollars",
    },
    example: {
      eyebrow: "From a percentage to dollars",
      title: "A full year gives a useful reference point.",
      intro:
        "Only to understand the rate, imagine the {debt} stays unpaid for one full year and no other cost is added.",
      formulaLabel: "Deliberately simplified example",
      formulaText:
        "The {annualCost} represents 12% of {debt} over one full year. It is not automatically the debt’s total cost.",
      balanceLabel: "When Alex makes payments",
      balanceText:
        "The balance falls. Later interest is therefore no longer based on the original $600 for the entire term.",
      note: "A real balance can accrue interest using the contract’s calculation method and timing. Alex should use the statements and payoff information for the actual cost.",
      action: "Compare the two choices",
    },
    compare: {
      eyebrow: "Two percentages, two levels of certainty",
      title: "A debt rate and an expected return do not promise the same thing.",
      intro:
        "Alex can describe the effect of paying debt. He cannot know the investment result in advance.",
      debtLabel: "Pay debt",
      debtTitle: "Reduces a contractual cost",
      debtPoints: [
        "The outstanding balance falls immediately",
        "The base for future interest becomes smaller",
        "The effect depends on the rate and account terms",
      ],
      investLabel: "Invest",
      investTitle: "Accepts an uncertain result",
      investPoints: [
        "The value can rise or fall",
        "A past average return is not a promise",
        "A ten-year horizon provides time, not a guaranteed result",
      ],
      takeaway:
        "Comparing 12% debt with an assumed investment return does not make that return certain.",
      action: "Make a decision for Alex",
    },
    decision: {
      eyebrow: "The other priorities are already protected",
      title: "Which response best uses the available information?",
      cardLabel: "Current situation",
      cardText: "{extra} available · debt: {debt} at {rate}%",
      prompt: "Choose the response that separates a known cost from an uncertain outcome.",
      options: [
        "Invest the {extra}, because a diversified portfolio is guaranteed to return more than 12%",
        "Use the {extra} to reduce the debt and its known cost without touching the other priorities",
        "Empty the safety net to pay the entire debt immediately",
      ],
      correct:
        "In this fictional situation, Alex reduces a high known cost with money that is truly available. The conclusion depends on the scenario’s facts.",
      incorrect:
        "An investment return is not guaranteed, and the safety net already has another job. The comparison only involves the available {extra}.",
      action: "Change one fact",
    },
    change: {
      eyebrow: "The rate changes the comparison",
      title: "Is the same answer always obvious?",
      intro:
        "The required payment fits the budget, the other priorities remain protected and there is no additional fee.",
      cardLabel: "New terms",
      cardText: "Rate: {lowerRate}% for {lowerMonths} months",
      prompt: "Choose the reasoning that still works when the cost of debt changes.",
      options: [
        "Always repay every debt before considering another goal",
        "Always invest as soon as the debt rate is low",
        "Review the deadlines, budget and goals: paying debt, investing or splitting the amount may now be reasonable",
      ],
      correct:
        "At 0%, the known cost no longer dominates the comparison in the same way. Deadlines, budget room and goals matter more.",
      incorrect:
        "One rate does not create a universal rule. Required payments, deadlines and the ability to accept risk also matter.",
      action: "Build the checklist",
    },
    checklist: {
      eyebrow: "Before choosing",
      title: "Alex can ask the questions in the right order.",
      intro:
        "The checklist does not choose for him. It prevents two percentages from being treated as if they had the same certainty.",
      points: [
        "Are all required payments covered?",
        "Do near-term needs and the safety net remain protected?",
        "What do the rate, term, fees and payoff information mean?",
        "Which cost falls with certainty if the debt is paid?",
        "Can the invested money stay invested through a decline?",
        "What new fact would change the decision?",
      ],
      takeaway:
        "A useful comparison starts with the account terms and timeline, not a promised return.",
      action: "Finish the lesson",
    },
    complete: {
      eyebrow: "Lesson complete",
      title: "You compared a known cost with an uncertain outcome.",
      points: [
        "The A in APR means annual—not “over the entire term.”",
        "The total cost also depends on time, payments and fees.",
        "The rate, budget and deadlines can change the decision.",
      ],
      takeaway:
        "Which cost disappears with certainty if I pay the debt, and which risk do I accept if I invest instead?",
      note: "Educational simulation using virtual money. This is not financial advice. Simplified calculations do not replace the account terms and statements.",
      replay: "Replay lesson",
      saving: "Saving progress…",
      retry: "Try saving again",
      next: "Continue to lesson 7",
      back: "Back to World 1",
    },
  },
  lesson7: {
    enabled: true,
    metaTitle: "Cash is not risk-free",
    feedback: { correct: "Exactly", retry: "Take another look" },
    welcome: {
      eyebrow: "World 1 · Lesson 7",
      title: "Your balance can stay the same while buying less.",
      intro:
        "Alex sees a stable amount in his account and thinks it carries no risk. Help him separate a stable balance from stable purchasing power.",
      action: "Look at Alex’s money",
      cardLabel: "Alex’s next question",
      cardTitle: "Stable for how long?",
    },
    snapshot: {
      eyebrow: "A deliberately simplified example",
      title: "Alex keeps money available in his account.",
      intro: "His balance does not fluctuate. His goal costs exactly the same amount today.",
      cash: "Cash available",
      rate: "Account interest rate",
      goal: "Goal’s current price",
      inflation: "One-year inflation assumption",
      note: "Here, “cash” means money that is quickly available and whose displayed amount stays stable. The rates are fictional and used only for learning.",
      action: "Understand inflation",
    },
    inflation: {
      eyebrow: "An average percentage",
      title: "What does {inflationRate}% inflation mean?",
      prompt: "Choose the interpretation that describes an average change in prices.",
      options: [
        "Every product becomes exactly {inflationRate}% more expensive",
        "Prices rise by about {inflationRate}% on average over the period",
        "The bank removes {inflationRate}% of the money held in accounts",
      ],
      correct:
        "Inflation describes an average change. Each person’s basket and each individual price can move differently.",
      incorrect:
        "Inflation is neither the same rise in every price nor a withdrawal from an account. It measures an average change in prices.",
      action: "See the effect in dollars",
    },
    priceExample: {
      eyebrow: "The same goal, one year later",
      title: "The price moves even when the balance does not.",
      intro:
        "In our example, the goal that costs {startingCash} today follows the {inflationRate}% inflation assumption exactly.",
      today: "Today",
      later: "In one year",
      fullGoal: "The balance fully covers the goal",
      shortfall: "With {cashAfterYear} in the account, Alex is short {cashGap}",
      takeaway:
        "Alex did not lose dollars on his statement. He lost some of what those dollars can buy.",
      action: "Interpret the change",
    },
    balance: {
      eyebrow: "Risk does not always appear on the statement",
      title: "What actually happened?",
      cardLabel: "After one year",
      cardText: "Account: {cashAfterYear} · goal: {futurePrice}",
      prompt: "Choose the answer that separates balance from purchasing power.",
      options: [
        "Alex’s account was charged {cashGap}",
        "His balance stayed stable, but it can buy less",
        "Alex avoided every risk because his balance did not fall",
      ],
      correct:
        "The number of dollars did not change. The gap between that number and the goal’s new price reveals the loss of purchasing power.",
      incorrect:
        "Nothing was removed from the account. A stable balance protects the displayed amount, but not automatically what it can buy.",
      action: "Add interest",
    },
    interestExample: {
      eyebrow: "A balance can rise and still fall behind",
      title: "What if the money earns {savingsRate}%?",
      intro:
        "Put the {startingCash} in a fictional account with no fees or taxes that earns {savingsRate}% for one year.",
      accountLabel: "Balance after interest",
      accountText: "Alex earned {interestEarned} on his statement",
      goalLabel: "Price of the same goal",
      goalText: "He is still {savingsGap} short of paying for it",
      note: "A positive return in dollars does not guarantee more purchasing power. The change in the goal’s price matters too.",
      action: "Compare the two changes",
    },
    interest: {
      eyebrow: "Two different increases",
      title: "Which conclusion describes the year correctly?",
      prompt: "Compare the {savingsAfterYear} balance with the {futurePrice} goal.",
      options: [
        "Alex earned {interestEarned}, so his purchasing power must have increased",
        "His balance grew, but more slowly than the price of his goal",
        "Whenever an account earns less than inflation, every dollar should be invested",
      ],
      correct:
        "The statement shows a gain, but the goal rose by more. In this specific example, the amount’s purchasing power fell.",
      incorrect:
        "A displayed gain and a gain in purchasing power are not the same. This gap alone is also not enough to choose an account or investment.",
      action: "Give the money a job again",
    },
    nearTerm: {
      eyebrow: "Inflation is not the only risk",
      title: "What does Alex need to protect most?",
      cardLabel: "New information",
      cardText: "A deposit due in {nearMonths} months",
      prompt: "Choose the most important feature for this money.",
      options: [
        "Access to the money and a stable amount",
        "The highest possible potential return",
        "A promise to earn more than inflation",
      ],
      correct:
        "With a near and fixed date, a drop at the wrong time can matter more than gradual price erosion.",
      incorrect:
        "This money has a near deadline. Seeking more return can add a risk of loss or make the money unavailable at the wrong time.",
      action: "Change the horizon",
    },
    longTerm: {
      eyebrow: "Time changes the trade-off",
      title: "What changes now?",
      intro:
        "Loss of purchasing power matters more over a long period, but investing adds fluctuation and loss risk.",
      cardLabel: "New information",
      cardText: "Money unused for at least {longYears} years",
      prompt: "Choose the answer that recognizes several risks.",
      options: [
        "Alex must invest every dollar",
        "Alex must keep every dollar in cash",
        "He can compare access, stability, inflation and the risk of a loss",
      ],
      correct:
        "A long horizon gives inflation more weight without removing other risks. The next lesson will compare those trade-offs.",
      incorrect:
        "No time horizon creates an automatic rule. The money’s job and the ability to accept a loss still matter.",
      action: "Build the checklist",
    },
    checklist: {
      eyebrow: "Before deciding",
      title: "Alex can start with the job and the date.",
      intro:
        "This checklist avoids treating inflation as an order to invest or stability as a complete absence of risk.",
      points: [
        "When will this money be used?",
        "Is the date fixed or flexible?",
        "Does the amount need to stay stable?",
        "Does the money need to be immediately available?",
        "Does the account pay interest?",
        "Can Alex accept a temporary drop?",
      ],
      takeaway: "Inflation is a risk to understand, not an order to invest.",
      action: "Finish the lesson",
    },
    complete: {
      eyebrow: "Lesson complete",
      title: "You separated displayed dollars from purchasing power.",
      points: [
        "Inflation measures an average change in prices.",
        "A balance can rise while buying less than before.",
        "Cash protects access and stability, but not always purchasing power.",
        "The money’s job and use date guide the comparison.",
      ],
      takeaway: "What must this money protect: a near expense, a stable amount or a distant goal?",
      note: "Educational simulation using virtual money. This is not financial advice. The rates are fictional and the calculations are deliberately simplified.",
      replay: "Replay lesson",
      saving: "Saving progress…",
      retry: "Try saving again",
      next: "Continue to lesson 8",
      back: "Back to World 1",
    },
  },
  lesson8: {
    metaTitle: "Savings vs investing",
    feedback: {
      correct: "That reasoning fits",
      rethink: "Look at the tradeoff",
      reflect: "A useful next question",
      answer: "Reasoning to keep",
      check: "Check my answer",
    },
    welcome: {
      eyebrow: "World 1 · Lesson 8",
      title: "Savings vs investing: what job does this money have?",
      intro:
        "Alex has money for different goals. Help him decide what each amount needs to protect before thinking about what it might earn.",
      action: "Start the lesson",
      note: "Fictional examples with virtual money. This is education, not financial advice.",
    },
    difference: {
      eyebrow: "Two ways to set money aside",
      title: "The difference starts with what you need from the money.",
      intro:
        "In this lesson, saving means keeping money accessible with a stable account balance. Investing means accepting that its value can change, including a possible loss, for long-term growth potential.",
      savingTitle: "Save it",
      savingText:
        "Prioritize access and a stable amount in dollars. Rising prices may still reduce what it can buy.",
      investingTitle: "Invest it",
      investingText:
        "Accept ups and downs and a possible loss for growth potential over time. Growth is never guaranteed.",
      nuance:
        "Investing is also a way of setting money aside. Here we compare two different uses for it.",
      action: "Try one example",
    },
    sameAmount: {
      eyebrow: "Same dollars, different goals",
      title: "What changes when the date changes?",
      intro:
        "These {amount} are fictional. Imagine needing them in two months, then imagine not needing them for ten years.",
      soon: "Needed in two months",
      later: "For a goal in ten years",
      prompt: "Which fact matters most when comparing saving and investing?",
      options: [
        "The amount is the same, so the choice must be the same.",
        "The timeline, need for access, and ability to wait through a drop.",
        "Investing always wins when the goal is far away.",
      ],
      feedback: [
        "The same amount can have different jobs. A drop just before a needed expense matters more than a change in a flexible long-term goal.",
        "Exactly. The amount alone does not decide; the date and consequences of a drop change the tradeoff.",
        "A long horizon can make investing worth considering, but it never guarantees a gain or removes the risk of loss.",
      ],
      action: "Meet Alex's goals",
    },
    alex: {
      eyebrow: "Alex has more than one goal",
      title: "His money does not all have the same job.",
      intro:
        "Alex is a young working adult. His everyday bills are covered, but he has different reasons to set money aside.",
      cards: [
        { title: "Emergency buffer", body: "Money he may need without warning." },
        { title: "Move in six months", body: "A planned expense with a close date." },
        {
          title: "Distant goal",
          body: "A separate amount he does not expect to need for ten years.",
        },
      ],
      note: "His case is an example, not a rule for everyone at the same stage of life.",
      action: "Decide for the move",
    },
    nearTerm: {
      eyebrow: "A close date",
      title: "What should Alex prioritize for his move in six months?",
      prompt: "Choose what protects the purpose of this amount.",
      options: [
        "Keep this amount stable and accessible for the move.",
        "Invest it to aim for a higher return before the move.",
        "Use the emergency buffer instead, since both amounts are available.",
      ],
      feedback: [
        "Yes. A drop at the wrong time could leave him short for a planned bill. Keeping the balance stable does not guarantee its purchasing power.",
        "A possible gain is not assured in six months. If the value falls near moving day, Alex may lack the money he planned to use.",
        "The buffer covers surprises; the move is already planned. Accessible amounts can still have different jobs.",
      ],
      action: "Consider the distant goal",
    },
    longTerm: {
      eyebrow: "A distant goal",
      title: "What can Alex consider for the separate amount he will not need for ten years?",
      prompt: "Choose reasoning that accounts for both growth potential and loss.",
      options: [
        "Compare saving and investing, including whether he could accept a loss.",
        "Invest automatically: ten years guarantee growth.",
        "Keep it all in savings: a stable balance means no risk.",
      ],
      feedback: [
        "Yes. Time can make investing an option, not an obligation. Alex still needs to consider possible losses, his needs, and any known debt costs.",
        "Ten years do not promise a gain. An investment can still be worth less when Alex needs it.",
        "A stable dollar balance can be useful, but inflation may reduce what it buys over time.",
      ],
      action: "Connect it to your own questions",
    },
    reflection: {
      eyebrow: "What about you?",
      title: "Could you set aside even a small amount each month, now or in the near future?",
      context:
        "If you are a student, think about what might be possible after graduation, when you have your first income.",
      prompt: "Choose the answer that fits you. There is no wrong answer.",
      check: "Explore what this means",
      hint: "Choose an answer to continue.",
      options: ["Yes", "No"],
      feedback: [
        "That is a starting point. Before considering investing, ask when you might need that amount, what must stay available, and whether you could accept a loss.",
        "You can still learn now. If your situation changes, for example after graduation, you can return to this question and think about how each amount fits your needs.",
      ],
      action: "Finish World 1",
    },
    complete: {
      eyebrow: "World 1 · Beta complete",
      pendingTitle: "Your final lesson is ready to save.",
      title: "You finished World 1!",
      count: "8 of 8 lessons complete",
      thanks:
        "Thank you for exploring this first version. You can now connect each amount to its goal, timeline, and risks.",
      saved: "Your progress is saved.",
      saving: "Saving your progress…",
      error: "We could not confirm your progress. Try saving it again.",
      retry: "Try saving again",
      teaserTitle: "What might come next?",
      teaser:
        "We are preparing new worlds and exploring virtual portfolios that use real market data. Practice would still use virtual money; these features are not available yet.",
      feedbackIntro:
        "Your feedback will help us choose what to build next. What helped, what was unclear, and what would you like to try?",
      feedbackPrompt:
        "What helped you learn, what was unclear, and what would you like to try next?",
      feedbackButton: "Give feedback",
      dashboard: "Back to dashboard",
      replay: "Replay the lesson",
      note: "Educational practice with fictional amounts. This is not financial advice.",
    },
  },
  dashboard: {
    home: "home",
    tabsLabel: "Dashboard",
    tabs: { home: "Home", courses: "Courses", portfolio: "Portfolio", account: "Account" },
    preview: {
      title: "Local Home preview",
      label: "Local preview · sample data",
      description:
        "The progress shown is an example (2 of 8 lessons). Other dashboard pages require sign-in.",
    },
    homeScreen: {
      eyebrow: "Your next step",
      startHeading: "Your learning path starts here.",
      continueHeading: "Pick up where you left off.",
      completeHeading: "See how far you’ve come.",
      review: "Review your journey",
      worldComplete: "World 1 complete",
      explore: "Explore all courses",
    },
    logOut: "Log out",
    logOutPending: "Logging out…",
    usComingSoon: "More lessons for the US are coming soon.",
    portfolio: {
      title: "Portfolio",
      intro: "Virtual money only. Nothing here is real.",
      emptyTitle: "Your virtual portfolio starts soon",
      emptyText:
        "The decisions you practice will build a portfolio in virtual dollars, so you can see how your choices play out over time. It is a simulation for learning, not financial advice.",
      cta: "Practice a decision",
    },
    account: {
      title: "Account",
      passwordUpdated: "Password updated. Use it next time you log in.",
      details: "Your details",
      email: "Email",
      signedInWith: "Logged in with",
      google: "Google",
      password: "Email and password",
      code: "Invitation code",
      memberSince: "Member since",
      version: "Version",
      versionText: `Choose the version of ${BRAND} you learn with: its language, market and currency.`,
      versionSaved: "Version updated.",
      versionError: "We couldn’t change your version just now. Please try again.",
      versionSave: "Save",
      versionSaving: "Saving…",
      deleteTitle: "Delete your account",
      deleteEmail: "Email",
      deleteFrom:
        "from the address above. We delete your account and its data within one month. See the",
      deletePrivacy: "Privacy policy",
      deleteRights: "for your other rights.",
      deleteSubject: `Delete my ${BRAND} account`,
    },
    feedback: {
      trigger: "Give feedback",
      title: "Tell us what you think",
      intro: "A bug, an idea, anything else? We read it all.",
      categoryLegend: "What is this about?",
      categories: { bug: "A bug", idea: "An idea", other: "Something else" },
      messageLabel: "Your message",
      messagePlaceholder: "Describe what you saw or what you’d like…",
      submit: "Send",
      submitPending: "Sending…",
      success: "Thanks, it’s sent!",
      error: "We couldn’t send your message right now. Try again.",
      messageMissing: "Write a message before sending.",
      messageTooLong: "Message too long (2000 characters max).",
    },
  },
};

export type Dictionary = typeof us;
