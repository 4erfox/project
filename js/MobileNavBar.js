import { NAV_ITEMS } from './navItems.js';

/**
 * Класс для управления мобильной навигационной панелью
 *
 * Отображается только на экранах ≤768px
 * Фиксированная позиция внизу экрана
 * Содержит 4 кнопки навигации с иконками
 */
class MobileNavBar {
  constructor() {
    this.activeItem = this.getCurrentActiveItem();
    this.init();
  }

  /**
   * Определяет активный элемент навигации на основе текущего пути
   */
  getCurrentActiveItem() {
    const currentPath = window.location.pathname;

    // Нормализуем путь (получаем только имя файла)
    const currentFile = currentPath.split('/').pop() || 'index.html';

    // Ищем соответствующий элемент навигации
    const activeNav = NAV_ITEMS.find(item => {
      const itemFile = item.path.split('/').pop();
      return itemFile === currentFile || item.path === currentPath;
    });

    return activeNav ? activeNav.id : 'home';
  }

  /**
   * Инициализация компонента
   */
  init() {
    // Проверяем, не был ли уже создан навбар
    if (document.getElementById('mobile-navbar')) {
      return;
    }

    this.createNavBar();
    this.attachEventListeners();
  }

  /**
   * Создание HTML структуры навбара
   */
  createNavBar() {
    // Создаем основной контейнер
    const nav = document.createElement('nav');
    nav.id = 'mobile-navbar';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Мобильная навигация');

    // Применяем стили через CSS классы и inline стили
    nav.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      width: 100%;
      height: 64px;
      display: none;
      padding-bottom: env(safe-area-inset-bottom);
    `;

    // Создаем внутренний контейнер
    const container = document.createElement('div');
    container.style.cssText = `
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      height: 100%;
      padding: 8px 0;
      background: rgba(26, 26, 26, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    `;

    // Создаем кнопки для каждого элемента навигации
    NAV_ITEMS.forEach(item => {
      const button = this.createNavButton(item);
      container.appendChild(button);
    });

    nav.appendChild(container);

    // Добавляем стили для медиа-запросов
    this.addResponsiveStyles();

    // Добавляем навбар в body
    document.body.appendChild(nav);
  }

  /**
   * Создание кнопки навигации
   */
  createNavButton(item) {
    const isActive = this.activeItem === item.id;

    // Создаем кнопку
    const button = document.createElement('button');
    button.setAttribute('data-nav-id', item.id);
    button.setAttribute('data-nav-path', item.path);
    button.setAttribute('aria-label', item.description);
    if (isActive) {
      button.setAttribute('aria-current', 'page');
    }

    button.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 8px;
      flex: 1;
      cursor: pointer;
      background: none;
      border: none;
      position: relative;
      transition: all 200ms ease-in-out;
    `;

    // Создаем контейнер для иконки
    const iconContainer = document.createElement('div');
    iconContainer.style.cssText = 'position: relative;';

    // Создаем иконку
    const iconWrapper = document.createElement('div');
    iconWrapper.innerHTML = item.icon;
    iconWrapper.style.cssText = `
      color: ${isActive ? '#E53935' : '#9CA3AF'};
      transition: color 200ms ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Изменяем stroke-width в зависимости от активности
    const svg = iconWrapper.querySelector('svg');
    if (svg) {
      svg.setAttribute('stroke-width', isActive ? '2.5' : '2');
    }

    iconContainer.appendChild(iconWrapper);

    // Добавляем badge если нужно
    if (item.showBadge) {
      const badge = document.createElement('span');
      badge.setAttribute('aria-label', 'Новое уведомление');
      badge.style.cssText = `
        position: absolute;
        top: -4px;
        right: -4px;
        width: 8px;
        height: 8px;
        background-color: #EF4444;
        border-radius: 50%;
        border: 2px solid rgba(26, 26, 26, 0.95);
      `;
      iconContainer.appendChild(badge);
    }

    // Создаем текст метки
    const label = document.createElement('span');
    label.textContent = item.label;
    label.style.cssText = `
      font-size: 10px;
      line-height: 1.2;
      color: ${isActive ? '#E53935' : '#9CA3AF'};
      font-weight: ${isActive ? '600' : '400'};
      transition: all 200ms ease-in-out;
    `;

    button.appendChild(iconContainer);
    button.appendChild(label);

    // Добавляем hover эффект
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });

    return button;
  }

  /**
   * Добавление responsive стилей
   */
  addResponsiveStyles() {
    // Проверяем, не добавлены ли уже стили
    if (document.getElementById('mobile-navbar-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'mobile-navbar-styles';
    style.textContent = `
      /* Показываем навбар только на мобильных устройствах */
      @media (max-width: 768px) {
        #mobile-navbar {
          display: block !important;
        }
      }

      /* Скрываем на десктопе */
      @media (min-width: 769px) {
        #mobile-navbar {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Присоединение обработчиков событий
   */
  attachEventListeners() {
    const buttons = document.querySelectorAll('#mobile-navbar button[data-nav-id]');

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const navId = button.getAttribute('data-nav-id');
        const navPath = button.getAttribute('data-nav-path');

        this.handleNavigation(navId, navPath);
      });
    });
  }

  /**
   * Обработчик навигации
   */
  handleNavigation(navId, navPath) {
    // Обновляем активный элемент
    this.activeItem = navId;

    // Обновляем визуальное состояние всех кнопок
    this.updateActiveState();

    // Получаем текущий путь и путь назначения
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const targetFile = navPath.split('/').pop();

    // Выполняем навигацию только если пути разные
    if (currentFile !== targetFile) {
      window.location.href = navPath;
    }
  }

  /**
   * Обновление визуального состояния активной кнопки
   */
  updateActiveState() {
    const buttons = document.querySelectorAll('#mobile-navbar button[data-nav-id]');

    buttons.forEach(button => {
      const navId = button.getAttribute('data-nav-id');
      const isActive = navId === this.activeItem;

      // Обновляем aria-current
      if (isActive) {
        button.setAttribute('aria-current', 'page');
      } else {
        button.removeAttribute('aria-current');
      }

      // Обновляем цвет иконки
      const iconWrapper = button.querySelector('div > div');
      if (iconWrapper) {
        iconWrapper.style.color = isActive ? '#E53935' : '#9CA3AF';

        // Обновляем stroke-width
        const svg = iconWrapper.querySelector('svg');
        if (svg) {
          svg.setAttribute('stroke-width', isActive ? '2.5' : '2');
        }
      }

      // Обновляем цвет и вес текста
      const label = button.querySelector('span');
      if (label) {
        label.style.color = isActive ? '#E53935' : '#9CA3AF';
        label.style.fontWeight = isActive ? '600' : '400';
      }
    });
  }
}

/**
 * Инициализация мобильного навбара при загрузке страницы
 */
export function initMobileNavBar() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new MobileNavBar();
    });
  } else {
    new MobileNavBar();
  }
}

// Автоматическая инициализация
initMobileNavBar();
