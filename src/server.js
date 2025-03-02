// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Читаємо змінну оточення PORT
const PORT = Number(process.env.PORT) || 3000; // Если PORT не задан, по умолчанию будет 3000

export const startServer = () => {
  const app = express();

  // Используем middleware
  app.use(pino());  // Логирование запросов с помощью pino
  app.use(cors());   // Для разрешения CORS
  app.use(express.json()); // Для парсинга JSON тела запросов

  // Пример маршрута
  app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  // Обработчик несуществующих маршрутов (404 ошибка)
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
