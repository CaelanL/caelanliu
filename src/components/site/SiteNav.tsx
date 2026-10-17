import { BOOKING_URL } from '@/data/site';

const links = [
  { href: '#how-we-help', label: 'How we help' },
  { href: '#work', label: 'Work' },
  { href: '#pricing', label: 'Pricing' },
];

export default function SiteNav() {
  return (
    <header className='sticky top-0 z-50 border-b border-muted-line bg-bg/90 backdrop-blur'>
      <div className='mx-auto flex max-w-5xl items-center justify-between px-6 py-4'>
        <a href='#top' className='text-lg font-semibold tracking-tight text-fg'>
          Send Labs
        </a>
        <nav className='hidden items-center gap-8 text-sm text-muted md:flex'>
          {links.map((l) => (
            <a key={l.href} href={l.href} className='hover:text-fg'>
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={BOOKING_URL}
          className='rounded-md bg-amber px-4 py-2 text-sm font-medium text-bg hover:bg-amber-dim'
        >
          Book a call
        </a>
      </div>
    </header>
  );
}
