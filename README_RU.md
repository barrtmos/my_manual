# my_manual

Минимальная база знаний на Astro с админкой Decap CMS.

## Обзор
- Статический сайт с заметками и схемами.
- Контент хранится в Markdown в `src/content/`.
- Админка Decap CMS доступна по `/admin/`.

## Технологии
- Astro (static build)
- Decap CMS (GitHub OAuth)
- Content Collections

## Маршруты
- `/` → список заметок
- `/notes` → список заметок с фильтрами
- `/notes/[slug]` → страница заметки
- `/schemes` → список схем
- `/schemes/[slug]` → страница схемы
- `/admin/` → Decap CMS

## Структура контента
```
src/content/notes/   # заметки (markdown)
src/content/schemes/ # схемы (markdown)
public/img/          # статические файлы
public/img/schemes/  # изображения схем
```

## Frontmatter
Заметки (`src/content/notes/*.md`):
```
---
title: Заголовок
structural: ЗАМЕТКИ | ДИАЛОГИ | ИНСТРУКЦИИ | НА ЗАМЕТКУ
topics:
  - ЛИНУКС
---
```

Схемы (`src/content/schemes/*.md`):
```
---
title: Заголовок схемы
topics:
  - VSC
image: /img/schemes/example.png
---
```

## Локальный запуск
```
npm install
npm run dev
```

## Сборка
```
npm run build
```

## CMS (Decap)
- URL: `/admin/`
- Конфиг: `public/admin/config.yml`
- OAuth через отдельный Render Web Service.

## Лицензия
Частный проект.
