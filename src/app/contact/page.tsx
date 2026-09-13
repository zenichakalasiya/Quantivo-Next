'use client';

import { useState } from 'react';
import { INTERESTS } from '@/data/content';

/**
 * Contact. Ported from Quantivo.dc.html lines 1149-1193.
 *
 * The `picks` and `sent` state were on the root component; both are local here.
 * Submit behaviour is reproduced exactly as the original: preventDefault and
 * flip the button label. There is no backend - the original posted nowhere
 * either, so wiring one up would be a change in behaviour, not a port.
 */
const CONTACT_ROWS = [
  { k: 'Email', v: 'hello@quantivo.digital' },
  { k: 'Studio', v: 'Add studio address' },
  { k: 'Working globally', v: 'Ideas don’t have borders' },
];

const FIELD = {
  background: 'var(--bg)',
  border: '1px solid var(--line)',
  borderRadius: '10px',
  padding: '13px 14px',
  color: 'var(--ink)',
  font: 'inherit',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color .3s',
} as const;

const LABEL = { fontSize: '10px', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' } as const;

export default function ContactPage() {
  const [picks, setPicks] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (label: string) =>
    setPicks((prev) => (prev.includes(label) ? prev.filter((p) => p !== label) : prev.concat(label)));

  return (
    <main style={{ position: 'relative', zIndex: '1' }}>
      <section data-screen-label="Contact" style={{ minHeight: '100svh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 'clamp(32px,5vw,80px)', padding: '150px clamp(16px,3.4vw,48px) clamp(60px,7vw,110px)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px', position: 'sticky', top: '120px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>Contact</span>
          <h1 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(36px,calc(7.4vw - 8px),124px)', lineHeight: '.86', maxWidth: '14ch' }}>Let&apos;s Work Together.</h1>
          <p style={{ fontSize: 'clamp(15px,1.25vw,19px)', lineHeight: '1.55', color: 'var(--mute)', maxWidth: '46ch' }}>Tell us about the brand, the challenge, and where you want to be. We&apos;ll come back with a clear direction.</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
            {CONTACT_ROWS.map((c) => (
              <li key={c.k} style={{ background: 'var(--bg)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={LABEL}>{c.k}</span>
                <span style={{ fontSize: '15px', fontWeight: '600' }}>{c.v}</span>
              </li>
            ))}
          </ul>
          <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--mute)', border: '1px dashed var(--line)', borderRadius: '99px', padding: '5px 11px', alignSelf: 'start' }}>Placeholder contact details</span>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '18px', border: '1px solid var(--line)', borderRadius: '20px', padding: 'clamp(20px,3vw,36px)', background: 'var(--bg2)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={LABEL}>Your name</span>
              <input type="text" placeholder="Jane Doe" data-field="" style={FIELD} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={LABEL}>Email</span>
              <input type="email" placeholder="jane@company.com" data-field="" style={FIELD} />
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={LABEL}>What do you need?</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {INTERESTS.map((label) => {
                const on = picks.includes(label);
                return (
                  <button key={label} type="button" onClick={() => toggle(label)} data-cursor="Pick" style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '.1em', textTransform: 'uppercase', border: '1px solid ' + (on ? 'var(--a)' : 'var(--line)'), color: on ? '#fff' : 'var(--mute)', background: on ? 'var(--grad)' : 'transparent', borderRadius: '99px', padding: '9px 14px', transition: 'all .3s' }}>{label}</button>
                );
              })}
            </div>
          </div>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={LABEL}>Project details</span>
            <textarea rows={5} placeholder="A few lines about the brand, timeline and goals." data-field="" style={{ ...FIELD, resize: 'vertical' }} />
          </label>

          <button type="submit" data-magnet="" data-cursor="Send" style={{ alignSelf: 'start', padding: '16px 32px', borderRadius: '99px', background: 'var(--grad)', color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase' }}>
            {sent ? 'Thanks — we’ll be in touch' : 'Send Enquiry'}
          </button>
        </form>
      </section>
    </main>
  );
}
