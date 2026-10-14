(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.getElementById('siteHeader');
  const elements = [...document.querySelectorAll('.js-reveal')];
  document.documentElement.classList.add('js-motion-ready');
  window.addEventListener('scroll', () => header?.classList.toggle('is-scrolled', window.scrollY > 32), {passive: true});
  if (reduceMotion || !('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -24px'});
  elements.forEach(element => observer.observe(element));
})();
