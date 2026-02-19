"use client";

import { motion } from "framer-motion";

export default function Bio() {
  const tags = ["TypeScript", "Python", "AI / LLM", "Voice Interfaces", "Next.js"];

  return (
    <section className="px-8 pb-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-8 items-start"
        >
          {/* Photo placeholder */}
          <div className="w-28 h-28 shrink-0 rounded-lg bg-card-bg border border-card-border flex items-center justify-center">
            <span className="text-muted font-mono text-xs">[ photo ]</span>
          </div>

          {/* Bio text */}
          <div>
            <p className="text-foreground/80 leading-relaxed">
              Software developer. Studied [major] at [university].
              Building AI-powered tools and voice interfaces.
              Occasionally making hats.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-full border border-green/20 text-green/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
