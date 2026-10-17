const items = [
  { k: '01', t: 'A website built for your trade', d: 'Pages, copy, photos, forms. You review, we ship.' },
  { k: '02', t: 'Local search, top three on the map', d: 'Google Business Profile and listings, tuned for the searches that become jobs.' },
  { k: '03', t: 'Calls tracked, calls answered', d: 'Every call traced to its source. Form fills get called back in seconds.' },
  { k: '04', t: 'Same-day edits', d: 'Text or email us, it is done that day.' },
];

export default function Services() {
  return (
    <section id='services' className='border-t border-white/[0.06] bg-[#0a0f0d]'>
      <div className='mx-auto max-w-6xl px-6 py-24'>
        <h2 className='font-serif text-[36px] leading-tight text-[#e8ede9] md:text-[44px]'>
          What you get
        </h2>
        <div className='mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-2'>
          {items.map((i) => (
            <div key={i.k} className='bg-[#0d1411] p-8'>
              <span className='font-mono text-[12px] text-[#2dd4a8]'>{i.k}</span>
              <h3 className='mt-3 text-[17px] font-medium text-[#e8ede9]'>{i.t}</h3>
              <p className='mt-2 text-[14px] leading-relaxed text-[#8fa39a]'>{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
