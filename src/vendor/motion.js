/**
 * Motion layer, ported from the Component class in Quantivo.dc.html (L1434-1888).
 *
 * Deliberately kept as near-verbatim vanilla rather than rewritten into idiomatic
 * React hooks: it is dense, measurement-sensitive scroll code, and rewriting it is
 * exactly where an animation port drifts. The only changes are mechanical -
 * methods became functions, `this._x` instance state became the module-level S
 * object, and gsap/ScrollTrigger are imports instead of CDN globals.
 *
 * Lifecycle mirrors the original:
 *   componentDidMount   -> startGlobalMotion()  (cursor + scroll progress, once)
 *   componentDidUpdate  -> runPageMotion()      (re-run on every page change)
 *   componentWillUnmount-> the returned teardowns
 *
 * Every _init* still has its paired _*Off(); React owns the DOM, so each route
 * change invalidates every handle these take.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Was the component instance; holds the same _-prefixed fields the original did. */
const S = {};


  // ---------- motion ----------
function _root() {
  return document.body;
}
 // ---------- motion ----------


function _killScroll() {
    // Kills ONLY the triggers this layer created.
    //
    // The original did ScrollTrigger.getAll().forEach(t => t.kill()), which was
    // safe when this was the only code on the page creating ScrollTriggers. It is
    // not any more - runPageMotion() fires ~80ms after every route change, so a
    // blanket kill silently destroys any scroll-driven component mounted
    // alongside it (this is exactly what broke QReveal). _vmOff/_yrOff already
    // kill their own standalone triggers, so tracked tweens are all that is left.
    (S._tweens || []).forEach((t) => {
      if (t.scrollTrigger) t.scrollTrigger.kill();
      if (t.kill) t.kill();
    });
    S._tweens = [];
  }

