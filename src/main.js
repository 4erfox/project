import { gsap } from 'gsap';
import SplitText from './components/SplitText.js';
import { initializePillNav } from './components/PillNav.js';

document.addEventListener('DOMContentLoaded', () => {
  initializePillNav();

  const greetingText = document.getElementById('greeting-text');
  const proverbText = document.getElementById('proverb-text');

  if (greetingText) {
    new SplitText({
      element: greetingText,
      delay: 100,
      duration: 0.6,
      ease: 'power3.out',
      from: { opacity: 0, y: 40 },
      to: { opacity: 1, y: 0 },
    });
  }

  if (proverbText) {
    new SplitText({
      element: proverbText,
      delay: 150,
      duration: 0.8,
      ease: 'power3.out',
      from: { opacity: 0, y: 40 },
      to: { opacity: 1, y: 0 },
      startDelay: 800,
    });
  }
});
