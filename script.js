(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
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

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Nav scroll state ---------- */
  const siteNav = document.querySelector('.site-nav');
  function onNavScroll() {
    siteNav.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onNavScroll();
  window.addEventListener('scroll', onNavScroll, { passive: true });

  if (reduceMotion) return; // everything below is decorative motion only

  root.classList.add('js-anim');

  /* ---------- Architecture diagram line-draw ---------- */
  function primeConnectors(svg) {
    svg.querySelectorAll('path.connector').forEach(p => {
      const len = Math.ceil(p.getTotalLength());
      p.style.transition = 'none';
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.getBoundingClientRect(); // force the browser to commit the instant state
      p.style.transition = '';   // re-enable the CSS transition for the draw-in
    });
  }
  function drawConnectors(svg) {
    svg.querySelectorAll('path.connector').forEach(p => {
      p.style.strokeDashoffset = '0';
    });
  }
  document.querySelectorAll('.arch-diagram').forEach(primeConnectors);

  /* ---------- Scroll reveals ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        const svg = entry.target.querySelector('.arch-diagram');
        if (svg) drawConnectors(svg);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* ---------- Hero parallax (single orchestrated moment) ---------- */
  const heroWrap = document.querySelector('.hero .wrap');
  let ticking = false;

  function updateHeroParallax() {
    const y = window.scrollY;
    const fade = Math.max(0, 1 - y / 480);
    const shift = Math.min(y * 0.12, 55);
    heroWrap.style.transform = `translateY(${shift}px)`;
    heroWrap.style.opacity = fade;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeroParallax);
      ticking = true;
    }
  }, { passive: true });
})();
