"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Project = {
  id: string;
  name: string;
  preview: string;
  description: string;
  tags: string[];
  image?: string;
  links: { label: string; url: string; icon: "github" | "web" | "appstore" }[];
  isHat?: boolean;
};

const projects: Project[] = [
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
    id: "bread",
    name: "Bread",
    preview: "Voice-initiated Bible memorization study app.",
    description:
      "A voice-first approach to Bible study and memorization.\n\n(Your full description here.)",
    tags: ["TypeScript", "Voice", "Mobile"],
    links: [
      { label: "GitHub", url: "https://github.com/CaelanL/Bread", icon: "github" },
      { label: "App Store", url: "#", icon: "appstore" },
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
  {
    id: "rocky-mountain",
    name: "Rocky Mountain Snowboarding",
    preview:
      "A hat. Rocky the dog. The Rockies. Snowboarding. It all comes together.",
    description:
      "Rocky is my dog. I like snowboarding. Rocky Mountain Snowboarding — it's the Rockies, but the imagery is a dog snowboarding.\n\n(Your full description here.)",
    tags: ["Headwear", "Design"],
    isHat: true,
    links: [],
  },
];

function IconGitHub() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconWeb() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function IconAppStore() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function LinkIcon({ icon }: { icon: string }) {
  if (icon === "github") return <IconGitHub />;
  if (icon === "appstore") return <IconAppStore />;
  return <IconWeb />;
}

function ProjectRow({
  project,
  isLast,
  onExpand,
}: {
  project: Project;
  isLast: boolean;
  onExpand: () => void;
}) {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      onClick={onExpand}
      className={`grid grid-cols-[180px_1fr] h-[120px] cursor-pointer
                  hover:bg-[rgba(255,176,0,0.015)] transition-colors
                  ${!isLast ? "border-b border-grid" : ""}`}
    >
      {/* Image cell */}
      <div className="border-r border-grid p-5 flex items-center justify-center">
        {project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-mono text-[8px] text-muted opacity-30">
            {project.isHat ? "[ hat ]" : "[ img ]"}
          </span>
        )}
      </div>

      {/* Info cell */}
      <div className="p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-mono text-[13px] text-amber">
            {project.name}
          </h3>
          <p className="font-mono text-[11px] mt-1.5 leading-relaxed line-clamp-2 opacity-40">
            {project.preview}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-mono text-[9px] text-muted opacity-60">
            {project.tags.join(" · ")}
          </span>
          <div className="flex gap-2.5">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted opacity-50 hover:text-amber hover:opacity-100 transition-colors"
                title={link.label}
              >
                <LinkIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectStack() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expanded = projects.find((p) => p.id === expandedId);

  return (
    <div className="w-[62%] min-h-screen flex items-center justify-center relative">
      {/* Wrapper — positions grid background relative to content */}
      <div className="relative">
        {/*
          Ambient grid — extends 300px (5 units) left/right, 240px (4 units) top/bottom.
          background-position offsets by extension amount so grid lines align
          with content container edges (0, 180px, 540px horizontally).
          Extension amounts are multiples of 60px so all lines stay on-grid.
        */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-240px",
            bottom: "-240px",
            left: "-300px",
            right: "-300px",
            backgroundImage: `
              linear-gradient(to right, rgba(255,176,0,0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,176,0,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "0px 0px",
            maskImage:
              "radial-gradient(ellipse 50% 50% at 50% 50%, black 30%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 50% 50% at 50% 50%, black 30%, transparent 70%)",
          }}
        />

        {/* Content grid — all dimensions are multiples of 60px */}
        <div className="relative z-10" style={{ width: "540px" }}>
          <p className="absolute -top-7 left-0 font-mono text-[9px] text-muted opacity-40 uppercase tracking-[0.3em] ml-0.5 flex items-center gap-3">
            <span
              className="w-6 h-px"
              style={{ background: "rgba(74,74,74,0.3)" }}
            />
            Things I Made
          </p>

          {/* The grid structure — border IS the grid */}
          <div className="border border-grid">
            {projects.map((project, i) => (
              <ProjectRow
                key={project.id}
                project={project}
                isLast={i === projects.length - 1}
                onExpand={() => setExpandedId(project.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-16"
              onClick={() => setExpandedId(null)}
            >
              <motion.div
                layoutId={`project-${expanded.id}`}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col max-w-2xl w-full border border-grid"
                style={{ background: "#0a0a0a" }}
              >
                <div className="grid grid-cols-[240px_1fr]">
                  {/* Image cell — bigger */}
                  <div className="border-r border-grid p-6 flex items-center justify-center min-h-[200px]">
                    {expanded.image ? (
                      <img
                        src={expanded.image}
                        alt={expanded.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-mono text-[9px] text-muted opacity-30">
                        {expanded.isHat ? "[ hat ]" : "[ img ]"}
                      </span>
                    )}
                  </div>

                  {/* Info cell */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-mono text-lg text-amber text-glow">
                        {expanded.name}
                      </h3>
                      <p className="font-mono text-xs mt-2 leading-relaxed opacity-40">
                        {expanded.preview}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-mono text-[9px] text-muted opacity-60">
                        {expanded.tags.join(" · ")}
                      </span>
                      <div className="flex gap-2.5">
                        {expanded.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted opacity-50 hover:text-amber hover:opacity-100 transition-colors"
                            title={link.label}
                          >
                            <LinkIcon icon={link.icon} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description — separated by horizontal grid line */}
                <div className="border-t border-grid p-6">
                  <p className="font-mono text-xs leading-relaxed whitespace-pre-line opacity-50">
                    {expanded.description}
                  </p>

                  {expanded.isHat && (
                    <div className="mt-5 flex items-center gap-4">
                      <button className="font-mono text-[10px] px-4 py-1.5 border border-alert text-alert cursor-not-allowed hover:bg-[rgba(255,107,53,0.05)] transition-colors">
                        ADD TO CART
                      </button>
                      <span className="font-mono text-[9px] text-alert opacity-70">
                        OUT OF STOCK
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
