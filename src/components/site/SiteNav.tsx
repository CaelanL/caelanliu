import { BOOKING_URL } from '@/data/site';

export default function SiteNav() {
  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-5'>
        <a href='#top' className='text-[16px] font-medium tracking-tight text-[#e8ede9]'>
          send<span className='text-[#2dd4a8]'>Labs</span>
        </a>
        <nav className='hidden items-center gap-7 text-[14px] text-[#b9c6c0] md:flex'>
          <a href='#services' className='transition-colors hover:text-[#e8ede9]'>What we do</a>
          <a href='#work' className='transition-colors hover:text-[#e8ede9]'>Work</a>
          <a href='#pricing' className='transition-colors hover:text-[#e8ede9]'>Pricing</a>
        </nav>
        <a
          href={BOOKING_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='rounded-full bg-[#2dd4a8] px-4 py-2 text-[13px] font-medium text-[#06231b] transition-colors hover:bg-[#54e2bd]'
        >
          Book a call
        </a>
      </div>
    </header>
  );
}
