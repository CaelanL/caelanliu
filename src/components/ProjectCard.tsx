"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export type Project = {
  id: string;
  name: string;
  preview: string;
  description: string;
  tags: string[];
  image?: string;
  links: { label: string; url: string }[];
  isHat?: boolean;
};

function LinkIcon({ label }: { label: string }) {
  if (label === "GitHub")
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  if (label === "App Store")
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  if (label === "Live Site")
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
      </svg>
    );
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.div
        layoutId={`card-${project.id}`}
        onClick={() => setExpanded(true)}
        className="flex gap-6 p-5 rounded-lg border border-card-border bg-card-bg cursor-pointer
                   hover:border-green/30 transition-colors group"
      >
        {/* Image area */}
        <div className="w-64 h-40 shrink-0 rounded bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-muted font-mono text-sm">
              {project.isHat ? "[ hat.png ]" : "[ screenshot ]"}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between py-1 min-w-0">
          <div>
            <h3 className="text-lg font-mono font-semibold text-green group-hover:text-glow transition-all">
              {project.name}
            </h3>
            <p className="text-foreground/70 text-sm mt-2 leading-relaxed">
              {project.preview}
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-3">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded border border-green/20 text-green/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-green transition-colors"
                >
                  <LinkIcon label={link.label} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-8" onClick={() => setExpanded(false)}>
              <motion.div
                layoutId={`card-${project.id}`}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col max-w-3xl w-full rounded-lg border border-green/30 bg-card-bg border-glow overflow-hidden"
              >
                <div className="flex gap-8 p-8">
                  {/* Image area — bigger */}
                  <div className="w-80 h-52 shrink-0 rounded bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-muted font-mono text-sm">
                        {project.isHat ? "[ hat.png ]" : "[ screenshot ]"}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-2xl font-mono font-semibold text-green text-glow">
                        {project.name}
                      </h3>
                      <p className="text-foreground/70 text-sm mt-3 leading-relaxed">
                        {project.preview}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono px-2 py-0.5 rounded border border-green/20 text-green/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-green transition-colors"
                          >
                            <LinkIcon label={link.label} />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded description */}
                <div className="border-t border-card-border px-8 py-6">
                  <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>

                  {project.isHat && (
                    <div className="mt-6 flex items-center gap-4">
                      <button className="px-6 py-2 font-mono text-sm border border-accent text-accent rounded hover:bg-accent/10 transition-colors cursor-not-allowed">
                        ADD TO CART
                      </button>
                      <span className="text-accent text-xs font-mono">OUT OF STOCK</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
