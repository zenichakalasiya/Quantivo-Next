import type React from 'react';

/** <image-slot> is a vanilla custom element, so JSX needs to be told it exists. */
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'image-slot': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { id?: string; shape?: string; placeholder?: string };
    }
  }
}
