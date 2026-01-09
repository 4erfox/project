import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeAnimations();
  initializeFormHandling();
  initializeScrollToTop();
});

function initializeNavigation() {
  const navToggle = document.getElementById('navbar-toggle');
  const navMenu = document.getElementById('navbar-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navMenu.classList.remove('show');
    }
  });
}

function initializeAnimations() {
  gsap.registerEffect({
    name: 'fadeInUp',
    effect: (targets, config) => {
      return gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: config.duration || 0.8,
        ease: 'power3.out',
      }, 0);
    },
    extendTimeline: true,
    defaults: { duration: 0.8 },
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .portfolio-item, .pricing-card').forEach(el => {
    gsap.set(el, { opacity: 0, y: 30 });
    observer.observe(el);
  });

  const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta');
  heroElements.forEach((el, index) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: 'power3.out',
    });
  });
}

function initializeFormHandling() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      console.log('Form submitted:', Object.fromEntries(formData));
      alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
      contactForm.reset();
    });
  }
}

function initializeScrollToTop() {
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to(window, {
        scrollTo: 0,
        duration: 1,
        ease: 'power3.inOut',
      });
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn?.style.display = 'flex';
    } else {
      scrollToTopBtn?.style.display = 'none';
    }
  });
}
