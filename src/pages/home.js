import SplitText from '../components/SplitText.js';

export function home() {
  const container = document.createElement('div');
  container.className = 'hero-section';

  container.innerHTML = `
    <div class="greeting-container">
      <h1 id="greeting-text" class="greeting-title">Сәлеметсіз бе!</h1>
      <p id="proverb-text" class="proverb-text">Тіл – жүректің айнасы</p>
      <p class="proverb-translation">Язык - зеркало души</p>
    </div>
  `;

  setTimeout(() => {
    const greetingElement = container.querySelector('#greeting-text');
    const proverbElement = container.querySelector('#proverb-text');

    if (greetingElement) {
      new SplitText({
        element: greetingElement,
        delay: 100,
        duration: 0.6,
        startDelay: 0,
        onLetterAnimationComplete: () => {
          if (proverbElement) {
            new SplitText({
              element: proverbElement,
              delay: 50,
              duration: 0.5,
              startDelay: 0
            });
          }
        }
      });
    }
  }, 100);

  return container;
}
