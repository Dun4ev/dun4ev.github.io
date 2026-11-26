# Быстрая памятка: GitHub Pages

## ✅ Что сделано

- ✅ Настроен `vite.config.ts` с `base: '/'`
- ✅ Добавлен скрипт `npm run deploy` в `package.json`
- Для ручного запуска используется GitHub CLI (`gh`) с доступом к Actions.
- ✅ Создан GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Создан файл `.nojekyll` для корректной работы
- ✅ Проверена production сборка

## 🚀 Как задеплоить

### Вариант 1: Автоматический (рекомендуется)

1. **Настройте GitHub Pages (один раз):**
   - Зайдите в Settings → Pages вашего репозитория
   - В разделе "Source" выберите **GitHub Actions**

2. **Запушьте код:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push
   ```

3. **Готово!** После успешного завершения workflow сайт будет доступен по адресу:
   ```
   https://dun4ev.com/
   ```

### Повторная публикация текущей версии из GitHub

После входа в GitHub CLI эта команда запускает workflow для удаленной ветки `main`.

```bash
npm run deploy
```

## ⚠️ Важно: API ключи

**Gemini API не будет работать на GitHub Pages!**

Переменные окружения недоступны на статическом хостинге. Нужно либо:
- Убрать функционал с API
- Использовать Vercel/Netlify вместо GitHub Pages

## 📝 Следующие шаги

1. Настройте GitHub Pages в Settings → Pages → Source: **GitHub Actions**
2. Запушьте код: `git push`
3. Проверьте деплой во вкладке **Actions** на GitHub
4. Откройте сайт: https://dun4ev.com/

---

Подробная инструкция: см. файл `DEPLOY.md`
