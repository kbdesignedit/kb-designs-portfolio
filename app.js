(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const body = document.body;
  const projects = Array.isArray(window.KB_PROJECTS) ? window.KB_PROJECTS : [];
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  document.documentElement.classList.add('js');
  const pad = value => String(value).padStart(2, '0');

  requestAnimationFrame(() => setTimeout(() => {
    body.classList.add('loaded');
    document.documentElement.classList.add('loaded');
  }, 80));

  const grid = $('#grid');
  const index = $('#index');
  const work = $('#work');
  const filterButtons = $$('#filters .chip');
  const viewButtons = $$('.views button');
  const drawer = $('#drawer');
  const drawerContent = $('#dContent');
  const shell = $('#site-shell');
  const scrim = $('#scrim');
  let currentProject = 0;
  let previousFocus = null;
  let oldOverflow = '';

  function fillProject(position) {
    if (!drawer || !drawerContent || !projects.length) return;
    currentProject = (position + projects.length) % projects.length;
    const project = projects[currentProject];
    const previous = projects[(currentProject - 1 + projects.length) % projects.length];
    const next = projects[(currentProject + 1) % projects.length];

    $('#dCount').textContent = `Project ${pad(currentProject + 1)} / ${pad(projects.length)} · ${project.kind}`;
    drawerContent.innerHTML = `
      <div class="d-img"><img src="${project.img}" alt="${project.title}" style="object-position:${project.pos || 'center'}"></div>
      <div class="d-body">
        <span class="eyebrow">${project.client}</span>
        <h2 id="dTitle">${project.title}</h2>
        <span class="script">${project.line}</span>
        ${(project.body || []).map(paragraph => `<p>${paragraph}</p>`).join('')}
        <dl class="d-meta">
          <div><dt>Role</dt><dd>${project.role}</dd></div>
          <div><dt>Tools</dt><dd>${project.tools}</dd></div>
          <div class="wide"><dt>Method</dt><dd>${project.method}</dd></div>
          <div class="wide"><dt>Outcome</dt><dd>${project.outcome}</dd></div>
        </dl>
        <div class="d-tags">${(project.tags || []).map(tag => `<span>${tag}</span>`).join('')}</div>
        ${project.extra ? `<div class="d-extra"><img src="${project.extra}" alt="${project.title} — additional view" loading="lazy"></div>` : ''}
        ${project.pdf ? `<div class="d-extra"><a class="btn btn-solid" href="${project.pdf.href}" target="_blank" rel="noopener">${project.pdf.label} <span class="arr">↗</span></a></div>` : ''}
      </div>`;
    $('#dPrevT').textContent = previous.title;
    $('#dNextT').textContent = next.title;
    drawer.scrollTop = 0;
  }

  function openProject(position) {
    if (!drawer || !projects.length) return;
    previousFocus = document.activeElement;
    fillProject(position);
    oldOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    body.classList.add('drawer-open');
    drawer.inert = false;
    drawer.setAttribute('aria-hidden', 'false');
    scrim?.setAttribute('aria-hidden', 'false');
    if (shell) {
      shell.inert = true;
      shell.setAttribute('aria-hidden', 'true');
    }
    requestAnimationFrame(() => $('#dClose')?.focus());
  }

  function closeProject() {
    if (!drawer) return;
    body.classList.remove('drawer-open');
    body.style.overflow = oldOverflow;
    drawer.setAttribute('aria-hidden', 'true');
    drawer.inert = true;
    scrim?.setAttribute('aria-hidden', 'true');
    if (shell) {
      shell.inert = false;
      shell.removeAttribute('aria-hidden');
    }
    if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
  }

  if (grid && index && work && projects.length) {
    grid.innerHTML = projects.map((project, position) => `
      <article class="card c${position + 1} rv" data-cat="${project.cat}" data-i="${position}" tabindex="0" role="button" aria-label="Open ${project.title}">
        <div class="ph"><img src="${project.img}" alt="${project.title} — ${project.sub}" loading="lazy" style="object-position:${project.pos || 'center'}"></div>
        <div class="cap"><span class="no">${pad(position + 1)}</span><h3>${project.title}</h3><span class="kind">${project.kind}</span><p class="sub">${project.sub}</p></div>
      </article>`).join('');

    index.innerHTML = projects.map((project, position) => `
      <div class="row" data-cat="${project.cat}" data-i="${position}" tabindex="0" role="button" aria-label="Open ${project.title}">
        <span class="no">${pad(position + 1)}</span><h3>${project.title}</h3><span>${project.kind}</span><span>${project.client}</span><span class="go" aria-hidden="true">→</span>
      </div>`).join('');

    function applyFilter(activeButton) {
      filterButtons.forEach(button => {
        const active = button === activeButton;
        button.classList.toggle('on', active);
        button.setAttribute('aria-pressed', String(active));
      });
      const category = activeButton?.dataset.f || 'all';
      grid.classList.toggle('filtered', category !== 'all');
      $$('.card, .row', work).forEach(item => item.classList.toggle('out', category !== 'all' && item.dataset.cat !== category));
      $$('.card:not(.out)', grid).forEach(card => card.classList.add('in'));
    }
    filterButtons.forEach(button => button.addEventListener('click', () => applyFilter(button)));

    viewButtons.forEach(button => button.addEventListener('click', () => {
      viewButtons.forEach(view => {
        const active = view === button;
        view.classList.toggle('on', active);
        view.setAttribute('aria-pressed', String(active));
      });
      work.classList.toggle('list', button.dataset.v === 'list');
      try { localStorage.setItem('kb-view', button.dataset.v); } catch (_) { /* Storage is optional. */ }
    }));
    try {
      if (localStorage.getItem('kb-view') === 'list') $('.views [data-v="list"]')?.click();
    } catch (_) { /* Storage is optional. */ }

    $$('.card, .row', work).forEach(item => {
      item.addEventListener('click', () => openProject(Number(item.dataset.i)));
      item.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProject(Number(item.dataset.i));
        }
      });
    });

    const peek = $('#peek');
    const peekImage = $('img', peek);
    if (peek && peekImage && !reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      let x = 0, y = 0, targetX = 0, targetY = 0, animationFrame = 0;
      const animatePeek = () => {
        x += (targetX - x) * 0.2;
        y += (targetY - y) * 0.2;
        peek.style.left = `${x}px`;
        peek.style.top = `${y}px`;
        animationFrame = requestAnimationFrame(animatePeek);
      };
      $$('.row', index).forEach(row => {
        row.addEventListener('mouseenter', event => {
          peekImage.src = projects[Number(row.dataset.i)].img;
          targetX = Math.min(event.clientX + 175, window.innerWidth - 175);
          targetY = Math.min(event.clientY + 20, window.innerHeight - 110);
          x = targetX;
          y = targetY;
          peek.classList.add('on');
          cancelAnimationFrame(animationFrame);
          animatePeek();
        });
        row.addEventListener('mousemove', event => {
          targetX = Math.min(event.clientX + 175, window.innerWidth - 175);
          targetY = Math.min(event.clientY + 20, window.innerHeight - 110);
        });
        row.addEventListener('mouseleave', () => {
          peek.classList.remove('on');
          cancelAnimationFrame(animationFrame);
        });
      });
    }
  }

  $('#dClose')?.addEventListener('click', closeProject);
  scrim?.addEventListener('click', closeProject);
  $('#dPrev')?.addEventListener('click', () => fillProject(currentProject - 1));
  $('#dNext')?.addEventListener('click', () => fillProject(currentProject + 1));

  const nav = $('#nav');
  const burger = $('#burger');
  const navLinks = $('#navLinks');
  function closeMenu(restoreFocus = false) {
    if (!burger) return;
    body.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    body.style.overflow = oldOverflow;
    if (restoreFocus) burger.focus();
  }
  if (nav && burger && navLinks) {
    burger.addEventListener('click', () => {
      const opening = burger.getAttribute('aria-expanded') !== 'true';
      if (opening) {
        oldOverflow = body.style.overflow;
        body.style.overflow = 'hidden';
        body.classList.add('nav-open');
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'Close menu');
        requestAnimationFrame(() => $('a', navLinks)?.focus());
      } else {
        closeMenu(true);
      }
    });
    $$('a', navLinks).forEach(link => link.addEventListener('click', () => closeMenu(false)));
    let lastY = window.scrollY;
    const updateNav = () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 40);
      nav.classList.toggle('hide', y > 500 && y > lastY && !body.classList.contains('nav-open'));
      lastY = y;
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  const rail = $('#rail');
  const railNo = $('#railNo');
  const railName = $('#railName');
  const sections = $$('[data-rail]');
  if (rail && railNo && railName && sections.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const [number, name] = entry.target.dataset.rail.split('|');
      railNo.textContent = number;
      railName.textContent = name;
      rail.classList.toggle('dark', entry.target.hasAttribute('data-dark'));
      rail.classList.toggle('show', number !== '01');
      const id = entry.target.id;
      $$('#navLinks a').forEach(link => {
        const active = Boolean(id) && link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }), { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const reveals = $$('.rv, .rv-img');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
    reveals.forEach(element => {
      const siblings = element.parentElement ? $$('.rv', element.parentElement) : [];
      const stagger = siblings.indexOf(element);
      if (stagger > 0 && !reducedMotion) element.style.transitionDelay = `${Math.min(stagger, 4) * 55}ms`;
      revealObserver.observe(element);
    });
  } else {
    reveals.forEach(element => element.classList.add('in'));
  }

  const quotes = $$('#quotes .quote');
  const voices = $$('#voices button');
  function showQuote(position) {
    if (!quotes.length) return;
    const activePosition = (position + quotes.length) % quotes.length;
    quotes.forEach((quote, index) => {
      const active = index === activePosition;
      quote.classList.toggle('on', active);
      quote.setAttribute('aria-hidden', String(!active));
    });
    voices.forEach((button, index) => {
      const active = index === activePosition;
      button.classList.toggle('on', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  voices.forEach((button, position) => button.addEventListener('click', () => showQuote(position)));
  if (quotes.length) showQuote(Math.max(0, quotes.findIndex(quote => quote.classList.contains('on'))));

  const copyButton = $('#copyMail');
  const toast = $('#toast');
  copyButton?.addEventListener('click', async event => {
    const address = event.currentTarget.dataset.mail;
    if (!address || !toast) return;
    try {
      await navigator.clipboard.writeText(address);
      toast.textContent = 'Email copied';
    } catch (_) {
      toast.textContent = 'Use the email link to get in touch';
    }
    toast.classList.add('on');
    setTimeout(() => toast.classList.remove('on'), 2200);
  });

  document.addEventListener('keydown', event => {
    if (body.classList.contains('drawer-open') && drawer) {
      if (event.key === 'Escape') {
        closeProject();
        return;
      }
      if (event.key === 'ArrowRight') {
        fillProject(currentProject + 1);
        return;
      }
      if (event.key === 'ArrowLeft') {
        fillProject(currentProject - 1);
        return;
      }
      if (event.key === 'Tab') {
        const focusable = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', drawer).filter(element => !element.hidden);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    } else if (event.key === 'Escape' && body.classList.contains('nav-open')) {
      closeMenu(true);
    }
  });
})();
