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
      "I practice scripture memorization, and the app I used to use was great — you'd type the first letter of each word, it would progressively remove words to increase difficulty. But I always wished I could just use my voice instead, with a good transcription service and a cleaner UI. So I made this for myself.",
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
      "Me and my best friend exchange voice memos to catch up. As LLMs became a thing, I got curious about what AI could pull out of a bunch of personal data — and more broadly, how LLMs actually work under the hood.\n\nWent in wanting to train a model on voice memos and ask it questions. Quickly realized RAG is what you actually want for accurate retrieval — search by date, topic, embedding similarity, monthly summaries, all of that. But I still wanted to go through the process of training something, so I fine-tuned a small Mistral model on synthetic Q&A pairs generated from the memos and made it a tool in the orchestrator's toolkit. When a user asks something like \"how would he say this?\" the agent routes to the fine-tuned model for mimicry. Mostly an excuse to learn how training actually works end to end.",
    tags: ["Python", "RAG", "LLM", "SFT"],
    links: [
      { label: "GitHub", url: "https://github.com/CaelanL/voice-memo-llm", icon: "github" },
    ],
  },
  {
    id: "learn-ai",
    name: "learn-ai",
    preview: "ChatGPT wrapper for creating Socratic learning content.",
    description:
      "I use AI a lot to learn — I'd create little markdown curricula on topics and have it teach me Socratically, asking questions that force me to think rather than just reading. I'd make these for friends too, but the curriculum creation always took a while. So I built a simple system where you pick a topic and it generates a quick interactive module. Just made the process faster for myself and anyone I wanted to share it with.",
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
      "I used to use Wispr Flow, and when my trial ran out I realized $12/month is a lot more expensive than just doing it myself with the Whisper API. So I made this real quick.\n\nA system-level tool — hold a hotkey, speak, release, and the transcription pastes wherever your cursor is.",
    tags: ["Python", "Whisper", "Desktop"],
    links: [
      { label: "GitHub", url: "https://github.com/CaelanL/flow", icon: "github" },
    ],
  },
];
