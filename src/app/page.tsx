import { Hero } from '@/components/home/Hero';
import { Ticker } from '@/components/home/Ticker';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { Pillars } from '@/components/home/Pillars';
import { ServicesShowcase } from '@/components/home/ServicesShowcase';
import { Numbers } from '@/components/home/Numbers';
import { Testimonials } from '@/components/home/Testimonials';
import { WorkRail } from '@/components/home/WorkRail';
import { ApproachRail } from '@/components/home/ApproachRail';
import { Articles } from '@/components/home/Articles';
import { Faq } from '@/components/home/Faq';
import { HomeOutro } from '@/components/qreveal/HomeOutro';

/**
 * Home. Section order matches Quantivo.dc.html lines 161-660.
 *
 * HomeOutro sits OUTSIDE <main> because it carries both the Let's Talk screen
 * (the old FinalCta, now revealed through the drawn Q) and the site footer — one
 * wrapper, so a single Q watermark can span the two and be cut in half by the
 * boundary. GlobalFooter skips "/" for the same reason.
 */
export default function HomePage() {
  return (
    <>
      <main style={{ position: 'relative', zIndex: '1' }}>
        <Hero />
        <Ticker />
        <AboutTeaser />
        <Pillars />
        <ServicesShowcase />
        <Numbers />
        <Testimonials />
        <WorkRail />
        <ApproachRail />
        <Articles />
        <Faq />
      </main>
      <HomeOutro />
    </>
  );
}
