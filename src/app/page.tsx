import { HeroSlider } from '@/components/home/HeroSlider';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { ServicesShowcase } from '@/components/home/ServicesShowcase';
import { WorkRail } from '@/components/home/WorkRail';
import { ApproachRail } from '@/components/home/ApproachRail';
import { TeamCards } from '@/components/home/TeamCards';
import { Numbers } from '@/components/home/Numbers';
import { Testimonials } from '@/components/home/Testimonials';
import { Articles } from '@/components/home/Articles';
import { Faq } from '@/components/home/Faq';
import { HomeOutro } from '@/components/qreveal/HomeOutro';

/**
 * Home. The section order is the client's, not the original document's:
 *
 *   Hero -> About -> Services -> Work -> Process -> Team -> Numbers ->
 *   Testimonials -> Insights -> FAQ -> Let's Talk + Footer
 *
 * Departures from Quantivo.dc.html: the original hero and its three.js card
 * drum are replaced by HeroSlider; the capability marquee and the "Four Things
 * We Bring" pillars are gone; Team is new to the home page.
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
        <ServicesShowcase />
        <WorkRail />
        <ApproachRail />
        <TeamCards />
        <Numbers />
        <Testimonials />
        <Articles />
        <Faq />
      </main>
      <HomeOutro />
    </>
  );
}
