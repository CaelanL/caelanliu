import SiteNav from '@/components/site/SiteNav';
import Hero from '@/components/site/Hero';
import Services from '@/components/site/Services';
import Work from '@/components/site/Work';
import BuildStuff from '@/components/site/BuildStuff';
import Process from '@/components/site/Process';
import BookCall from '@/components/site/BookCall';
import SiteFooter from '@/components/site/SiteFooter';

export default function Home() {
  return (
    <div className='min-h-screen bg-[#0a0f0d] font-sans text-[#e8ede9]'>
      <SiteNav />
      <main>
        <Hero />
        <Services />
        <BuildStuff />
        <Process />
        <Work />
        <BookCall />
      </main>
      <SiteFooter />
    </div>
  );
}
