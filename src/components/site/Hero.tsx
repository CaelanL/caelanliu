import { BOOKING_URL } from '@/data/site';

export default function Hero() {
  return (
    <section id='top' className='border-b border-muted-line'>
      <div className='mx-auto max-w-5xl px-6 py-28 md:py-36'>
        <p className='mb-4 text-sm font-medium uppercase tracking-widest text-muted'>
          Websites for home-service companies
        </p>
        <h1 className='max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-fg md:text-6xl'>
          A website that picks up the phone for your trade business.
        </h1>
        <p className='mt-6 max-w-2xl text-lg leading-relaxed text-muted'>
          We build and run websites for HVAC, plumbing, and roofing companies.
          When someone in your area searches for the work you do, you show up.
          When they fill out your form, their phone rings within seconds.
        </p>
        <div className='mt-10 flex flex-wrap items-center gap-4'>
          <a
            href={BOOKING_URL}
            className='rounded-md bg-amber px-6 py-3 text-base font-medium text-bg hover:bg-amber-dim'
          >
            Book a 20-minute call
          </a>
          <a
            href='#how-we-help'
            className='rounded-md border border-muted-line px-6 py-3 text-base font-medium text-muted hover:border-fg'
          >
            See how we help
          </a>
        </div>
      </div>
    </section>
  );
}
