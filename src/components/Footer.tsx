export default function Footer() {
  const links = [
    { label: "GitHub", url: "https://github.com/CaelanL" },
    { label: "LinkedIn", url: "#" },
    { label: "Email", url: "mailto:you@example.com" },
  ];

  return (
    <footer className="px-8 py-12 border-t border-card-border">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-8">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-muted hover:text-green transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
