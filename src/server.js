import express from 'express';
import dotenv from 'dotenv';
import { initMongoDB } from './db/initMongoConnection.js'; // Подключаем функцию для инициализации MongoDB
import pino from 'pino-http';
import cors from 'cors';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

export const startServer = () => {
  const app = express();

  // Используем middleware
  app.use(pino());
  app.use(cors());
  app.use(express.json());

  // Пример маршрута
  app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  // Обработчик несуществующих маршрутов
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Инициализация базы данных и запуск сервера
initMongoDB().then(() => {
  startServer();
}).catch(error => {
  console.error('Error while connecting to MongoDB:', error.message);
});
