/* =============================================
   KB Designs — Portfolio JavaScript
   Redesign 2026
   ============================================= */

'use strict';

// =============================================
// PRELOADER
// =============================================
const hidePreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('hidden')) {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
    // Re-trigger observer after preloader hides
    setTimeout(initRevealAnimations, 100);
  }
};

// Dismiss on window load
window.addEventListener('load', () => {
  setTimeout(hidePreloader, 1200);
});

// Fallback: Ensure preloader is dismissed after 4 seconds regardless of load state
setTimeout(hidePreloader, 4000);

document.body.style.overflow = 'hidden';

// Init reveals immediately so elements in viewport get animated
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initRevealAnimations, 100);
});

// =============================================
// CUSTOM CURSOR
// =============================================
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

if (cursorDot && cursorRing) {
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .portfolio-item, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('expanded'));
  });
}

// =============================================
// NAVIGATION
// =============================================
const nav       = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  updateActiveNavLink();
});

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

// =============================================
// REVEAL ANIMATIONS
// =============================================
function initRevealAnimations() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate skill bars
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          const parent = fill.closest('.skill-item');
          if (parent) parent.classList.add('visible');
        });
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // Skill bars observer
  const skillItems = document.querySelectorAll('.skill-item');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) {
          const w = fill.style.width;
          fill.style.width = '0';
          setTimeout(() => { fill.style.width = w; }, 50);
        }
      }
    });
  }, { threshold: 0.3 });
  skillItems.forEach(item => skillObserver.observe(item));
}

// =============================================
// PORTFOLIO FILTER
// =============================================
const filterBtns   = document.querySelectorAll('.filter-btn');
const portfolioGrid = document.getElementById('portfolioGrid');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    filterPortfolio(filter);
  });
});

function filterPortfolio(filter) {
  if (!portfolioGrid) return;
  const items = portfolioGrid.querySelectorAll('.portfolio-item');
  items.forEach(item => {
    const cat = item.dataset.category;
    const show = filter === 'all' || cat === filter;
    item.style.opacity = '0';
    item.style.transform = 'scale(0.96)';
    setTimeout(() => {
      item.style.display = show ? '' : 'none';
      if (show) {
        requestAnimationFrame(() => {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        });
      }
    }, 200);
  });
}

// =============================================
// PORTFOLIO MODAL
// =============================================
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalBody    = document.getElementById('modalBody');

