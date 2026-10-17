export default function Pricing() {
  return (
    <section id='pricing' className='border-t border-white/[0.06] bg-[#0a0f0d]'>
      <div className='mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-6 px-6 py-20'>
        <h2 className='font-serif text-[36px] leading-tight text-[#e8ede9] md:text-[44px]'>
          Pricing
        </h2>
        <p className='text-[15px] text-[#8fa39a]'>
          <span className='text-[22px] font-medium text-[#e8ede9]'>$3,000</span> setup
          <span className='mx-3 text-[#2dd4a8]'>·</span>
          <span className='text-[22px] font-medium text-[#e8ede9]'>$300</span>/month
        </p>
      </div>
    </section>
  );
}
