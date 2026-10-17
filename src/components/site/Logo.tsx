// sendLabs mark: interlocked s + L monogram (option D direction), rebuilt as SVG.
// Teal on dark; swap this file to change the mark site-wide.
export function Monogram({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 64 64' fill='none' aria-hidden='true'>
      {/* L: stem + foot, drawn with a dark keyline so it reads over the s */}
      <path
        d='M38 6h10v40H16V36h22z'
        fill='#2dd4a8'
        stroke='#0a0f0d'
        strokeWidth='3'
        strokeLinejoin='round'
      />
      {/* s: thick rounded stroke hooking through the L stem */}
      <path
        d='M32 14c-7-5-17-3-19 3-2.5 7.5 4.5 11 11 12.5S34 33 32.5 38c-1.5 5-10 6.5-17 2.5'
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
