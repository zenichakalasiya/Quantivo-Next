'use client';

import { QReveal } from './QReveal';
import { OutroFooter, OutroLetsTalk } from './OutroScreen';

/**
 * The home page ending, in three beats:
 *
 *   1. the Q draws itself (outline, scrubbed)
 *   2. it opens onto the Let's Talk screen — TOP half of the Q behind it
 *   3. scrolling on reveals the footer as its own full viewport — BOTTOM half
 *
 * Only the Let's Talk screen sits inside the reveal; the footer follows in normal
 * flow. That is what lets the footer be a true 100svh screen rather than content
 * squeezed in beside the CTA, and it matches the reference, where the letter is
 * cut by the boundary between the two.
 */
export function HomeOutro() {
  return (
    <>
      <QReveal>
        <OutroLetsTalk />
      </QReveal>
      <OutroFooter />
    </>
  );
}
