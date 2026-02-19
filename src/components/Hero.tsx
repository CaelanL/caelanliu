"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-8">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-mono font-bold text-green text-glow">
            Caelan Liu
          </h1>
          <p className="text-foreground/60 text-lg mt-4 font-mono">
            I build things that think.
            <span className="cursor-blink text-green ml-1">_</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
