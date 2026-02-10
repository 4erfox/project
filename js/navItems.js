/**
 * Конфигурация элементов мобильной навигации для электронного учебника
 *
 * Каждый элемент содержит:
 * - id: уникальный идентификатор элемента
 * - label: текст метки для отображения
 * - icon: SVG иконка (Lucide Icons)
 * - path: маршрут для навигации
 * - description: описание для aria-label (доступность)
 * - showBadge: флаг для отображения значка уведомления (опционально)
 */

export const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Главная',
    // Иконка Home (дом)
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    path: '/index.html',
    description: 'Переход на главную страницу'
  },
  {
    id: 'course',
    label: 'Курс',
    // Иконка BookOpen (открытая книга)
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    path: '/osnovyi.html',
    description: 'Каталог всех разделов обучения'
  },
  {
    id: 'daily',
    label: 'Daily',
    // Иконка Dices (кубики для игры)
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/></svg>`,
    path: '/praktika.html',
    description: 'Ежедневная практическая ситуация',
    showBadge: true
  },
  {
    id: 'progress',
    label: 'Прогресс',
    // Иконка BarChart3 (столбчатая диаграмма)
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`,
    path: '/kontakty.html',
    description: 'Личная статистика и достижения'
  }
];

/**
 * Получить элемент навигации по его ID
 *
 * @param {string} id - уникальный идентификатор элемента
 * @returns {Object|undefined} объект элемента навигации или undefined, если не найден
 *
 * @example
 * const homeItem = getNavItemById('home');
 * console.log(homeItem.label); // 'Главная'
 */
export function getNavItemById(id) {
  return NAV_ITEMS.find(item => item.id === id);
}

/**
 * Получить элемент навигации по его пути
 *
 * @param {string} path - путь маршрута
 * @returns {Object|undefined} объект элемента навигации или undefined, если не найден
 *
 * @example
 * const currentItem = getNavItemByPath('/course');
 * console.log(currentItem.label); // 'Курс'
 */
export function getNavItemByPath(path) {
  // Нормализуем путь для сравнения
  const normalizedPath = path.toLowerCase().replace(/^\//, '');

  return NAV_ITEMS.find(item => {
    const itemPath = item.path.toLowerCase().replace(/^\//, '');
    // Проверяем полное совпадение или совпадение имени файла
    return itemPath === normalizedPath ||
           normalizedPath.includes(itemPath.replace('.html', '')) ||
           itemPath.includes(normalizedPath.replace('.html', ''));
  });
}

/**
 * Получить все элементы навигации
 *
 * @returns {Array} массив всех элементов навигации
 *
 * @example
 * const allItems = getAllNavItems();
 * console.log(allItems.length); // 4
 */
export function getAllNavItems() {
  return [...NAV_ITEMS];
}

/**
 * Проверить, имеет ли элемент badge (уведомление)
 *
 * @param {string} id - уникальный идентификатор элемента
 * @returns {boolean} true если элемент имеет badge
 *
 * @example
 * const hasBadge = hasNotificationBadge('daily');
 * console.log(hasBadge); // true
 */
export function hasNotificationBadge(id) {
  const item = getNavItemById(id);
  return item ? Boolean(item.showBadge) : false;
}
