import SiteNav from '@/components/site/SiteNav';
import Hero from '@/components/site/Hero';
import HowWeHelp from '@/components/site/HowWeHelp';
import Work from '@/components/site/Work';
import Pricing from '@/components/site/Pricing';
import BookCall from '@/components/site/BookCall';
import SiteFooter from '@/components/site/SiteFooter';

export default function Home() {
  return (
    <div className='min-h-screen'>
      <SiteNav />
      <main>
        <Hero />
        <HowWeHelp />
        <Work />
        <Pricing />
        <BookCall />
      </main>
      <SiteFooter />
    </div>
  );
}
