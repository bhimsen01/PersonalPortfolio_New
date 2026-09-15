(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (root.classList.contains('preload')) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove('preload'));
    });
  }

  const toggle = document.getElementById('themeToggle');

  function syncTheme() {
    toggle.classList.toggle('is-dark', root.classList.contains('dark'));
  }
  syncTheme();

  toggle.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
    syncTheme();
  });

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Toggle menu');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Toggle menu');
    });
  });

  const siteNav = document.querySelector('.site-nav');
  function onNavScroll() {
    siteNav.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onNavScroll();
  window.addEventListener('scroll', onNavScroll, { passive: true });

  function primeConnectors(svg) {
    svg.querySelectorAll('path.connector').forEach(p => {
      const len = Math.ceil(p.getTotalLength());
      p.style.transition = 'none';
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.getBoundingClientRect();
      p.style.transition = '';
    });
  }
  function drawConnectors(svg) {
    svg.querySelectorAll('path.connector').forEach(p => {
      p.style.strokeDashoffset = '0';
    });
  }
  if (!reduceMotion) {
    document.querySelectorAll('.arch-panel:not([hidden]) .arch-diagram').forEach(primeConnectors);
  }

  const tabs = Array.from(document.querySelectorAll('.approach-tab'));
  const thumb = document.getElementById('approachThumb');

  function placeThumb(tab) {
    if (!thumb || !tab) return;
    thumb.style.width = tab.offsetWidth + 'px';
    thumb.style.transform = `translateX(${tab.offsetLeft}px)`;
  }

  function selectTab(tab) {
    tabs.forEach(t => {
      const active = t === tab;
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
      const pane = document.getElementById(t.getAttribute('aria-controls'));
      if (!pane) return;
      if (active) {
        pane.hidden = false;
        pane.classList.add('is-active');
        if (!reduceMotion) {
          primeConnectors(pane);
          requestAnimationFrame(() => drawConnectors(pane));
        }
      } else {
        pane.hidden = true;
        pane.classList.remove('is-active');
      }
    });
    placeThumb(tab);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', e => {
      const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (dir) {
        e.preventDefault();
        const next = tabs[(i + dir + tabs.length) % tabs.length];
        next.focus();
        selectTab(next);
      }
    });
  });

  if (tabs.length) {
    const initial = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
    placeThumb(initial);
    window.addEventListener('resize', () => {
      const current = tabs.find(t => t.getAttribute('aria-selected') === 'true');
      placeThumb(current);
    }, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => placeThumb(initial));
  }

  document.querySelectorAll('.work-entry').forEach(entry => {
    const btn = entry.querySelector('.work-toggle');
    btn.addEventListener('click', () => {
      const open = !entry.classList.contains('is-open');
      entry.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
      if (entry.isIntersecting) {
        const svg = entry.target.querySelector('.arch-diagram');
        if (svg) drawConnectors(svg);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  if (reduceMotion) return;

  document.body.classList.add('js-anim');

  const heroLayers = [
    { el: document.querySelector('.hero-kicker'),     rate: 0.10 },
    { el: document.querySelector('.hero h1'),         rate: 0.16 },
    { el: document.querySelector('.hero-lede'),       rate: 0.22 },
    { el: document.querySelector('.hero-experience'), rate: 0.28 },
    { el: document.querySelector('.status-row'),      rate: 0.34 },
  ].filter(l => l.el);

  const heroSection = document.querySelector('.hero');
  let parallaxTicking = false;

  function updateHeroParallax() {
    parallaxTicking = false;
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) return; // out of view, do nothing
    const y = Math.max(0, -rect.top);
    heroLayers.forEach(({ el, rate }) => {
      el.style.transform = `translate3d(0, ${(-y * rate).toFixed(1)}px, 0)`;
    });
  }

  if (heroLayers.length) {
    window.setTimeout(() => {
      heroLayers.forEach(({ el }) => { el.style.transitionProperty = 'opacity'; });
      updateHeroParallax();
      window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
          parallaxTicking = true;
          requestAnimationFrame(updateHeroParallax);
        }
      }, { passive: true });
    }, 900);
  }
})();