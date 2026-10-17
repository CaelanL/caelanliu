import { BOOKING_URL } from '@/data/site';

export default function BookCall() {
  return (
    <section id='book-a-call' className='border-b border-muted-line'>
      <div className='mx-auto max-w-5xl px-6 py-24 text-center'>
        <h2 className='text-3xl font-semibold tracking-tight text-fg md:text-4xl'>
          Book a call
        </h2>
        <p className='mx-auto mt-4 max-w-2xl leading-relaxed text-muted'>
          Twenty minutes on the phone. We look at your current site and your
          local search results, and you leave with a straight answer on whether
          we can help. If we cannot, we will say so.
        </p>
        <a
          href={BOOKING_URL}
          className='mt-8 inline-block rounded-md bg-amber px-6 py-3 text-base font-medium text-bg hover:bg-amber-dim'
        >
          Pick a time
        </a>
        <p className='mt-4 text-sm text-muted'>
          Or email caelanliu@sendlabs.dev
        </p>
      </div>
    </section>
  );
}