function _animate() {
    const root = _root();
    if (!root || !gsap) return;
    gsap.registerPlugin(ScrollTrigger);
    _killScroll();
    S._tweens = [];
    _initSvcTrack(root);
    _initRail(root);
    _initArtDrag(root);
    _initVM();
    _initTeam(root);
    _initYearRail();
    setTimeout(() => { if (ScrollTrigger) ScrollTrigger.refresh(); }, 120);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // hero word-by-word rise
    const words = root.querySelectorAll('[data-w]');
    if (words.length) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      if (!reduced) S._tweens.push(gsap.from(words, { yPercent: 115, opacity: 0, duration: 1.05, ease: 'expo.out', stagger: 0.07, delay: 0.1 }));
    }

    // headline line-mask reveal
    root.querySelectorAll('[data-split]').forEach((el) => {
      gsap.set(el, { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1 });
      if (reduced) return;
      S._tweens.push(gsap.fromTo(el,
        { clipPath: 'inset(0 0 110% 0)', y: 26 },
        { clipPath: 'inset(0 0 -10% 0)', y: 0, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
    });

    // generic rise
    const ups = root.querySelectorAll('[data-anim="up"]');
    gsap.set(ups, { opacity: 1, y: 0 });
    if (!reduced) ups.forEach((el) => {
      S._tweens.push(gsap.from(el, { y: 34, opacity: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
    });

    // hero wordmark parallax
    const hw = root.querySelector('[data-hero-word]');
    if (hw && !reduced) {
      S._tweens.push(gsap.to(hw, { yPercent: -26, xPercent: -6, ease: 'none',
        scrollTrigger: { trigger: hw.closest('section') || hw, start: 'top top', end: 'bottom top', scrub: true } }));
    }

    // counters
    root.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseFloat(el.getAttribute('data-count')) || 0;
      const dec = target % 1 !== 0 ? 1 : 0;
      el.textContent = reduced ? target.toFixed(dec) : '0';
      if (reduced) return;
      const o = { v: 0 };
      S._tweens.push(gsap.to(o, { v: target, duration: 1.8, ease: 'power2.out',
        onUpdate: () => { el.textContent = o.v.toFixed(dec); },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
    });

    ScrollTrigger.refresh();
    _initMagnets(root);
  }

function _initMagnets(root) {
    root.querySelectorAll('[data-magnet]').forEach((el) => {
      if (el._qvMag) return;
      el._qvMag = true;
      const enter = () => { el.style.willChange = 'transform'; };
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        if (gsap) gsap.to(el, { x: dx * 14, y: dy * 10, scale: 1.03, duration: 0.4, ease: 'power3.out' });
      };
      const leave = () => { if (gsap) gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.55, ease: 'elastic.out(1,0.5)' }); };
      el.addEventListener('pointerenter', enter);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
    });
  }

function _initCursor() {
    const dot = document.querySelector('[data-qv-cursor]');
    const label = document.querySelector('[data-qv-cursor-label]');
    if (!dot || matchMedia('(pointer:coarse)').matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      dot.style.opacity = '1';
      const hot = e.target instanceof Element ? e.target.closest('[data-cursor]') : null;
      const txt = hot ? hot.getAttribute('data-cursor') : '';
      if (txt) {
        dot.style.width = 'auto'; dot.style.height = 'auto';
        dot.style.padding = '9px 13px'; dot.style.borderRadius = '99px';
        if (label) { label.textContent = txt; label.style.opacity = '1'; }
      } else {
        dot.style.width = '14px'; dot.style.height = '14px';
        dot.style.padding = '0'; dot.style.borderRadius = '50%';
        if (label) { label.style.opacity = '0'; }
      }
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      dot.style.transform = 'translate3d(' + (cx - 7) + 'px,' + (cy - 7) + 'px,0)';
    };
    addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(tick);
    S._cursorOff = () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }

function _initProgress() {
    const bar = document.querySelector('[data-qv-progress]');
    if (!bar) return;
    const on = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
    };
    addEventListener('scroll', on, { passive: true });
    on();
    S._progressOff = () => removeEventListener('scroll', on);
  }

  // ---------- helpers ----------



function _railOff() {
    if (S._railHandler) {
      removeEventListener('scroll', S._railHandler);
      removeEventListener('resize', S._railHandler);
      S._railHandler = null;
    }
    cancelAnimationFrame(S._railRaf);
    S._railRaf = 0;
  }

function _initRail(root) {
    _railOff();
    const sec = document.querySelector('[data-rail-sec]');
    if (!sec) return;
    const track = sec.querySelector('[data-rail-track]');
    const view = track && track.parentNode;
    const prog = sec.querySelector('[data-rail-prog]');
    const count = sec.querySelector('[data-rail-count]');
    const stepEls = Array.from(sec.querySelectorAll('[data-rail-step]'));
    if (!track || !view) return;
    let target = 0, cur = 0, active = -1, running = false;

    const measure = () => {
      const r = sec.getBoundingClientRect();
      const travel = Math.max(0, track.offsetWidth - view.clientWidth);
      const span = sec.offsetHeight - innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      target = -p * travel;
      if (prog) prog.style.width = (p * 100).toFixed(2) + '%';
      return { p, travel };
    };

    const paint = () => {
      const mid = view.clientWidth / 2 - cur;
      let best = 0, bd = Infinity;
      stepEls.forEach((el, i) => {
        const c = el.offsetLeft;
        const d = Math.abs(c - mid + 120);
        if (d < bd) { bd = d; best = i; }
      });
      if (best !== active) {
        active = best;
        sec.setAttribute('data-ready', '');
        stepEls.forEach((el, i) => el.classList.toggle('on', i === best));
        if (count) count.textContent = '0' + (best + 1) + ' / 0' + stepEls.length;
      }
    };

    const tick = () => {
      measure();
      cur += (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.4) cur = target;
      track.style.transform = 'translate3d(' + cur.toFixed(2) + 'px,0,0)';
      paint();
      const r = sec.getBoundingClientRect();
      const near = r.bottom > -200 && r.top < innerHeight + 200;
      if (near && Math.abs(target - cur) > 0.4) { S._railRaf = requestAnimationFrame(tick); }
      else { running = false; }
    };

    S._railHandler = () => {
      measure();
      if (!running) { running = true; S._railRaf = requestAnimationFrame(tick); }
    };
    addEventListener('scroll', S._railHandler, { passive: true });
    addEventListener('resize', S._railHandler);
    measure();
    cur = target;
    track.style.transform = 'translate3d(' + cur.toFixed(2) + 'px,0,0)';
    paint();
  }

function _initArtDrag(root) {
    if (S._artOffFns) { S._artOffFns.forEach((fn) => fn()); S._artOffFns = null; }
    const scrollers = Array.from(document.querySelectorAll('[data-drag]'));
    if (!scrollers.length) return;
    const offs = [];
    scrollers.forEach((sc) => {
    let down = false, sx = 0, sl = 0, moved = 0;
    const onDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      down = true; moved = 0; sx = e.clientX; sl = sc.scrollLeft;
      sc.setAttribute('data-dragging', '');
      sc.style.cursor = 'grabbing';
    };
    const onMove = (e) => {
      if (!down) return;
      const dx = e.clientX - sx;
      moved = Math.max(moved, Math.abs(dx));
      sc.scrollLeft = sl - dx;
      if (moved > 4) e.preventDefault();
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      sc.removeAttribute('data-dragging');
      sc.style.cursor = 'grab';
    };
    sc.addEventListener('pointerdown', onDown);
    addEventListener('pointermove', onMove, { passive: false });
    addEventListener('pointerup', onUp);
    addEventListener('pointercancel', onUp);
    offs.push(() => sc.removeEventListener('pointerdown', onDown));
    offs.push(() => removeEventListener('pointermove', onMove));
    offs.push(() => removeEventListener('pointerup', onUp));
    offs.push(() => removeEventListener('pointercancel', onUp));

    const host = sc.closest('section');
    const next = host && host.querySelector('[data-art-next]');
    if (next) {
      const step = () => {
        const card = sc.querySelector('[data-art]');
        const w = card ? card.getBoundingClientRect().width + 20 : 360;
        const atEnd = sc.scrollLeft + sc.clientWidth >= sc.scrollWidth - 8;
        sc.scrollBy({ left: atEnd ? -sc.scrollLeft : w, behavior: 'smooth' });
      };
      next.addEventListener('click', step);
      offs.push(() => next.removeEventListener('click', step));
    }
    });
    S._artOffFns = offs;
  }

function _vmOff() {
    if (S._vmST) { S._vmST.kill(); S._vmST = null; }
  }

function _initVM() {
    _vmOff();
    const sec = document.querySelector('[data-vm-sec]');
    if (!sec || !ScrollTrigger) return;
    const bgs = Array.from(sec.querySelectorAll('[data-vm-bg]'));
    const slides = Array.from(sec.querySelectorAll('[data-vm-slide]'));
    const pasts = Array.from(sec.querySelectorAll('[data-vm-past]'));
    if (!slides.length) return;
    const n = slides.length;
    let last = -1;
    const apply = (p01) => {
      const p = Math.min(0.9999, Math.max(0, p01)) * n;
      const idx = Math.min(n - 1, Math.floor(p));
      const a = Math.min(1, (p - idx) / 0.42);
      if (idx !== last) {
        last = idx;
        bgs.forEach((el, i) => { el.style.opacity = i === idx ? '1' : '0'; });
        pasts.forEach((el, i) => { el.style.opacity = i < idx ? '1' : '0'; });
      }
      slides.forEach((el, i) => {
        if (i !== idx) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(54px)';
          el.style.pointerEvents = 'none';
        } else {
          el.style.opacity = (0.42 + 0.58 * a).toFixed(3);
          el.style.transform = 'translateY(' + ((1 - a) * 54).toFixed(1) + 'px)';
          el.style.pointerEvents = 'auto';
        }
      });
    };
    S._vmST = ScrollTrigger.create({
      trigger: sec,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => apply(self.progress),
      onRefresh: (self) => apply(self.progress),
    });
    apply(S._vmST.progress || 0);
  }

