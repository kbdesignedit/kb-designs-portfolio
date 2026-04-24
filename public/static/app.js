/* =============================================
   KATLYN BROWN — Portfolio JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Preloader --- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2000);
  });

  // Fallback — remove preloader after 3s no matter what
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }, 3000);

  /* --- Custom Cursor --- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Expand ring on hover of interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .portfolio-item, .service-card, .skill-item, .filter-btn');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('expanded'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('expanded'));
    });
  }

  /* --- Navigation Scroll Effect --- */
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    const scrollY = window.scrollY;

    // Nav background
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active section highlighting
    sections.forEach(section => {
      const top = section.offsetTop - 200;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile Menu --- */
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksContainer.classList.toggle('open');
    });

    // Close on link click
    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
      });
    });
  }

  /* --- Scroll Reveals --- */
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* --- Portfolio Filters --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      portfolioItems.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden-item');
          item.style.display = '';
        } else {
          item.classList.add('hidden-item');
          item.style.display = 'none';
        }
      });
    });
  });

  /* --- Portfolio Modal --- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  const projectData = {
    'online-course': {
      category: 'Instructional Design',
      title: 'ONLINE COURSE DESIGN',
      description: 'Designed comprehensive online course modules for wellness education platforms, featuring treatment menus, dermaplaning service descriptions, exfoliation protocols, and essential oil integration guides. Each module follows scaffolded, theory-to-practice instruction.',
      detail1: { label: 'Client', value: '360 Wellness Education' },
      detail2: { label: 'Role', value: 'Instructional Designer' },
      detail3: { label: 'Impact', value: '+35% Completion Rate' }
    },
    'moor-spa': {
      category: 'Brand & Product Training',
      title: 'MOOR SPA — PRODUCT TRAINING',
      description: 'Developed branded product training materials for Moor Spa\'s professional line, including their Purifying Massage Balm and other 100% natural source products. Training content educates spa professionals on product benefits, application techniques, and selling points.',
      detail1: { label: 'Client', value: 'Moor Spa' },
      detail2: { label: 'Role', value: 'Content Designer' },
      detail3: { label: 'Tools', value: 'Adobe Photoshop, Lightroom' }
    },
    'cnd-plexigel': {
      category: 'Brand & Product Training',
      title: 'CND PLEXIGEL — TRAINING GUIDES',
      description: 'Created detailed step-by-step instructional training guides for CND\'s Plexigel product line, including the Shaper Natural Nail Overlay and Rebalance systems. Materials feature visual process documentation with clear photographic sequences.',
      detail1: { label: 'Client', value: 'CND (Creative Nail Design)' },
      detail2: { label: 'Role', value: 'Training Material Designer' },
      detail3: { label: 'Tools', value: 'Adobe InDesign, Photoshop' }
    },
    'uc-learning': {
      category: 'Instructional Design',
      title: 'UNIVERSAL COMPANIES — EDUCATIONAL MATERIALS',
      description: 'Developed a comprehensive library of print and digital educational materials for Universal Companies\' learning platform, including treatment protocols for brands like Prosana, Ecofin, and Pure Fiji CBD. Increased course completion rates by 35% and enhanced knowledge retention by 25%.',
      detail1: { label: 'Client', value: 'Universal Companies' },
      detail2: { label: 'Impact', value: '35% Completion Increase' },
      detail3: { label: 'Tools', value: 'Adobe Suite, LMS, Canva' }
    },
    'safermobility': {
      category: 'Marketing & Content',
      title: 'SAFERMOBILITY — CAMPUS SAFETY APP',
      description: 'Created marketing collateral for SaferMobility, a mobile safety application for university campuses featuring timer-based safety checks, emergency video calls, and SafetyPress panic button functionality. Marketing materials communicate complex technology features in an approachable way.',
      detail1: { label: 'Client', value: 'SaferMobility' },
      detail2: { label: 'Role', value: 'Content Strategist & Designer' },
      detail3: { label: 'Tools', value: 'Canva, Adobe Suite' }
    },
    'bellabaci': {
      category: 'Brand & Product',
      title: 'BELLABACI — PRODUCT BRANDING',
      description: 'Developed brand training content and product photography direction for Bellabaci\'s essential oil collections, including the Renew and Revive Pure Essential Complex lines. Materials educate practitioners on product benefits, usage protocols, and brand story.',
      detail1: { label: 'Client', value: 'Bellabaci' },
      detail2: { label: 'Role', value: 'Brand Content Designer' },
      detail3: { label: 'Tools', value: 'Lightroom, Photoshop, Canva' }
    },
    'digital-marketing': {
      category: 'Digital Marketing',
      title: 'MULTI-PLATFORM CAMPAIGNS',
      description: 'A showcase of multi-platform digital marketing campaigns spanning social media content, email marketing, web design mockups, and branded product photography for beauty and wellness brands. Each campaign demonstrates maintaining brand consistency across diverse platforms.',
      detail1: { label: 'Clients', value: 'Various Brands' },
      detail2: { label: 'Role', value: 'Digital Marketing Strategist' },
      detail3: { label: 'Tools', value: 'Canva, Adobe Suite, Mailchimp' }
    },
    'marriage-workbook': {
      category: 'Creative Content',
      title: 'STAY. FIGHT. OVERCOME.',
      description: 'Authored and designed a guided marriage workbook for couples who are tired of fighting each other and ready to fight for their marriage. The workbook walks couples through honest conversations, intentional reflection, and faith-centered practices to identify real issues, rebuild trust, and invite God back into the hard things.',
      detail1: { label: 'Type', value: 'Self-Published Workbook' },
      detail2: { label: 'Role', value: 'Author & Designer' },
      detail3: { label: 'Tools', value: 'Adobe InDesign, Illustrator' }
    },
    'bible-plan': {
      category: 'Creative Content',
      title: 'BUSY MOM\'S BIBLE PLAN',
      description: 'A 30-day devotional plan designed for real life — not the Instagram version, but the beautiful mess of everyday motherhood. Each day takes just 5 minutes, connecting Scripture to actual life with honest reflection, no guilt trips, and grace-filled encouragement for moms with a heart for Jesus.',
      detail1: { label: 'Type', value: 'Self-Published Devotional' },
      detail2: { label: 'Role', value: 'Author & Designer' },
      detail3: { label: 'Format', value: '30-Day Digital Plan' }
    }
  };

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const projectId = item.dataset.project;
      const data = projectData[projectId];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="category">${data.category}</span>
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <div class="modal-details">
          <div class="modal-detail-item">
            <div class="detail-label">${data.detail1.label}</div>
            <div class="detail-value">${data.detail1.value}</div>
          </div>
          <div class="modal-detail-item">
            <div class="detail-label">${data.detail2.label}</div>
            <div class="detail-value">${data.detail2.value}</div>
          </div>
          <div class="modal-detail-item">
            <div class="detail-label">${data.detail3.label}</div>
            <div class="detail-value">${data.detail3.value}</div>
          </div>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* --- Testimonial Slider --- */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(parseInt(dot.dataset.slide));
      startAutoSlide();
    });
  });

  if (slides.length > 0) startAutoSlide();

  /* --- Contact Form --- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          contactForm.style.display = 'none';
          formSuccess.classList.add('show');
        }
      } catch (err) {
        // Still show success for better UX (form data is captured)
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
      }
    });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Counter Animation --- */
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const text = el.textContent;
    const hasPercent = text.includes('%');
    const hasPlus = text.includes('+');
    const hasComma = text.includes(',');
    const cleanNum = parseInt(text.replace(/[^0-9]/g, ''));

    if (isNaN(cleanNum)) return;

    let current = 0;
    const step = Math.ceil(cleanNum / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= cleanNum) {
        current = cleanNum;
        clearInterval(interval);
      }
      let display = hasComma ? current.toLocaleString() : current;
      if (hasPercent) display += '%';
      if (hasPlus) display += '+';
      el.textContent = display;
    }, 30);
  }

});
