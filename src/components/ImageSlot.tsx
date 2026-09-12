'use client';

import { useEffect, useRef } from 'react';

/**
 * Wrapper for the vendored <image-slot> custom element.
 *
 * Every slot on the site is unfilled (there is no .image-slots.state.json
 * sidecar in the repo), so these render as styled placeholders - which is what
 * the live site shows today and what we are reproducing.
 */
export function ImageSlot({
  id,
  placeholder,
  shape = 'rect',
  style,
}: {
  id: string;
  placeholder: string;
  shape?: string;
  style?: React.CSSProperties;
}) {
  const ready = useRef(false);
  useEffect(() => {
    if (ready.current) return;
    ready.current = true;
    void import('@/vendor/image-slot.js');
  }, []);

  return <image-slot id={id} shape={shape} placeholder={placeholder} style={style} />;
}