function _teamOff() {
    if (S._teamOffFns) { S._teamOffFns.forEach((fn) => fn()); S._teamOffFns = null; }
  }

function _initTeam(root) {
    _teamOff();
    const wrap = document.querySelector('[data-team-wrap]');
    if (!wrap) return;
    const strip = wrap.querySelector('[data-team-strip]');
    const cards = Array.from(wrap.querySelectorAll('[data-team-card]'));
    const bios = Array.from(wrap.querySelectorAll('[data-team-bio]'));
    const count = wrap.querySelector('[data-team-count]');
    if (!strip || !cards.length) return;
    let i = S._teamIdx || 0;
    const pad = (n) => (n < 10 ? '0' + n : '' + n);
    const show = (n) => {
      i = Math.max(0, Math.min(cards.length - 1, n));
      S._teamIdx = i;
      wrap.setAttribute('data-ready', '');
      cards.forEach((el, k) => el.classList.toggle('on', k === i));
      bios.forEach((el, k) => el.classList.toggle('on', k === i));
      if (count) count.textContent = pad(i + 1) + ' / ' + pad(cards.length);
      strip.scrollTo({ left: Math.max(0, cards[i].offsetLeft - strip.offsetLeft), behavior: 'smooth' });
    };
    const offs = [];
    const next = wrap.querySelector('[data-team-next]');
    const prev = wrap.querySelector('[data-team-prev]');
    const onNext = () => show(i + 1 >= cards.length ? 0 : i + 1);
    const onPrev = () => show(i - 1 < 0 ? cards.length - 1 : i - 1);
    if (next) { next.addEventListener('click', onNext); offs.push(() => next.removeEventListener('click', onNext)); }
    if (prev) { prev.addEventListener('click', onPrev); offs.push(() => prev.removeEventListener('click', onPrev)); }
    cards.forEach((el, k) => {
      const pick = () => show(k);
      el.addEventListener('click', pick);
      el.setAttribute('data-cursor', 'View');
      offs.push(() => el.removeEventListener('click', pick));
    });
    S._teamOffFns = offs;
    show(i);
  }

