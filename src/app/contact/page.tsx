'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';

/**
 * Contact. Redesigned from a client reference (a "FAZA"-style agency contact
 * page): giant headline left, an underline-only form right, no card/border
 * around it. The reference's own footer band (its "Have an awesome project?"
 * teaser + link columns) is NOT reproduced — this page keeps the site's own
 * global footer (rendered by GlobalFooter after this component).
 *
 * Dropped from the previous version, deliberately: the service-interest
 * picker and the contact-info list (email/studio/timezone) — the reference
 * has neither, and the ask was to match it rather than layer extras on top.
 *
 * Submit behaviour is unchanged from before: preventDefault and flip the
 * button label. There is no backend, so wiring one up would be new
 * behaviour, not a redesign.
 */
const FIELD: CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--line)',
  padding: '14px 0',
  color: 'var(--ink)',
  font: 'inherit',
  fontSize: 'clamp(15px,1.1vw,17px)',
  outline: 'none',
  transition: 'border-color .3s',
};

const LABEL_TEXT = { fontSize: '11px', fontWeight: '700', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mute)' } as const;

const FIELDS = [
  { key: 'name', label: 'Your Name', type: 'text', placeholder: 'Full name' },
  { key: 'email', label: 'Your Email', type: 'email', placeholder: 'Email address' },
  { key: 'details', label: 'Project Details', type: 'textarea', placeholder: 'What are your project goals, requirements and timeline?' },
  { key: 'budget', label: 'Project Budget', type: 'text', placeholder: "What's your budget? (USD)" },
] as const;

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main style={{ position: 'relative', zIndex: '1' }}>
      <section data-screen-label="Contact" style={{ minHeight: '100svh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 'clamp(40px,6vw,96px)', padding: 'clamp(120px,15vh,170px) clamp(16px,3.4vw,48px) clamp(80px,10vw,140px)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--a)' }}>Contact</span>
          <h1 data-split="" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(46px,calc(8.4vw - 8px),150px)', lineHeight: '.88', maxWidth: '12ch' }}>Let&apos;s Work Together.</h1>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px,4vh,40px)' }}
        >
          {FIELDS.map((f) => (
            <label key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={LABEL_TEXT}><span style={{ color: 'var(--a)' }}>*</span> {f.label}</span>
              {f.type === 'textarea' ? (
                <textarea rows={3} placeholder={f.placeholder} data-field="" style={{ ...FIELD, resize: 'vertical' }} />
              ) : (
                <input type={f.type} placeholder={f.placeholder} data-field="" style={FIELD} />
              )}
            </label>
          ))}

          <button
            type="submit"
            data-magnet=""
            data-cursor="Send"
            style={{ alignSelf: 'start', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '14px', fontSize: 'clamp(12px,1vw,14px)', fontWeight: '700', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--a)' }}
          >
            {sent ? 'Thanks — we’ll be in touch' : 'Submit Inquiry'}
            <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ display: 'block', width: '40px', height: '1.4px', borderRadius: '2px', background: 'currentColor' }} />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '-3px' }}><path d="M9 5l7 7-7 7" /></svg>
            </span>
          </button>
        </form>
      </section>
    </main>
  );
}
