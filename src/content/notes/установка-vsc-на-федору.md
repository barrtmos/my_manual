---
title: Гит на новом ПК
date: 2026-01-26
structural: ИНСТРУКЦИИ
topics: ГИТ
draft: false
---
Удаляем старую историю Git 

rm -rf .git

Создаем чистую историю

git init

git add .

git commit -m "Initial commit"

Настраиваем ветку и связь с GitHub

git branch -M main

git remote add origin git@github.com:ваш\_логин/имя\_репозитория.git

Отправляем код на GitHub

git push -u origin main
