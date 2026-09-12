'use client';

import { QReveal } from './QReveal';
import { OutroScreen } from './OutroScreen';

/**
 * The home page ending: the Q draws, then opens onto ONE full screen that holds
 * the Let's Talk block, the footer columns, the legal bar and the split
 * wordmark — all at once. The page ends there; nothing scrolls in behind it.
 *
 * Deliberately NOT "reveal, then a separate footer section underneath" — the
 * footer arriving as its own scrolling block was the thing that read wrong.
 * Here the footer is simply part of what the letter opens onto.
 */
export function HomeOutro() {
  return (
    <QReveal>
      <OutroScreen />
    </QReveal>
  );
}
