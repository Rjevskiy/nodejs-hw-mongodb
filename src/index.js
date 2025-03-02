// src/index.js

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Настроим pino для логирования HTTP запросов
app.use(
  pino({
    transport: {
      target: 'pino-pretty', // форматируем логи для красивого вывода в консоль
    },
  })
);

// Middleware
app.use(cors());              // Разрешаем CORS для всех запросов
app.use(express.json());       // Для парсинга JSON в теле запроса

// Пример маршрута
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Обработчик несуществующих маршрутов (404 ошибка)
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Порт из переменной окружения или 3000 по умолчанию
const PORT = process.env.PORT || 3000;

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
