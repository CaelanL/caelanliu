"use client";

import { useState } from "react";

export default function LeftPanel() {
  const [showCopied, setShowCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("licaelan@gmail.com");
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 1500);
  }

  return (
    <div className="w-[300px] flex flex-col justify-center">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-medium text-amber tracking-tight">
            Caelan Liu
          </h1>
          <p className="text-xs text-muted mt-2 tracking-wide">
            Software Engineer
            <span className="cursor-blink text-amber ml-1">_</span>
          </p>
          <p className="text-xs mt-1 tracking-wide">
            <span className="text-muted">@ </span>
            <span className="text-atlassian">Atlassian</span>
          </p>
        </div>

        <p className="text-xs text-muted leading-relaxed">
          Studied <span className="text-amber-dim">Electrical and Computer Engineering</span>
          <br />
          at <span className="text-amber-dim">University of Texas at Austin</span>
        </p>

        <nav className="flex gap-6">
          <a
            href="https://github.com/CaelanL"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-muted hover:text-amber transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/caelanliu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-muted hover:text-amber transition-colors"
          >
            LinkedIn
          </a>
          <button
            onClick={copyEmail}
            className="text-[11px] text-muted hover:text-amber transition-colors cursor-pointer"
          >
            licaelan@gmail.com
          </button>
        </nav>

        <div className="w-24 h-24 border border-grid flex items-center justify-center">
          <span className="text-[8px] text-muted opacity-30">[ photo ]</span>
        </div>
      </div>

      {showCopied && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="text-xs text-amber border border-grid bg-bg px-4 py-2 flex items-center gap-2">
            <span>&#10003;</span>
            Copied
          </div>
        </div>
      )}
    </div>
  );
}
