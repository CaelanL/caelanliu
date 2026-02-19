"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import HatSpinner from "@/components/HatSpinner";

function IconGitHub() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconWeb() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function IconAppStore() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function LinkIcon({ icon }: { icon: string }) {
  if (icon === "github") return <IconGitHub />;
  if (icon === "appstore") return <IconAppStore />;
  return <IconWeb />;
}

function ProjectLinks({ links }: { links: Project["links"] }) {
  return (
    <div className="flex gap-2.5">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-muted hover:text-amber transition-colors"
          title={link.label}
        >
          <LinkIcon icon={link.icon} />
        </a>
      ))}
    </div>
  );
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
                  hover:bg-amber-hover transition-colors
                  ${!isLast ? "border-b border-grid" : ""}`}
    >
      <div className="border-r border-grid relative">
        {project.isHat ? (
          <div className="absolute inset-0 flex items-center justify-center p-5">
            <HatSpinner className="h-full object-contain" />
          </div>
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 m-auto w-[140px] h-[140px] object-contain"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[8px] text-muted opacity-30">[ img ]</span>
        )}
      </div>

      <div className="p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-[13px] text-amber">{project.name}</h3>
          <p className="text-[11px] mt-1.5 leading-relaxed line-clamp-2 text-muted">
            {project.preview}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-[11px] text-muted">
            {project.tags.join(" · ")}
          </span>
          <ProjectLinks links={project.links} />
        </div>
      </div>
    </motion.div>
  );
}

function ExpandedProject({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-16"
        onClick={onClose}
      >
        <motion.div
          layoutId={`project-${project.id}`}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col max-w-2xl w-full border border-grid bg-bg"
        >
          <div className="grid grid-cols-[240px_1fr]">
            <div className="border-r border-grid relative min-h-[200px]">
              {project.isHat ? (
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <HatSpinner className="h-full object-contain" expandable />
                </div>
              ) : project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 m-auto w-[180px] h-[180px] object-contain"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-[11px] text-muted opacity-30">[ img ]</span>
              )}
            </div>

            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg text-amber text-glow">
                  {project.name}
                </h3>
                <p className="text-xs mt-2 leading-relaxed text-muted">
                  {project.preview}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-[11px] text-muted">
                  {project.tags.join(" · ")}
                </span>
                <ProjectLinks links={project.links} />
              </div>
            </div>
          </div>

          <div className="border-t border-grid p-6">
            <p className="text-xs leading-relaxed whitespace-pre-line text-fg">
              {project.description.split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
                const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
                if (match) {
                  return (
                    <a
                      key={i}
                      href={match[2]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber hover:opacity-70 transition-opacity"
                    >
                      {match[1]}
                    </a>
                  );
                }
                return part;
              })}
            </p>

            {project.isHat && (
              <div className="mt-5 flex items-center gap-4">
                <button className="text-[10px] px-4 py-1.5 border border-alert text-alert cursor-not-allowed hover:bg-alert-hover transition-colors">
                  ADD TO CART
                </button>
                <span className="text-[11px] text-alert opacity-70">
                  OUT OF STOCK
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function ProjectStack() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expanded = projects.find((p) => p.id === expandedId);

  return (
    <div className="relative">
      <div className="relative">
        <div
          className="absolute pointer-events-none ambient-grid"
          style={{
            top: "-240px",
            bottom: "-240px",
            left: "-300px",
            right: "-300px",
          }}
        />

        <div className="relative z-10 w-[540px]">
          <p className="absolute -top-7 left-0 text-[10px] text-muted uppercase tracking-[0.3em] ml-0.5 flex items-center gap-3">
            <span className="w-6 h-px bg-muted-line" />
            Things I Made
          </p>

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

      <AnimatePresence>
        {expanded && (
          <ExpandedProject
            project={expanded}
            onClose={() => setExpandedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
