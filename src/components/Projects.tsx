"use client";

import { motion } from "framer-motion";
import ProjectCard, { Project } from "./ProjectCard";

const projects: Project[] = [
  {
    id: "learn-ai",
    name: "learn-ai",
    preview: "Quick-fire learning modules on any topic, powered by GPT.",
    description:
      "The idea was to make learning feel like scrolling — pick a topic, get a tight 2-min module, move on. Uses structured prompting to generate consistent lesson formats.\n\n(Your full description here.)",
    tags: ["TypeScript", "Next.js", "GPT", "Vercel"],
    links: [
      { label: "GitHub", url: "https://github.com/CaelanL/learn-ai" },
      { label: "Live Site", url: "https://learn-ai-beta-khaki.vercel.app" },
    ],
  },
  {
    id: "bread",
    name: "Bread",
    preview: "Voice-initiated Bible memorization study app.",
    description:
      "A voice-first approach to Bible study and memorization. Speak to interact, listen to learn.\n\n(Your full description here.)",
    tags: ["TypeScript", "Voice", "Mobile"],
    links: [
      { label: "GitHub", url: "https://github.com/CaelanL/Bread" },
      { label: "App Store", url: "#" },
    ],
  },
  {
    id: "voice-memo-llm",
    name: "voice-memo-llm",
    preview:
      "Personal AI agent for 572 voice memos — RAG, tool orchestration, and fine-tuned LLM for voice mimicry.",
    description:
      "Built a personal AI agent that can search through, summarize, and answer questions about years of voice memos. Uses RAG for retrieval and a fine-tuned model for voice style matching.\n\n(Your full description here.)",
    tags: ["Python", "RAG", "LLM", "Fine-tuning"],
    links: [
      { label: "GitHub", url: "https://github.com/CaelanL/voice-memo-llm" },
    ],
  },
  {
    id: "flow",
    name: "flow",
    preview: "Voice-to-text that pastes anywhere. Hold a hotkey, speak, release.",
    description:
      "A system-level tool — hold a hotkey, speak, release, and the transcription pastes wherever your cursor is. No app switching, no copy-paste.\n\n(Your full description here.)",
    tags: ["Python", "Whisper", "Desktop"],
    links: [
      { label: "GitHub", url: "https://github.com/CaelanL/flow" },
    ],
  },
  {
    id: "rocky-mountain",
    name: "Rocky Mountain Snowboarding",
    preview:
      "A hat. A dog named Rocky. The Rockies. Snowboarding. It all comes together.",
    description:
      "Rocky is my dog. I like snowboarding. Rocky Mountain Snowboarding — it's the Rockies, but the imagery is a dog snowboarding. A mashup, a vibe, a hat.\n\n(Your full description here.)",
    tags: ["Headwear", "Design", "Rocky"],
    isHat: true,
    links: [],
  },
];

export default function Projects() {
  return (
    <section className="px-8 pb-20">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm font-mono text-muted mb-8 uppercase tracking-widest"
        >
          Things I Made
        </motion.h2>

        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
