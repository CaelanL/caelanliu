const work = [
  {
    title: 'Call connect, built in-house',
    body: 'When someone fills out a form on the RTS demo site, our own call-connect tool dials them and rings the business at the same time. No vendor, no per-lead fee.',
    href: 'https://rts-demo-sigma.vercel.app',
    link: 'See it on the demo site',
  },
  {
    title: 'Ardent Mentoring, a real platform',
    body: 'An invite-only mentoring platform for organizations: accounts, matching, and sessions, built end to end and running in production today.',
    href: 'https://ardent-mentors.vercel.app',
    link: 'ardent-mentors.vercel.app',
  },
  {
    title: 'Tools we needed, so we made',
    body: 'A voice dictation tool, an AI study generator, an agent over 572 voice memos. Each one shipped from idea to working product by the same engineer.',
    href: '#work',
    link: 'See the work',
  },
];

export default function BuildStuff() {
  return (
    <section id='build' className='relative overflow-hidden border-t border-white/[0.06] bg-[#0a0f0d]'>
      <div
        className='pointer-events-none absolute -left-40 top-1/3 h-[360px] w-[520px] rounded-full'
        style={{ background: 'radial-gradient(closest-side, rgba(45,212,168,0.08), transparent)' }}
      />
      <div className='relative mx-auto max-w-6xl px-6 py-20'>
        <p className='font-mono text-[12px] uppercase tracking-[0.18em] text-[#2dd4a8]'>
          And we can build stuff for you
        </p>
        <h2 className='mt-4 max-w-2xl font-serif text-[36px] leading-[1.1] text-[#e8ede9] md:text-[44px]'>
          When a tool we need does not exist, we build it.
        </h2>
        <p className='mt-4 max-w-xl text-[16px] leading-relaxed text-[#bcc9c3]'>
          The software behind our sites is not a product we resell. It is
          custom work we wrote ourselves, and the same hands can build what
          your business needs.
        </p>
        <div className='mt-10 grid gap-6 md:grid-cols-3'>
          {work.map((w) => (
            <div
              key={w.title}
              className='flex flex-col rounded-2xl border border-white/[0.06] bg-[#0d1411] p-6'
            >
              <h3 className='text-[17px] font-medium text-[#e8ede9]'>{w.title}</h3>
              <p className='mt-2.5 flex-1 text-[14.5px] leading-relaxed text-[#bcc9c3]'>
                {w.body}
              </p>
              <a
                href={w.href}
                target={w.href.startsWith('#') ? undefined : '_blank'}
                rel={w.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                className='mt-5 text-[14px] font-medium text-[#2dd4a8] hover:underline'
              >
                {w.link} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
