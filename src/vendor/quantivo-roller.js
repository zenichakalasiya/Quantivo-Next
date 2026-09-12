// Vendored from Quantivo.dc.html sibling quantivo-roller.js - vanilla custom element,
// intentionally NOT rewritten as React. Only change: the three.js dynamic import now
// resolves to the pinned npm package instead of the jsDelivr URL (same version, 0.160.0).
// <quantivo-roller> — bent-plane card drum. Reads child [data-title] elements as cards.
(function () {
    const PALETTE = { a: '#4461C8', b: '#6B3FA0' };

  function readCards(host) {
    return Array.from(host.querySelectorAll('[data-title]')).map((el) => ({
      num: el.getAttribute('data-num') || '',
      title: el.getAttribute('data-title') || '',
      tag: el.getAttribute('data-tag') || '',
    }));
  }

  function cardTexture(THREE, card, light) {
    const W = 620, H = 840, R = 28;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d');

    x.fillStyle = light ? '#FFFFFF' : '#15151B';
    x.beginPath(); x.roundRect(0, 0, W, H, R); x.fill();

    const g = x.createLinearGradient(0, H * 0.35, W, H);
    g.addColorStop(0, PALETTE.a); g.addColorStop(1, PALETTE.b);

    // top rule + number
    x.strokeStyle = light ? '#DEDAD2' : '#2A2A33';
    x.lineWidth = 2;
    x.beginPath(); x.moveTo(48, 150); x.lineTo(W - 48, 150); x.stroke();
    x.fillStyle = g;
    x.font = '400 92px "Bebas Neue", sans-serif';
    x.textBaseline = 'alphabetic';
    x.fillText(card.num, 48, 124);

    // title, wrapped, bottom-aligned
    x.fillStyle = light ? '#0F0F12' : '#F4F4F6';
    x.font = '400 104px "Bebas Neue", sans-serif';
    const words = card.title.toUpperCase().split(' ');
    const lines = [];
    let line = '';
    for (const w of words) {
      const t = line ? line + ' ' + w : w;
      if (x.measureText(t).width > W - 96 && line) { lines.push(line); line = w; } else { line = t; }
    }
    if (line) lines.push(line);
    const lh = 96;
    let y = H - 168 - (lines.length - 1) * lh;
    for (const l of lines) { x.fillText(l, 48, y); y += lh; }

    x.fillStyle = light ? '#55555F' : '#9A9AA8';
    x.font = '500 30px Manrope, sans-serif';
    x.fillText(card.tag, 48, H - 96);

    x.fillStyle = g;
    x.beginPath(); x.roundRect(48, H - 64, 120, 8, 4); x.fill();

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }

  class QuantivoRoller extends HTMLElement {
    connectedCallback() {
      if (this._booted) return;
      this._booted = true;
      this.style.display = 'block';
      this.style.width = '100%';
      this.style.height = '100%';
      this._waitForCards(0);
    }

    _waitForCards(tries) {
      const cards = readCards(this);
      if (cards.length) { this._init(cards); return; }
      if (tries > 90) return;
      requestAnimationFrame(() => this._waitForCards(tries + 1));
    }

    // ---------- CSS 3D fallback (no WebGL) ----------
    _initCSS(cards) {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const stage = document.createElement('div');
      stage.style.cssText = 'position:absolute;inset:0;perspective:1400px;overflow:hidden;touch-action:pan-y';
      const drum = document.createElement('div');
      drum.style.cssText = 'position:absolute;left:50%;top:50%;width:0;height:0;transform-style:preserve-3d';
      stage.appendChild(drum);
      this.appendChild(stage);
      this.style.cursor = 'grab';

      const n = cards.length;
      const avail = Math.max(200, (this.clientHeight || 400) - 40);
      const CH = Math.min(268, Math.round(avail / 1.32));
      const CW = Math.round(CH * 0.73);
      const R = Math.round((CW * 1.28) / (2 * Math.tan(Math.PI / n)));
      const fs = Math.max(19, Math.round(CH * 0.112));
      const faces = cards.map((c, i) => {
        const el = document.createElement('div');
        el.style.cssText =
          'position:absolute;left:' + (-CW / 2) + 'px;top:' + (-CH / 2) + 'px;width:' + CW + 'px;height:' + CH + 'px;' +
          'border-radius:14px;padding:16px;box-sizing:border-box;' +
          'display:flex;flex-direction:column;gap:8px;backface-visibility:hidden;overflow:hidden;' +
          'transition:box-shadow .4s ease';
        const num = document.createElement('div');
        num.textContent = c.num;
        num.style.cssText = "font-family:'Bebas Neue',sans-serif;font-size:" + fs + "px;line-height:1;background:linear-gradient(100deg,#4461C8,#6B3FA0);-webkit-background-clip:text;background-clip:text;color:transparent";
        const rule = document.createElement('div');
        rule.style.cssText = 'height:1px;background:#2A2A33';
        const title = document.createElement('div');
        title.textContent = c.title.toUpperCase();
        title.style.cssText = "margin-top:auto;font-family:'Bebas Neue',sans-serif;font-size:" + fs + "px;line-height:.96";
        const tag = document.createElement('div');
        tag.textContent = c.tag;
        tag.style.cssText = 'font-family:Manrope,sans-serif;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase';
        const bar = document.createElement('div');
        bar.style.cssText = 'width:38px;height:3px;border-radius:2px;background:linear-gradient(100deg,#4461C8,#6B3FA0)';
        const scrim = document.createElement('div');
        scrim.style.cssText = 'position:absolute;inset:0;border-radius:14px;pointer-events:none;opacity:0';
        el.append(num, rule, title, tag, bar, scrim);
        drum.appendChild(el);
        return { el, num, rule, title, tag, scrim, a: (i / n) * Math.PI * 2, phase: i * 0.9 };
      });

      const applyTheme = () => {
        const lightNow = document.documentElement.dataset.qv === 'light';
        for (const f of faces) {
          f.el.style.background = lightNow ? '#FFFFFF' : '#15151B';
          f.el.style.border = '1px solid ' + (lightNow ? '#DDD8CF' : '#2A2A33');
          f.el.style.boxShadow = lightNow ? '0 22px 50px rgba(20,18,14,.16)' : '0 24px 60px rgba(0,0,0,.45)';
          f.title.style.color = lightNow ? '#0F0F12' : '#F4F4F6';
          f.tag.style.color = lightNow ? '#55555F' : '#9A9AA8';
          f.rule.style.background = lightNow ? '#DDD8CF' : '#2A2A33';
          f.scrim.style.background = lightNow ? '#F3F0EA' : '#0F0F12';
        }
      };
      applyTheme();
      const mo = new MutationObserver(applyTheme);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-qv'] });

      let spin = 0, vel = reduced ? 0 : -0.16, dragging = false, lastX = 0;
      const down = (e) => { dragging = true; lastX = e.clientX; vel = 0; this.style.cursor = 'grabbing'; stage.setPointerCapture && stage.setPointerCapture(e.pointerId); };
      const move = (e) => { if (!dragging) return; const dx = e.clientX - lastX; lastX = e.clientX; spin += dx * 0.0055; vel = dx * 0.055; };
      const up = () => { dragging = false; this.style.cursor = 'grab'; };
      stage.addEventListener('pointerdown', down);
      addEventListener('pointermove', move, { passive: true });
      addEventListener('pointerup', up);

      let visible = true;
      const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { threshold: 0.01 });
      io.observe(this);

      let raf = 0, prev = performance.now();
      const tick = (now) => {
        raf = requestAnimationFrame(tick);
        const dt = Math.min((now - prev) / 1000, 0.05); prev = now;
        if (!visible) return;
        if (!dragging) { vel += (((reduced ? 0 : -0.16) - vel)) * dt * 1.5; spin += vel * dt; }
        for (const f of faces) {
          const ang = f.a + spin;
          const deg = (ang * 180) / Math.PI;
          const y = reduced ? 0 : Math.sin(now / 1000 * 0.7 + f.phase) * 9;
          const front = Math.cos(ang);
          f.el.style.transform = 'rotateY(' + deg + 'deg) translateZ(' + R + 'px) translateY(' + y + 'px)';
          f.scrim.style.opacity = String(0.66 * (1 - Math.max(0, front)));
          f.el.style.visibility = front > 0.02 ? 'visible' : 'hidden';
          f.el.style.zIndex = String(Math.round(front * 100));
        }
        drum.style.transform = 'rotateX(-5deg) translateY(-14px)';
      };
      raf = requestAnimationFrame(tick);
      this._cleanup = () => {
        cancelAnimationFrame(raf); io.disconnect(); mo.disconnect();
        removeEventListener('pointermove', move); removeEventListener('pointerup', up);
        stage.remove();
      };
    }

    async _init(cards) {
      let THREE;
      try { THREE = await import('three'); } catch (e) { this._initCSS(cards); return; }
      if (!this.isConnected) return;
      try { await document.fonts.load('400 100px "Bebas Neue"'); await document.fonts.load('500 30px Manrope'); } catch (e) {}

      const light = document.documentElement.dataset.qv === 'light';
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 8.6);

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch (e) { this._initCSS(cards); return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
      renderer.setClearAlpha(0);
      renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y';
      this.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, light ? 2.1 : 1.35));
      const key = new THREE.DirectionalLight(0xffffff, light ? 1.1 : 1.5);
      key.position.set(2.5, 3.5, 5); scene.add(key);
      const p1 = new THREE.PointLight(0x4461c8, 60, 22); p1.position.set(-5, 1.5, 3); scene.add(p1);
      const p2 = new THREE.PointLight(0x6b3fa0, 55, 22); p2.position.set(5, -1.5, 3); scene.add(p2);

      const RAD = 4.05;
      const group = new THREE.Group();
      group.rotation.x = -0.09;
      scene.add(group);

      const geo = new THREE.PlaneGeometry(2.05, 2.78, 40, 2);
      const pos = geo.attributes.position;
      const bendR = 5.6;
      for (let i = 0; i < pos.count; i++) {
        const x0 = pos.getX(i), th = x0 / bendR;
        pos.setX(i, bendR * Math.sin(th));
        pos.setZ(i, pos.getZ(i) - (bendR - bendR * Math.cos(th)));
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();

      const meshes = [];
      cards.forEach((card, i) => {
        const tex = cardTexture(THREE, card, light);
        const mat = new THREE.MeshStandardMaterial({
          map: tex, roughness: 0.62, metalness: 0.05,
          side: THREE.DoubleSide, transparent: true,
        });
        const pivot = new THREE.Object3D();
        pivot.rotation.y = (i / cards.length) * Math.PI * 2;
        const m = new THREE.Mesh(geo, mat);
        m.position.z = RAD;
        m.rotation.z = (i % 2 ? 1 : -1) * 0.035;
        pivot.add(m);
        group.add(pivot);
        meshes.push({ pivot, mesh: m, base: m.position.z, phase: i * 0.9, hoverT: 0 });
      });

      const mo = new MutationObserver(() => {
        const lightNow = document.documentElement.dataset.qv === 'light';
        meshes.forEach((m, i) => {
          m.mesh.material.map?.dispose();
          m.mesh.material.map = cardTexture(THREE, cards[i], lightNow);
          m.mesh.material.needsUpdate = true;
        });
      });
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-qv'] });

      const ray = new THREE.Raycaster();
      const ndc = new THREE.Vector2(2, 2);
      let hovered = null;

      // ---- input: drag to spin, wheel-free
      let spin = 0, vel = reduced ? 0 : -0.16, dragging = false, lastX = 0, moved = 0;
      const el = renderer.domElement;
      const down = (e) => { dragging = true; moved = 0; lastX = e.clientX; vel = 0; el.setPointerCapture?.(e.pointerId); this.style.cursor = 'grabbing'; };
      const move = (e) => {
        const r = el.getBoundingClientRect();
        ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
        if (!dragging) return;
        const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
        spin += dx * 0.0055; vel = dx * 0.055;
      };
      const up = () => { dragging = false; this.style.cursor = 'grab'; };
      el.addEventListener('pointerdown', down);
      addEventListener('pointermove', move, { passive: true });
      addEventListener('pointerup', up);
      el.addEventListener('pointerleave', () => { ndc.set(2, 2); });
      this.style.cursor = 'grab';

      let visible = true;
      const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { threshold: 0.01 });
      io.observe(this);

      const resize = () => {
        const w = this.clientWidth || 1, h = this.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.position.z = w / h < 0.9 ? 11.4 : 8.6;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize); ro.observe(this);
      resize();

      let raf = 0, prev = performance.now();
      const tick = (now) => {
        raf = requestAnimationFrame(tick);
        const dt = Math.min((now - prev) / 1000, 0.05); prev = now;
        if (!visible) return;

        if (!dragging) {
          vel += (((reduced ? 0 : -0.16) - vel)) * dt * 1.5;
          spin += vel * dt;
        }
        group.rotation.y = spin;

        ray.setFromCamera(ndc, camera);
        const hit = ray.intersectObjects(meshes.map((m) => m.mesh), false)[0];
        hovered = hit ? hit.object : null;

        for (const m of meshes) {
          const isHot = !dragging && m.mesh === hovered;
          m.hoverT += ((isHot ? 1 : 0) - m.hoverT) * dt * 7;
          const bob = reduced ? 0 : Math.sin(now / 1000 * 0.7 + m.phase) * 0.11;
          m.mesh.position.y = bob + m.hoverT * 0.16;
          m.mesh.position.z = m.base + m.hoverT * 0.42;
          const s = 1 + m.hoverT * 0.05;
          m.mesh.scale.set(s, s, s);
          m.mesh.material.opacity = 1;
        }
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(tick);

      this._cleanup = () => {
        cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); mo.disconnect();
        removeEventListener('pointermove', move); removeEventListener('pointerup', up);
        meshes.forEach((m) => { m.mesh.material.map?.dispose(); m.mesh.material.dispose(); });
        geo.dispose(); renderer.dispose();
      };
    }

    disconnectedCallback() { this._cleanup?.(); this._booted = false; }
  }

  if (!customElements.get('quantivo-roller')) customElements.define('quantivo-roller', QuantivoRoller);
})();

// Marks this file as an ES module so TypeScript/bundlers accept the dynamic import.
// The IIFE above still executes on import and registers the custom element.
export {};
