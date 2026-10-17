'use client';

import { motion } from 'framer-motion';
import { BOOKING_URL } from '@/data/site';

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Stars() {
  return <span className='text-[#f5b84c]'>★★★★★</span>;
}

export default function Hero() {
  return (
    <section id='top' className='relative overflow-hidden bg-[#0a0f0d]'>
      <div
        className='pointer-events-none absolute inset-0'
        style={{
          backgroundImage:
            'linear-gradient(rgba(45,212,168,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,168,0.045) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 75%)',
        }}
      />
      <div
        className='pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full'
        style={{ background: 'radial-gradient(closest-side, rgba(45,212,168,0.13), transparent)' }}
      />

      <div className='relative mx-auto grid max-w-6xl gap-16 px-6 pb-24 pt-40 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-48'>
        <div className='font-sans'>
          <motion.div variants={fade} initial='hidden' animate='show' custom={0}>
            <span className='inline-flex items-center gap-2 rounded-full border border-[#2dd4a8]/25 bg-[#2dd4a8]/[0.06] px-3.5 py-1.5 text-[12px] tracking-wide text-[#2dd4a8]'>
              <span className='h-1.5 w-1.5 rounded-full bg-[#2dd4a8]' />
              Now booking HVAC, plumbing &amp; roofing
            </span>
          </motion.div>

          <motion.h1
            variants={fade}
            initial='hidden'
            animate='show'
            custom={1}
            className='mt-7 font-serif text-[52px] leading-[1.04] tracking-[-0.01em] text-[#e8ede9] md:text-[76px]'
          >
            Your next customer
            <br />
            is searching.
            <br />
            <em className='text-[#2dd4a8]'>Be the one they call.</em>
          </motion.h1>

          <motion.p
            variants={fade}
            initial='hidden'
            animate='show'
            custom={2}
            className='mt-7 max-w-md text-[16px] leading-relaxed text-[#8fa39a]'
          >
            Websites and local search for trade companies, run by one engineer
            who answers the phone.
          </motion.p>

          <motion.div
            variants={fade}
            initial='hidden'
            animate='show'
            custom={3}
            className='mt-9 flex flex-wrap items-center gap-4'
          >
            <a
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-full bg-[#2dd4a8] px-6 py-3 text-[15px] font-medium text-[#06231b] transition-colors hover:bg-[#54e2bd]'
            >
              Book a call
            </a>
            <a
              href='#work'
              className='rounded-full border border-[#2dd4a8]/25 px-6 py-3 text-[15px] font-medium text-[#c9d4ce] transition-colors hover:border-[#2dd4a8]/60'
            >
              See the work
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className='relative mx-auto w-full max-w-[380px]'
        >
          <div
            className='pointer-events-none absolute -inset-10 rounded-[32px]'
            style={{ background: 'radial-gradient(closest-side, rgba(45,212,168,0.16), transparent)' }}
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className='relative rounded-2xl border border-[#2dd4a8]/20 bg-[#0e1512]/90 p-5 shadow-[0_24px_80px_-24px_rgba(45,212,168,0.35)] backdrop-blur'
          >
            <p className='text-[11px] uppercase tracking-[0.18em] text-[#5c6f66]'>
              roof repair · round rock
            </p>
            <div className='mt-4 space-y-3'>
              <div className='rounded-xl border border-[#2dd4a8]/40 bg-[#2dd4a8]/[0.07] p-4'>
                <div className='flex items-baseline justify-between'>
                  <span className='text-[15px] font-medium text-[#e8ede9]'>
                    <span className='mr-2 font-mono text-[12px] text-[#2dd4a8]'>1</span>
                    Your Business
                  </span>
                  <span className='text-[12px] text-[#8fa39a]'>4.9 (212)</span>
                </div>
                <p className='mt-1.5 text-[12px] text-[#8fa39a]'>
                  Roofing contractor · Open now
                </p>
                <p className='mt-2 text-[12px] text-[#2dd4a8]'>
                  <Stars /> Call
                </p>
              </div>
              {[
                { n: 2, name: 'Summit Roofing', r: '4.4 (132)' },
                { n: 3, name: 'Texas Storm Roofing', r: '4.7 (54)' },
              ].map((c) => (
                <div key={c.n} className='rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 opacity-60'>
                  <div className='flex items-baseline justify-between'>
                    <span className='text-[15px] font-medium text-[#c9d4ce]'>
                      <span className='mr-2 font-mono text-[12px] text-[#5c6f66]'>{c.n}</span>
                      {c.name}
                    </span>
                    <span className='text-[12px] text-[#5c6f66]'>{c.r}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className='mt-4 text-center text-[11px] text-[#5c6f66]'>
              the top three is where the calls come from
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
