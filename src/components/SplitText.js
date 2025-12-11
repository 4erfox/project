import { gsap } from 'gsap';

class SplitText {
  constructor(options) {
    this.element = options.element;
    this.delay = options.delay || 100;
    this.duration = options.duration || 0.6;
    this.ease = options.ease || 'power3.out';
    this.from = options.from || { opacity: 0, y: 40 };
    this.to = options.to || { opacity: 1, y: 0 };
    this.startDelay = options.startDelay || 0;
    this.onComplete = options.onLetterAnimationComplete;

    this.init();
  }

  init() {
    if (!this.element) return;

    const text = this.element.textContent;
    this.element.innerHTML = '';

    const letters = text.split('').map((char) => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = char;
      span.style.display = 'inline-block';

      if (char === ' ') {
        span.style.width = '0.3em';
      }

      Object.assign(span.style, {
        opacity: this.from.opacity,
        transform: `translateY(${this.from.y}px)`,
      });

      this.element.appendChild(span);
      return span;
    });

    letters.forEach((letter, index) => {
      setTimeout(() => {
        gsap.to(letter, {
          opacity: this.to.opacity,
          y: this.to.y,
          duration: this.duration,
          ease: this.ease,
          onComplete: () => {
            letter.classList.add('animated');

            if (index === letters.length - 1 && this.onComplete) {
              this.onComplete();
            }
          },
        });
      }, this.startDelay + index * this.delay);
    });
  }
}

export default SplitText;
