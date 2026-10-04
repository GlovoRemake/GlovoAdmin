# 🛠️ Glovo Admin

> Адміністративна панель платформи доставки **GlovoRemake**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)

## 📖 Про проєкт

Веб-інтерфейс для адміністраторів екосистеми GlovoRemake. Працює з [GlovoAPI](https://github.com/GlovoRemake/GlovoAPI).

<!-- TODO: що саме вміє адмінка: модерація закладів, користувачі, кур'єри, замовлення, статистика тощо -->

## ✨ Можливості

<!-- TODO: залиште лише реалізоване -->
- 🔐 Вхід адміністратора
- 🏪 Керування закладами-партнерами
- 🚴 Керування кур'єрами
- 👥 Керування користувачами
- 🧾 Перегляд замовлень

## 🧰 Технологічний стек

| Категорія | Технології |
|---|---|
| Фреймворк | React 19, React Router 7 |
| Мова / збірка | TypeScript, Vite |
| Стилі та UI | Tailwind CSS 4, shadcn/ui, Base UI, `motion` |
| Іконки | Lucide, Hugeicons |
| Стан | Redux Toolkit |
| Форми | React Hook Form |
| Якість коду | ESLint, `typescript-eslint` |
| Деплой | Docker + Nginx |

## 🚀 Швидкий старт

### Вимоги

- Node.js 20+
- Запущений [GlovoAPI](https://github.com/GlovoRemake/GlovoAPI)

### Запуск

```bash
git clone https://github.com/GlovoRemake/GlovoAdmin.git
cd GlovoAdmin

npm install
cp .env.example .env     # заповніть значення
npm run dev
```

### Скрипти

| Команда | Опис |
|---|---|
| `npm run dev` | Dev-сервер Vite |
| `npm run build` | `tsc -b` + production-збірка |
| `npm run preview` | Перегляд збірки |
| `npm run lint` | ESLint |

## ⚙️ Конфігурація

Змінні задаються у `.env` (див. `.env.example`).

| Змінна | Опис |
|---|---|
| `VITE_...` | Адреса GlovoAPI <!-- TODO: вкажіть реальну назву зі .env.example --> |

> Змінні з префіксом `VITE_` потрапляють у клієнтську збірку — не зберігайте в них секрети.

## 🐳 Docker

У репозиторії є `Dockerfile` та `nginx.conf`.

```bash
docker build -t glovo-admin .
docker run -d -p 8080:80 glovo-admin
```

<!-- TODO: якщо Dockerfile аналогічний до GlovoPartnersFrontend, додайте --build-arg VITE_API_URL=... -->

## 🔗 Екосистема GlovoRemake

| Репозиторій | Призначення |
|---|---|
| [GlovoAPI](https://github.com/GlovoRemake/GlovoAPI) | Backend (ASP.NET Core, .NET 10) |
| [GlovoPartnersFrontend](https://github.com/GlovoRemake/GlovoPartnersFrontend) | Кабінет партнера |
| **GlovoAdmin** | Адмін-панель (цей репозиторій) |
| [GlovoMobile](https://github.com/GlovoRemake/GlovoMobile) | Застосунок клієнта |
| [GlovoRidersMobile](https://github.com/GlovoRemake/GlovoRidersMobile) | Застосунок кур'єра |

## 🤝 Внесок

1. Fork → гілка `feature/...`
2. `npm run lint` та `npm run build` без помилок
3. Pull Request

## 📄 Ліцензія

<!-- TODO: додайте LICENSE -->

> ℹ️ Навчальний / фан-проєкт, **не пов'язаний із Glovo**.
