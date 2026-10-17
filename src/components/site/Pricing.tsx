const plans = [
  {
    k: 'SETUP',
    price: '$3,000',
    note: 'one time',
    body: 'The build: site design and copy, your content moved over, Google Business Profile and listings set up, call tracking wired.',
  },
  {
    k: 'MONTHLY',
    price: '$300',
    note: 'a month, no lock-in',
    body: 'The running: hosting, local search work toward the top three, call connect on form fills, call reports, same-day edits.',
  },
];

export default function Pricing() {
  return (
    <section id='pricing' className='border-t border-white/[0.06] bg-[#0a0f0d]'>
      <div className='mx-auto max-w-6xl px-6 py-20'>
        <h2 className='font-serif text-[36px] leading-tight text-[#e8ede9] md:text-[44px]'>
          Pricing
        </h2>
        <div className='mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-2'>
          {plans.map((p) => (
            <div key={p.k} className='bg-[#0d1411] p-8'>
              <span className='font-mono text-[12px] tracking-wide text-[#2dd4a8]'>{p.k}</span>
              <h3 className='mt-3 text-[26px] font-medium text-[#e8ede9]'>
                {p.price}{' '}
                <span className='text-[14px] font-normal text-[#aebfb7]'>{p.note}</span>
              </h3>
              <p className='mt-3 text-[15px] leading-relaxed text-[#aebfb7]'>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