function _yrOff() {
    if (S._yrST) { S._yrST.kill(); S._yrST = null; }
    cancelAnimationFrame(S._yrRaf);
    S._yrRaf = 0;
  }

function _initYearRail() {
    _yrOff();
    const sec = document.querySelector('[data-yr-sec]');
    if (!sec || !ScrollTrigger) return;
    const track = sec.querySelector('[data-yr-track]');
    const view = track && track.parentNode;
    if (!track || !view) return;
    let target = 0, cur = 0, running = false;
    const set = (p) => {
      const travel = Math.max(0, track.offsetWidth - view.clientWidth);
      target = -Math.min(1, Math.max(0, p)) * travel;
    };
    const tick = () => {
      cur += (target - cur) * 0.14;
      if (Math.abs(target - cur) < 0.4) cur = target;
      track.style.transform = 'translate3d(' + cur.toFixed(2) + 'px,0,0)';
      if (Math.abs(target - cur) > 0.4) { S._yrRaf = requestAnimationFrame(tick); }
      else { running = false; }
    };
    const kick = () => { if (!running) { running = true; S._yrRaf = requestAnimationFrame(tick); } };
    S._yrST = ScrollTrigger.create({
      trigger: sec,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => { set(self.progress); kick(); },
      onRefresh: (self) => { set(self.progress); cur = target; track.style.transform = 'translate3d(' + cur.toFixed(2) + 'px,0,0)'; },
    });
    set(S._yrST.progress || 0);
    cur = target;
    track.style.transform = 'translate3d(' + cur.toFixed(2) + 'px,0,0)';
  }

function _svcSyncOff() {
    if (!S._svcHandler) return;
    removeEventListener('scroll', S._svcHandler);
    removeEventListener('resize', S._svcHandler);
    S._svcHandler = null;
  }

function _initSvcTrack(root) {
    _svcSyncOff();
    const col = document.querySelector('[data-svc-col]');
    if (!col) return;
    const slides = Array.from(col.querySelectorAll('[data-svc-slide]'));
    const faces = Array.from(col.querySelectorAll('[data-svc-face]'));
    if (!slides.length || !faces.length) return;
    let cur = -1;
    const apply = () => {
      const mid = innerHeight / 2;
      let best = 0, bd = Infinity;
      slides.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bd) { bd = d; best = i; }
      });
      if (best === cur) return;
      cur = best;
      col.setAttribute('data-ready', '');
      slides.forEach((el, i) => el.classList.toggle('on', i === best));
      faces.forEach((el) => {
        const group = Array.from(el.parentNode.children);
        el.classList.toggle('on', group.indexOf(el) === best);
      });
    };
    S._svcHandler = () => {
      cancelAnimationFrame(S._svcRaf);
      S._svcRaf = requestAnimationFrame(apply);
    };
    addEventListener('scroll', S._svcHandler, { passive: true });
    addEventListener('resize', S._svcHandler);
    apply();
  }


/** Cursor + scroll progress: mounted once, like the original's componentDidMount. */
export function startGlobalMotion() {
  _initCursor();
  _initProgress();
  return () => {
    S._cursorOff && S._cursorOff();
    S._progressOff && S._progressOff();
  };
}

/**
 * Per-page motion. Call on mount and on every route change - the original called
 * _boot() from componentDidUpdate for exactly this reason.
 */
export function runPageMotion() {
  _animate();
  return () => {
    _svcSyncOff();
    _railOff();
    _teamOff();
    _vmOff();
    _yrOff();
    if (S._artOffFns) { S._artOffFns.forEach((fn) => fn()); S._artOffFns = null; }
    _killScroll();
  };
}
