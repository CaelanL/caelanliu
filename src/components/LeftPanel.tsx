"use client";

export default function LeftPanel() {
  return (
    <div className="w-[38%] min-h-screen flex flex-col justify-center pl-20 pr-12 sticky top-0 h-screen">
      <div className="flex flex-col gap-10">
        <div>
          <h1 className="font-mono text-3xl font-medium text-amber tracking-tight">
            Caelan Liu
          </h1>
          <p className="font-mono text-xs text-muted mt-1.5 tracking-wide">
            Software Engineer
            <span className="cursor-blink text-amber ml-1">_</span>
          </p>
        </div>

        <nav className="flex gap-6">
          <a
            href="https://github.com/CaelanL"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted hover:text-amber transition-colors"
          >
            GitHub
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted hover:text-amber transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:you@example.com"
            className="font-mono text-[11px] text-muted hover:text-amber transition-colors"
          >
            Email
          </a>
        </nav>

        <p className="font-mono text-xs text-fg leading-relaxed max-w-xs opacity-50">
          Studied [major] at [university]. Building AI-powered tools
          and voice interfaces. Occasionally making hats.
        </p>

        {/* Photo placeholder — will be stylized (halftone/duotone/grain) */}
        <div className="w-24 h-24 border border-grid flex items-center justify-center">
          <span className="font-mono text-[8px] text-muted opacity-30">[ photo ]</span>
        </div>
      </div>
    </div>
  );
}
