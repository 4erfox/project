/**
 * Конфигурация элементов мобильной навигации
 *
 * Каждый элемент содержит:
 * - id: уникальный идентификатор
 * - label: текст для отображения
 * - icon: SVG иконка
 * - path: маршрут для навигации
 * - description: описание для aria-label (доступность)
 * - showBadge: флаг для отображения значка уведомления
 */

export const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Главная',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    path: '/',
    description: 'Переход на главную страницу'
  },
  {
    id: 'course',
    label: 'Курс',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    path: '/course',
    description: 'Каталог всех разделов обучения'
  },
  {
    id: 'daily',
    label: 'Daily',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    path: '/daily',
    description: 'Ежедневная ситуация',
    showBadge: true // показывать badge если есть новая ситуация
  },
  {
    id: 'progress',
    label: 'Прогресс',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
    path: '/progress',
    description: 'Личная статистика и достижения'
  }
];
