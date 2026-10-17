export default function SiteFooter() {
  return (
    <footer className='bg-bg'>
      <div className='mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted'>
        <span>Send Labs</span>
        <a href='mailto:caelanliu@sendlabs.dev' className='hover:text-fg'>
          caelanliu@sendlabs.dev
        </a>
      </div>
    </footer>
  );
}
