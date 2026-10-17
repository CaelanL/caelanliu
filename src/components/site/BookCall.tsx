import { BOOKING_URL } from '@/data/site';

export default function BookCall() {
  return (
    <section id='book-a-call' className='relative overflow-hidden border-t border-white/[0.06] bg-[#0a0f0d]'>
      <div
        className='pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full'
        style={{ background: 'radial-gradient(closest-side, rgba(45,212,168,0.12), transparent)' }}
      />
      <div className='relative mx-auto max-w-3xl px-6 py-28'>
        <div className='rounded-3xl border border-[#2dd4a8]/20 bg-gradient-to-b from-[#2dd4a8]/[0.05] to-[#2dd4a8]/[0.01] px-8 py-16 text-center'>
          <h2 className='font-serif text-[40px] leading-tight text-[#e8ede9] md:text-[56px]'>
            Twenty minutes.
            <br />
            <em className='text-[0.94em] text-[#2dd4a8]'>A straight answer.</em>
          </h2>
          <p className='mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-[#aebfb7]'>
            We look at your site and your local search results, and you leave
            knowing whether we can help. If we cannot, we say so. The first
            look at your site and local search is free.
          </p>
          <a
            href={BOOKING_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-9 inline-block rounded-full bg-[#2dd4a8] px-7 py-3.5 text-[15px] font-medium text-[#06231b] transition-colors hover:bg-[#54e2bd]'
          >
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}