const projectData = {
  'online-course': {
    category: 'Instructional Design',
    title: 'Online Course Design',
    image: 'static/images/portfolio-online-course.jpg',
    description: 'A comprehensive SCORM-compliant certification program designed for wellness professionals. This multi-module course serves 1,000+ learners and features branching scenarios, interactive assessments, and real-world case studies.',
    details: [
      { label: 'Client', value: 'Universal Companies' },
      { label: 'Tools', value: 'Articulate 360, Adobe Suite' },
      { label: 'Outcome', value: '+35% Completion Rate' }
    ]
  },
  'moor-spa': {
    category: 'Brand & Product Training',
    title: 'Moor Spa',
    image: 'static/images/portfolio-moor-spa.png',
    description: 'Branded product training materials for spa professionals. Developed comprehensive step-by-step guides, visual treatment protocols, and digital training resources that elevated the brand experience for Moor Spa\'s professional network.',
    details: [
      { label: 'Client', value: 'Moor Spa' },
      { label: 'Tools', value: 'Adobe InDesign, Canva' },
      { label: 'Deliverables', value: 'Training Guides, Digital Assets' }
    ]
  },
  'cnd-plexigel': {
    category: 'Brand & Product Training',
    title: 'CND Plexigel',
    image: 'static/images/portfolio-cnd.jpg',
    description: 'Professional training guides and instructional materials for CND\'s Plexigel product line. Created clear, visually engaging step-by-step protocols that empowered nail professionals to master the product with confidence.',
    details: [
      { label: 'Client', value: 'CND' },
      { label: 'Tools', value: 'Adobe Creative Suite' },
      { label: 'Deliverables', value: 'Training Guides, Visual Protocols' }
    ]
  },
  'uc-learning': {
    category: 'Instructional Design',
    title: 'UC Learning Platform',
    image: 'static/images/portfolio-uc-learning.jpg',
    description: 'Educational materials and eLearning modules for Universal Companies\' learning platform. Redesigned existing content using adult learning principles and interactive design, achieving a 35% increase in course completion rates.',
    details: [
      { label: 'Client', value: 'Universal Companies' },
      { label: 'Tools', value: 'Articulate Rise, Adobe Suite' },
      { label: 'Outcome', value: '+35% Completion Rate' }
    ]
  },
  'safermobility': {
    category: 'Marketing & Content Strategy',
    title: 'SaferMobility',
    image: 'static/images/portfolio-safermobility.jpg',
    description: 'Developed comprehensive marketing collateral and content strategy for SaferMobility, a campus safety application selected by universities nationwide. Led brand voice development and multi-channel digital content initiatives.',
    details: [
      { label: 'Client', value: 'SaferMobility' },
      { label: 'Tools', value: 'Canva, Adobe Suite, HubSpot' },
      { label: 'Deliverables', value: 'Brand Strategy, Marketing Collateral' }
    ]
  },
  'stay-fight': {
    category: 'Creative Content',
    title: 'Stay. Fight. Overcome.',
    image: 'static/images/portfolio-stay-fight.png',
    description: 'A personal passion project and creative content campaign centered on resilience, mental health awareness, and authentic storytelling. Developed brand identity, content strategy, and visual assets for a community-focused initiative.',
    details: [
      { label: 'Type', value: 'Personal / Creative Project' },
      { label: 'Tools', value: 'Adobe Suite, Canva' },
      { label: 'Focus', value: 'Brand Identity, Content Strategy' }
    ]
  },
  'multi-platform': {
    category: 'Marketing',
    title: 'Multi-Platform Campaigns',
    image: 'static/images/portfolio-multi-platform.png',
    description: 'Designed and executed multi-platform marketing campaigns across social media, email, and digital channels. Created cohesive visual assets and copy that drove measurable engagement and brand awareness for multiple clients.',
    details: [
      { label: 'Type', value: 'Marketing Campaigns' },
      { label: 'Tools', value: 'Canva, Adobe Suite, Mailchimp' },
      { label: 'Channels', value: 'Social, Email, Digital' }
    ]
  },
  'busy-mom': {
    category: 'Creative Content',
    title: 'The Busy Mom Bible',
    image: 'static/images/portfolio-busy-mom.png',
    description: 'A creative content project and digital resource guide for working moms. Developed brand identity, content strategy, and visual design for a relatable, authentic platform that celebrates the reality of modern motherhood.',
    details: [
      { label: 'Type', value: 'Creative / Personal Brand' },
      { label: 'Tools', value: 'Canva, Adobe Suite' },
      { label: 'Focus', value: 'Brand Identity, Content Creation' }
    ]
  }
};

document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', () => {
    const projectId = item.dataset.project;
    const data = projectData[projectId];
    if (!data || !modalOverlay || !modalBody) return;

    const detailsHTML = data.details
      ? data.details.map(d => `
          <div class="modal-detail-item">
            <span class="detail-label">${d.label}</span>
            <span class="detail-value">${d.value}</span>
          </div>`).join('')
      : '';

    modalBody.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-hero-img" />
      <span class="category">${data.category}</span>
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      ${detailsHTML ? `<div class="modal-details">${detailsHTML}</div>` : ''}
    `;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}
if (modalOverlay) {
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

function closeModal() {
  if (modalOverlay) modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    if (btn) {
      btn.textContent = 'Sending...';
      btn.disabled = true;
    }
    setTimeout(() => {
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
    }, 1200);
  });
}

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
