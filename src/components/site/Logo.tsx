// sendLabs mark: interlocked s + L monogram (option D direction), rebuilt as SVG.
// Teal on dark; swap this file to change the mark site-wide.
export function Monogram({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 64 64' fill='none' aria-hidden='true'>
      <path
        d='M40 6h10v40H22V36h18z'
        fill='#2dd4a8'
      />
      <path
        d='M33 15c-6-5-16-4-19 2-3.5 7 3 11 9.5 12.5 6.5 1.5 10 4.5 8.5 9-1.5 4.5-9 6-16 2'
        stroke='#2dd4a8'
        strokeWidth='9'
        strokeLinecap='round'
      />
    </svg>
  );
}

export default function Logo() {
  return (
    <a href='#top' className='flex items-center gap-2.5'>
      <Monogram />
      <span className='text-[17px] font-semibold tracking-tight text-[#e8ede9]'>
        send<span className='text-[#2dd4a8]'>Labs</span>
      </span>
    </a>
  );
}
