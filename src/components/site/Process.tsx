const steps = [
  {
    k: '01',
    t: 'Audit',
    d: 'Free, and yours to keep. We look at your current site, your Google presence, and the searches your customers make, and tell you where the calls are going.',
  },
  {
    k: '02',
    t: 'Build',
    d: 'Pages, copy, photos, forms, tracking. You review as we go, and most owners spend under two hours on it, total.',
  },
  {
    k: '03',
    t: 'Launch',
    d: 'The new site goes live, listings are claimed and cleaned up, and call tracking starts reporting from day one.',
  },
  {
    k: '04',
    t: 'Run',
    d: 'Local search work toward the top three, form fills called back in seconds, and same-day edits whenever you need them.',
  },
];

export default function Process() {
  return (
    <section id='process' className='border-t border-white/[0.06] bg-[#0a0f0d]'>
      <div className='mx-auto max-w-6xl px-6 py-20'>
        <h2 className='font-serif text-[36px] leading-tight text-[#e8ede9] md:text-[44px]'>
          How it works
        </h2>
        <div className='mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-2 lg:grid-cols-4'>
          {steps.map((s) => (
            <div key={s.k} className='bg-[#0d1411] p-7'>
              <span className='font-mono text-[12px] text-[#2dd4a8]'>{s.k}</span>
              <h3 className='mt-3 text-[18px] font-medium text-[#e8ede9]'>{s.t}</h3>
              <p className='mt-2.5 text-[14.5px] leading-relaxed text-[#bcc9c3]'>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
