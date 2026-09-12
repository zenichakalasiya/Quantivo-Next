import { HeroSlider } from '@/components/home/HeroSlider';
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
 * Home. Section order follows Quantivo.dc.html lines 161-660, with two
 * deliberate departures: the original hero and its three.js card drum are
 * replaced by HeroSlider, and the capability marquee that sat under the hero
 * has been removed.
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
        <HeroSlider />
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
