export default function Pricing() {
  return (
    <section id='pricing' className='border-b border-muted-line'>
      <div className='mx-auto max-w-5xl px-6 py-20'>
        <h2 className='text-3xl font-semibold tracking-tight text-fg md:text-4xl'>
          Pricing
        </h2>
        <div className='mt-10 grid gap-6 md:grid-cols-2'>
          <div className='rounded-lg border border-muted-line bg-amber-glow p-6'>
            <p className='text-sm uppercase tracking-widest text-muted'>
              Setup
            </p>
            <p className='mt-2 text-4xl font-semibold text-fg'>$3,000</p>
            <p className='mt-3 leading-relaxed text-muted'>
              One time. Covers the build: site design and copy, migration of
              your existing content, Google Business Profile and listings
              setup, and call tracking wired up.
            </p>
          </div>
          <div className='rounded-lg border border-muted-line bg-amber-glow p-6'>
            <p className='text-sm uppercase tracking-widest text-muted'>
              Monthly
            </p>
            <p className='mt-2 text-4xl font-semibold text-fg'>$300</p>
            <p className='mt-3 leading-relaxed text-muted'>
              Covers the running: hosting, local search work toward the top
              three map spots, call connect on form fills, call tracking
              reports, and same-day edits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
