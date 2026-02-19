export type Project = {
  id: string;
  name: string;
  preview: string;
  description: string;
  tags: string[];
  image?: string;
  links: { label: string; url: string; icon: "github" | "web" | "appstore" }[];
  isHat?: boolean;
};

export const projects: Project[] = [
  {
    id: "rocky-mountain",
    name: "Rocky Mountain Snowboarding",
    preview:
      "A hat. Rocky my dog. Rocky mountains. I like to snowboard. It all comes together.",
    description:
      "Me and my friend Luke were thinking of fun hat ideas while at a coffee shop, and this magically came about as I was thinking of ways to combine two things I love — snowboarding and my dog. Designed by [Luke Kostohryz](https://lukekostohryz.com/).",
    tags: ["Headwear", "Design"],
    isHat: true,
    links: [],
  },
  {
    id: "bread",
    name: "Bread",
    image: "/bread-icon.png",
    preview: "Voice-initiated Bible memorization study app.",
    description:
      "A voice-first approach to Bible study and memorization.\n\n(Your full description here.)",
    tags: ["TypeScript", "Voice", "Mobile"],
    links: [
      { label: "GitHub", url: "https://github.com/CaelanL/Bread", icon: "github" },
      { label: "App Store", url: "https://apps.apple.com/us/app/bread-bible-memorization/id6757946016", icon: "appstore" },
    ],
  },
  {
    id: "voice-memo-llm",
    name: "voice-memo-llm",
    preview:
      "Personal AI agent for 572 voice memos — RAG, tool orchestration, and fine-tuned LLM.",
    description:
      "Built a personal AI agent that can search, summarize, and answer questions about years of voice memos.\n\n(Your full description here.)",
    tags: ["Python", "RAG", "LLM"],
    links: [
      { label: "GitHub", url: "https://github.com/CaelanL/voice-memo-llm", icon: "github" },
    ],
  },
  {
    id: "learn-ai",
    name: "learn-ai",
    preview: "Quick-fire learning modules on any topic, powered by GPT.",
    description:
      "The idea was to make learning feel like scrolling — pick a topic, get a tight 2-min module, move on.\n\n(Your full description here.)",
    tags: ["TypeScript", "Next.js", "GPT"],
    links: [
      { label: "GitHub", url: "https://github.com/CaelanL/learn-ai", icon: "github" },
      { label: "Live Site", url: "https://learn-ai-beta-khaki.vercel.app", icon: "web" },
    ],
  },
  {
    id: "flow",
    name: "flow",
    preview: "Voice-to-text that pastes anywhere. Hold a hotkey, speak, release.",
    description:
      "A system-level tool — hold a hotkey, speak, release, and the transcription pastes wherever your cursor is.\n\n(Your full description here.)",
    tags: ["Python", "Whisper", "Desktop"],
    links: [
      { label: "GitHub", url: "https://github.com/CaelanL/flow", icon: "github" },
    ],
  },
];
