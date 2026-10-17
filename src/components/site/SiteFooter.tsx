export default function SiteFooter() {
  return (
    <footer className='border-t border-white/[0.06] bg-[#0a0f0d]'>
      <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-[13px] text-[#5c6f66]'>
        <span className='text-[#8fa39a]'>
          send<span className='text-[#2dd4a8]'>Labs</span>
        </span>
        <a href='mailto:caelanliu@sendlabs.dev' className='transition-colors hover:text-[#2dd4a8]'>
          caelanliu@sendlabs.dev
        </a>
      </div>
    </footer>
  );
}
