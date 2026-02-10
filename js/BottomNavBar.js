/**
 * Универсальный нижний навбар для всех устройств
 * Отображается на desktop и mobile
 */

const NAV_CONFIG = {
  items: [
    {
      id: 'home',
      label: 'Главная',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      path: '/index.html'
    },
    {
      id: 'course',
      label: 'Курс',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
      path: '/osnovyi.html'
    },
    {
      id: 'logo',
      label: 'Главная',
      type: 'logo',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
      path: '/index.html'
    },
    {
      id: 'daily',
      label: 'Daily',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/></svg>`,
      path: '/praktika.html',
      showBadge: true
    },
    {
      id: 'progress',
      label: 'Прогресс',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`,
      path: '/kontakty.html'
    }
  ]
};

class BottomNavBar {
  constructor() {
    this.activeItem = this.getCurrentActiveItem();
    this.init();
  }

  getCurrentActiveItem() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';

    const activeNav = NAV_CONFIG.items.find(item => {
      if (item.type === 'logo') return false;
      const itemFile = item.path.split('/').pop();
      return itemFile === currentFile || item.path === currentPath;
    });

    return activeNav ? activeNav.id : 'home';
  }

  init() {
    if (document.getElementById('bottom-navbar')) {
      return;
    }

    this.createStyles();
    this.createNavBar();
    this.attachEventListeners();
  }

  createStyles() {
    if (document.getElementById('bottom-navbar-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'bottom-navbar-styles';
    style.textContent = `
      #bottom-navbar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        width: 100%;
        height: 72px;
        padding-bottom: env(safe-area-inset-bottom);
      }

      .bottom-nav-container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        height: 100%;
        padding: 8px 16px;
        background: rgba(26, 26, 26, 0.95);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.3);
        max-width: 100%;
        margin: 0 auto;
      }

      @media (min-width: 769px) {
        .bottom-nav-container {
          max-width: 600px;
          border-radius: 24px 24px 0 0;
          padding: 8px 24px;
        }
      }

      .nav-item {
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
        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 80px;
      }

      .nav-item:hover {
        transform: scale(1.1);
      }

      .nav-item:active {
        transform: translateY(-2px);
      }

      .nav-item-icon {
        color: #9CA3AF;
        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .nav-item.active .nav-item-icon {
        color: #E53935;
      }

      .nav-item.active .nav-item-icon svg {
        stroke-width: 2.5;
      }

      .nav-item-label {
        font-size: 11px;
        line-height: 1.2;
        color: #9CA3AF;
        font-weight: 400;
        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      .nav-item.active .nav-item-label {
        color: #E53935;
        font-weight: 600;
      }

      .nav-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 8px;
        height: 8px;
        background-color: #EF4444;
        border-radius: 50%;
        border: 2px solid rgba(26, 26, 26, 0.95);
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.1);
        }
      }

      .nav-logo-item {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: linear-gradient(135deg, #E53935 0%, #C62828 100%);
        border: 3px solid #1a1a1a;
        border-radius: 50%;
        width: 56px;
        height: 56px;
        transform: translateY(-12px);
        box-shadow: 0 4px 16px rgba(229, 57, 53, 0.4);
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        flex-shrink: 0;
      }

      .nav-logo-item:hover {
        transform: translateY(-14px) scale(1.05);
        box-shadow: 0 8px 24px rgba(229, 57, 53, 0.6);
      }

      .nav-logo-item:active {
        transform: translateY(-10px) scale(0.95);
      }

      .nav-logo-icon {
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @media (max-width: 768px) {
        .nav-item {
          max-width: 64px;
          padding: 4px;
        }

        .nav-logo-item {
          width: 52px;
          height: 52px;
        }

        .nav-item-label {
          font-size: 10px;
        }
      }

      @media (max-width: 380px) {
        .nav-item {
          max-width: 56px;
          padding: 2px;
          gap: 2px;
        }

        .nav-logo-item {
          width: 48px;
          height: 48px;
        }

        .nav-item-icon svg {
          width: 20px;
          height: 20px;
        }

        .nav-logo-icon svg {
          width: 28px;
          height: 28px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  createNavBar() {
    const nav = document.createElement('nav');
    nav.id = 'bottom-navbar';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Нижняя навигация');

    const container = document.createElement('div');
    container.className = 'bottom-nav-container';

    NAV_CONFIG.items.forEach(item => {
      if (item.type === 'logo') {
        container.appendChild(this.createLogoButton(item));
      } else {
        container.appendChild(this.createNavButton(item));
      }
    });

    nav.appendChild(container);
    document.body.appendChild(nav);
  }

  createNavButton(item) {
    const isActive = this.activeItem === item.id;

    const button = document.createElement('button');
    button.className = 'nav-item' + (isActive ? ' active' : '');
    button.setAttribute('data-nav-id', item.id);
    button.setAttribute('data-nav-path', item.path);
    button.setAttribute('aria-label', item.label);

    if (isActive) {
      button.setAttribute('aria-current', 'page');
    }

    const iconContainer = document.createElement('div');
    iconContainer.className = 'nav-item-icon';

    const iconWrapper = document.createElement('div');
    iconWrapper.innerHTML = item.icon;
    iconContainer.appendChild(iconWrapper);

    if (item.showBadge) {
      const badge = document.createElement('span');
      badge.className = 'nav-badge';
      badge.setAttribute('aria-label', 'Новое уведомление');
      iconContainer.appendChild(badge);
    }

    const label = document.createElement('span');
    label.className = 'nav-item-label';
    label.textContent = item.label;

    button.appendChild(iconContainer);
    button.appendChild(label);

    return button;
  }

  createLogoButton(item) {
    const button = document.createElement('button');
    button.className = 'nav-logo-item';
    button.setAttribute('data-nav-path', item.path);
    button.setAttribute('aria-label', 'Главная страница');

    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'nav-logo-icon';
    iconWrapper.innerHTML = item.icon;

    button.appendChild(iconWrapper);

    return button;
  }

  attachEventListeners() {
    const buttons = document.querySelectorAll('#bottom-navbar button[data-nav-path]');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const navPath = button.getAttribute('data-nav-path');
        const navId = button.getAttribute('data-nav-id');

        if (navId) {
          this.activeItem = navId;
        }

        const currentFile = window.location.pathname.split('/').pop() || 'index.html';
        const targetFile = navPath.split('/').pop();

        if (currentFile !== targetFile) {
          window.location.href = navPath;
        }
      });
    });
  }

  updateActiveState() {
    const buttons = document.querySelectorAll('#bottom-navbar .nav-item[data-nav-id]');

    buttons.forEach(button => {
      const navId = button.getAttribute('data-nav-id');
      const isActive = navId === this.activeItem;

      if (isActive) {
        button.classList.add('active');
        button.setAttribute('aria-current', 'page');
      } else {
        button.classList.remove('active');
        button.removeAttribute('aria-current');
      }
    });
  }
}

export function initBottomNavBar() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new BottomNavBar();
    });
  } else {
    new BottomNavBar();
  }
}

initBottomNavBar();
