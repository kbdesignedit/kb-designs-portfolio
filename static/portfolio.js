(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const header = document.getElementById('siteHeader');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('siteMenu');
  const filters = [...document.querySelectorAll('.filter-button')];
  const cards = [...document.querySelectorAll('.project-card')];
  const drawerShell = document.getElementById('drawerShell');
  const drawer = document.getElementById('projectDrawer');
  const drawerImage = document.getElementById('drawerImage');
  const drawerCategory = document.getElementById('drawerCategory');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerSummary = document.getElementById('drawerSummary');
  const drawerRole = document.getElementById('drawerRole');
  const drawerTools = document.getElementById('drawerTools');
  const drawerOutcome = document.getElementById('drawerOutcome');
  const pageSiblings = [...document.body.children].filter(element => element !== drawerShell && element.tagName !== 'SCRIPT');
  let lastTrigger = null;
  let closeTimer = null;

  document.documentElement.classList.add('js-motion-ready');
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  const closeMenu = () => {
    menuButton?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    nav?.classList.remove('is-open');
    body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    body.classList.toggle('menu-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  window.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', window.scrollY > 32), {passive: true});

  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(item => {
      const isCurrent = item === button;
      item.classList.toggle('is-active', isCurrent);
      item.setAttribute('aria-pressed', String(isCurrent));
    });
    cards.forEach(card => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-filtered-out', !visible);
    });
  }));

  const setPageInert = value => {
    pageSiblings.forEach(element => {
      if (value) element.setAttribute('inert', '');
      else element.removeAttribute('inert');
    });
  };

  const getDrawerFocusable = () => [...drawer.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter(element => !element.hasAttribute('hidden'));

  const closeDrawer = () => {
    if (!drawerShell.classList.contains('is-open')) return;
    drawerShell.classList.remove('is-open');
    drawerShell.setAttribute('aria-hidden', 'true');
    setPageInert(false);
    body.classList.remove('drawer-open');
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => drawerShell.setAttribute('inert', ''), reduceMotion ? 0 : 450);
    window.setTimeout(() => lastTrigger?.focus(), reduceMotion ? 0 : 180);
  };

  const openDrawer = (slug, trigger) => {
    const project = window.KB_PROJECTS?.find(item => item.slug === slug);
    if (!project) return;
    window.clearTimeout(closeTimer);
    lastTrigger = trigger;
    drawerImage.src = project.image;
    drawerImage.alt = project.alt;
    drawerCategory.textContent = project.category;
    drawerTitle.textContent = project.title;
    drawerSummary.textContent = project.summary;
    drawerRole.textContent = project.role;
    drawerTools.textContent = project.tools;
    drawerOutcome.textContent = project.outcome;
    drawerShell.removeAttribute('inert');
    setPageInert(true);
    drawerShell.classList.add('is-open');
    drawerShell.setAttribute('aria-hidden', 'false');
    body.classList.add('drawer-open');
    window.setTimeout(() => getDrawerFocusable()[0]?.focus(), reduceMotion ? 0 : 100);
  };

  cards.forEach(card => card.addEventListener('click', () => openDrawer(card.dataset.project, card)));
  drawerShell?.querySelectorAll('[data-close-drawer]').forEach(button => button.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (drawerShell?.classList.contains('is-open')) closeDrawer();
      else if (nav?.classList.contains('is-open')) closeMenu();
      return;
    }
    if (event.key !== 'Tab' || !drawerShell?.classList.contains('is-open')) return;
    const focusable = getDrawerFocusable();
    if (!focusable.length) {
      event.preventDefault();
      drawer.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === drawer)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const revealElements = [...document.querySelectorAll('.js-reveal')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(element => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12, rootMargin: '0px 0px -24px'});
    revealElements.forEach(element => observer.observe(element));
  }
})();
