import { gsap } from 'gsap';

export function initializePillNav() {
  const circleRefs = new Map();
  const tlRefs = new Map();
  const activeTweenRefs = new Map();
  const hamburgerRef = document.querySelector('.mobile-menu-button');
  const mobileMenuRef = document.querySelector('.mobile-menu-popover');
  const logoRef = document.querySelector('.pill-logo');
  const logoImgRef = logoRef?.querySelector('img');
  const navItemsRef = document.querySelector('.pill-nav-items');
  let logoTweenRef = null;

  function layout() {
    const pills = document.querySelectorAll('.pill');

    pills.forEach((pill, index) => {
      const circle = pill.querySelector('.hover-circle');
      if (!circle) return;

      const rect = pill.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const R = (w * w) / 4 / h + h / 2;
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      });

      const label = pill.querySelector('.pill-label');
      const white = pill.querySelector('.pill-label-hover');

      if (label) gsap.set(label, { y: 0 });
      if (white) gsap.set(white, { y: h + 12, opacity: 0 });

      tlRefs.get(index)?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0);

      if (label) {
        tl.to(label, { y: -(h + 8), duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
      }

      if (white) {
        gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(white, { y: 0, opacity: 1, duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
      }

      tlRefs.set(index, tl);
      circleRefs.set(index, circle);
    });
  }

  function handleEnter(index) {
    const tl = tlRefs.get(index);
    if (!tl) return;
    activeTweenRefs.get(index)?.kill();
    activeTweenRefs.set(
      index,
      tl.tweenTo(tl.duration(), {
        duration: 0.3,
        ease: 'power3.easeOut',
        overwrite: 'auto',
      })
    );
  }

  function handleLeave(index) {
    const tl = tlRefs.get(index);
    if (!tl) return;
    activeTweenRefs.get(index)?.kill();
    activeTweenRefs.set(
      index,
      tl.tweenTo(0, {
        duration: 0.2,
        ease: 'power3.easeOut',
        overwrite: 'auto',
      })
    );
  }

  function handleLogoEnter() {
    if (!logoImgRef) return;
    logoTweenRef?.kill();
    gsap.set(logoImgRef, { rotate: 0 });
    logoTweenRef = gsap.to(logoImgRef, {
      rotate: 360,
      duration: 0.2,
      ease: 'power3.easeOut',
      overwrite: 'auto',
    });
  }

  function toggleMobileMenu() {
    const isOpen = mobileMenuRef?.classList.contains('open');

    if (hamburgerRef) {
      const lines = hamburgerRef.querySelectorAll('.hamburger-line');
      if (!isOpen) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease: 'power3.easeOut' });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease: 'power3.easeOut' });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: 'power3.easeOut' });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: 'power3.easeOut' });
      }
    }

    if (mobileMenuRef) {
      if (!isOpen) {
        mobileMenuRef.classList.add('open');
        gsap.fromTo(
          mobileMenuRef,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power3.easeOut',
          }
        );
      } else {
        gsap.to(mobileMenuRef, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: 'power3.easeOut',
          onComplete: () => {
            mobileMenuRef.classList.remove('open');
          },
        });
      }
    }
  }

  layout();

  window.addEventListener('resize', layout);

  const pills = document.querySelectorAll('.pill');
  pills.forEach((pill, index) => {
    pill.addEventListener('mouseenter', () => handleEnter(index));
    pill.addEventListener('mouseleave', () => handleLeave(index));
  });

  if (logoRef) {
    logoRef.addEventListener('mouseenter', handleLogoEnter);
  }

  if (hamburgerRef) {
    hamburgerRef.addEventListener('click', toggleMobileMenu);
  }

  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
  });

  const navLinks = document.querySelectorAll('.pill, .mobile-menu-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  });

  if (logoImgRef) {
    gsap.set(logoImgRef, { scale: 0 });
    gsap.to(logoImgRef, {
      scale: 1,
      duration: 0.6,
      ease: 'power3.easeOut',
    });
  }

  if (navItemsRef) {
    gsap.set(navItemsRef, { width: 0, overflow: 'hidden' });
    gsap.to(navItemsRef, {
      width: 'auto',
      duration: 0.6,
      ease: 'power3.easeOut',
    });
  }
}