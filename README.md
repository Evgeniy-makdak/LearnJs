# JavaScript Simulator: Путь от новичка до профи

> **Интерактивное PWA-приложение для самостоятельного изучения JavaScript с нуля до продвинутого уровня**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)

---

## 👤 Автор

**Евгений Волков (Acteck)**

- GitHub: [@Evgeniy-makdak](https://github.com/Evgeniy-makdak)
- Проект создан для обучения JavaScript через интерактивную практику

---

## 🚀 Возможности

- **25 тем** в 5 модулях — от переменных до DOM API
- **Интерактивная песочница** — встроенный редактор кода Monaco (как в VS Code)
- **Автоматическое тестирование** — код проверяется на тест-кейсах в реальном времени
- **Линейный прогресс** — следующая тема открывается после прохождения текущей (80%+)
- **PWA** — работает оффлайн, можно установить на телефон как приложение
- **Две темы** — тёмная (по умолчанию) и светлая
- **Сохранение прогресса** — данные хранятся в IndexedDB и не теряются при перезагрузке
- **Адаптивный дизайн** — работает на десктопе, планшете и мобильном

---

## 📚 Структура курса

### Модуль 1: Фундамент
| № | Тема |
|---|------|
| 1 | Введение. Подключение скриптов, консоль разработчика |
| 2 | Переменные (let, const, var). Именование |
| 3 | Типы данных (Number, String, Boolean, Null, Undefined, Symbol, BigInt) |
| 4 | Преобразование типов |
| 5 | Базовые операторы (математика, сравнения, логические) |

### Модуль 2: Управление потоком
| № | Тема |
|---|------|
| 6 | Условные конструкции (if...else, тернарный оператор) |
| 7 | Конструкция switch...case |
| 8 | Циклы while и do...while |
| 9 | Цикл for |
| 10 | Функции (Function Declaration, параметры, return) |

### Модуль 3: Структуры данных
| № | Тема |
|---|------|
| 11 | Стрелочные функции (Arrow functions) |
| 12 | Строки (методы slice, indexOf, includes, шаблонные строки) |
| 13 | Массивы (создание, индексы, length) |
| 14 | Методы массивов (push, pop, shift, unshift, splice, forEach) |
| 15 | Продвинутые методы массивов (map, filter, reduce, find) |

### Модуль 4: Объекты и классы
| № | Тема |
|---|------|
| 16 | Объекты (литералы, свойства, удаление) |
| 17 | Ключи объектов, Object.keys/values/entries |
| 18 | Деструктуризация (массивов и объектов) |
| 19 | Spread и Rest операторы |
| 20 | Классы (конструктор, методы, наследование) |

### Модуль 5: Асинхронность и DOM
| № | Тема |
|---|------|
| 21 | Замыкания (Closures) и область видимости |
| 22 | Колбэки и Event Loop (базово) |
| 23 | Промисы (Promise, then/catch/finally) |
| 24 | Async/Await |
| 25 | Основы DOM (поиск элементов, querySelector, обработчики событий) |

---

## 🛠 Технологический стек

| Категория | Технология |
|-----------|------------|
| **Фреймворк** | React 18 |
| **Язык** | TypeScript (строгая типизация) |
| **Сборка** | Vite 5 + vite-plugin-pwa |
| **Стили** | Tailwind CSS |
| **Состояние** | Zustand |
| **Хранение** | IndexedDB (idb-keyval) |
| **Редактор кода** | Monaco Editor (@monaco-editor/react) |
| **Анимации** | Framer Motion |
| **Роутинг** | React Router DOM |
| **Иконки** | Lucide React |

---

## 📦 Установка и запуск

### Требования
- Node.js 18+ 
- npm или yarn

### Локальный запуск

```bash
# Клонирование репозитория
git clone https://github.com/Evgeniy-makdak/LearnJs.git
cd LearnJs/LEARNJS

# Установка зависимостей
npm install

# Запуск dev-сервера (откроется http://localhost:5173)
npm run dev

# Сборка для production
npm run build

# Preview production сборки
npm run preview
```

### Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера с hot-reload |
| `npm run build` | Production сборка в папку `dist/` |
| `npm run preview` | Preview production сборки |
| `npm run lint` | Проверка кода линтером |

---

## 🏗 Архитектура проекта

```
LEARNJS/
├── public/                    # Статические файлы (favicon, manifest)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx  # Основной лейаут с роутингом
│   │   │   └── Sidebar.tsx    # Боковая панель с деревом тем
│   │   ├── dashboard/
│   │   │   └── ProgressDashboard.tsx  # Главная страница с прогрессом
│   │   └── lesson/
│   │       ├── LessonPage.tsx     # Страница урока
│   │       ├── TheoryViewer.tsx   # Отображение теории
│   │       └── TaskRunner.tsx     # Запуск заданий (quiz + coding)
│   ├── data/
│   │   └── courseData.ts      # Все 25 тем курса (теория + задания)
│   ├── hooks/
│   │   ├── useCodeRunner.ts   # Безопасное выполнение кода пользователя
│   │   └── useTheme.ts        # Управление темой (dark/light)
│   ├── store/
│   │   └── useStore.ts        # Zustand store + IndexedDB персистентность
│   ├── styles/
│   │   └── index.css          # Tailwind + кастомные стили
│   ├── types/
│   │   └── index.ts           # TypeScript типы и интерфейсы
│   ├── App.tsx                # Роутинг приложения
│   └── main.tsx               # Entry point
├── index.html
├── package.json
├── vite.config.ts             # Конфигурация Vite + PWA
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🔒 Безопасность выполнения кода

Пользовательский код выполняется в изолированной среде через `new Function()`:

- Отключены опасные глобальные объекты: `fetch`, `document`, `window`, `localStorage`, `sessionStorage`
- Используется `"use strict"` для строгого режима
- Обработка ошибок с понятными сообщениями
- Синтаксические ошибки показывают номер строки

---

## 📱 PWA (Progressive Web App)

Приложение поддерживает:

- ✅ Оффлайн-режим (кеширование через Service Worker)
- ✅ Установка на домашний экран (iOS/Android)
- ✅ Автономная работа без интернета
- ✅ Кэширование шрифтов, стилей и основного бандла

Для установки:
1. Откройте приложение в браузере
2. Нажмите "Установить приложение" в адресной строке
3. Приложение появится на рабочем столе

---

## 🎨 Дизайн

- **Цветовая схема**: Тёмная тема с неоновыми акцентами
  - 🟢 Зелёный — успех
  - 🟡 Жёлтый — JavaScript
  - 🔵 Синий — ссылки и акценты
- **Шрифты**: Inter (основной), JetBrains Mono (код)
- **Анимации**: Плавные переходы через Framer Motion

---

## 📄 Лицензия

MIT License — см. файл [LICENSE](LICENSE)

---

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте ветку (`git checkout -b feature/amazing-feature`)
3. Commit изменений (`git commit -m 'Add amazing feature'`)
4. Push в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

---

## 📞 Контакты

- **Автор**: Евгений Волков (Acteck)
- **GitHub**: [Evgeniy-makdak](https://github.com/Evgeniy-makdak)
- **Репозиторий**: [LearnJs](https://github.com/Evgeniy-makdak/LearnJs)

---

<div align="center">

## 🌐 Демо

Приложение доступно на GitHub Pages:

### **[https://evgeniy-makdak.github.io/LearnJs/](https://evgeniy-makdak.github.io/LearnJs/)**

---



**JavaScript Simulator** — учите JavaScript интерактивно! 🚀

</div>
