import { projects } from '@/data/projects';

export default function Work() {
  const shipped = projects.filter((p) => !p.isHat);
  return (
    <section id='work' className='border-b border-muted-line'>
      <div className='mx-auto max-w-5xl px-6 py-20'>
        <h2 className='text-3xl font-semibold tracking-tight text-fg md:text-4xl'>
          Work
        </h2>
        <p className='mt-4 max-w-2xl text-muted'>
          Send Labs is new. Before starting it, I shipped the projects below on
          my own, from idea to working product, and I still run the live ones.
          The same person who built those builds your site.
        </p>
        <div className='mt-10 rounded-lg border border-muted-line bg-amber-glow p-6'>
          <h3 className='text-lg font-semibold text-fg'>
            RTS Roofing concept site
          </h3>
          <p className='mt-2 leading-relaxed text-muted'>
            A demo of what we make for a roofing company: the pages, the
            contact forms, the call-connect flow. This one is a concept built
            on our own initiative, and no real roofing company is behind it.
          </p>
          <a
            href='https://rts-demo-sigma.vercel.app'
            className='mt-4 inline-block text-amber hover:underline'
          >
            rts-demo-sigma.vercel.app
          </a>
        </div>
        <ul className='mt-6 divide-y divide-muted-line rounded-lg border border-muted-line'>
          {shipped.map((p) => (
            <li key={p.id} className='p-6'>
              <div className='flex flex-wrap items-baseline justify-between gap-2'>
                <h3 className='text-lg font-semibold text-fg'>{p.name}</h3>
                <div className='flex gap-4 text-sm'>
                  {p.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      className='text-amber hover:underline'
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
              <p className='mt-2 leading-relaxed text-muted'>{p.preview}</p>
              <div className='mt-3 flex flex-wrap gap-2'>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className='rounded border border-muted-line px-2 py-0.5 text-xs text-muted'
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
