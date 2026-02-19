"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FRAME_COUNT = 16;
const FRAME_MS = 100;
const frames = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/rockyhat/alignedwebp/rockyhat${i + 1}.webp`
);

export default function HatSpinner({
  className,
  expandable = false,
}: {
  className?: string;
  expandable?: boolean;
}) {
  const [frame, setFrame] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      frames.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
      loaded.current = true;
    }

    if (hovered || lightbox) return;

    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % FRAME_COUNT);
    }, FRAME_MS);

    return () => clearInterval(interval);
  }, [hovered, lightbox]);

  return (
    <>
      <img
        src={hovered || lightbox ? frames[0] : frames[frame]}
        alt="Rocky Mountain Snowboarding hat"
        className={`${className} ${expandable ? "cursor-pointer" : ""}`}
        draggable={false}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={expandable ? (e) => { e.stopPropagation(); setLightbox(true); } : undefined}
      />

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={frames[0]}
              alt="Rocky Mountain Snowboarding hat"
              className="max-h-[70vh] max-w-[70vw] object-contain"
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
