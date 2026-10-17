import { projects } from '@/data/projects';

export default function Work() {
  const shipped = projects.filter((p) => !p.isHat);
  return (
    <section id='work' className='border-t border-white/[0.06] bg-[#0a0f0d]'>
      <div className='mx-auto max-w-6xl px-6 py-24'>
        <h2 className='font-serif text-[36px] leading-tight text-[#e8ede9] md:text-[44px]'>
          Proof we can ship
        </h2>
        <p className='mt-4 max-w-lg text-[15px] leading-relaxed text-[#8fa39a]'>
          Send Labs is new. Everything below was built end to end by the same
          person who would build your site.
        </p>

        <a
          href='https://rts-demo-sigma.vercel.app'
          target='_blank'
          rel='noopener noreferrer'
          className='group mt-10 block rounded-2xl border border-[#2dd4a8]/25 bg-gradient-to-br from-[#2dd4a8]/[0.08] to-transparent p-8 transition-colors hover:border-[#2dd4a8]/60'
        >
          <div className='flex flex-wrap items-baseline justify-between gap-3'>
            <h3 className='text-[19px] font-medium text-[#e8ede9]'>
              RTS Roofing concept site
            </h3>
            <span className='text-[13px] text-[#2dd4a8] group-hover:underline'>
              rts-demo-sigma.vercel.app →
            </span>
          </div>
          <p className='mt-2 max-w-xl text-[15px] leading-relaxed text-[#aebfb7]'>
            A full demo of what we make for a roofing company, built on our own
            initiative. Concept work, and labeled that way on the site itself.
          </p>
        </a>

        <ul className='mt-6 divide-y divide-white/[0.06] rounded-2xl border border-white/[0.06]'>
          {shipped.map((p) => (
            <li key={p.id} className='flex flex-wrap items-baseline justify-between gap-2 px-6 py-4'>
              <span className='text-[15px] text-[#c9d4ce]'>{p.name} <span className='text-[14px] text-[#bcc9c3]'>— voice-first Bible memorization app, on the App Store</span></span>
              <span className='flex gap-4 text-[14px]'>
                {p.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[#8fa39a] transition-colors hover:text-[#2dd4a8]'
                  >
                    {l.label}
                  </a>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
