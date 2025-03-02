import express from 'express';
import dotenv from 'dotenv';
import { startServer } from './server.js'; // Импорт функции запуска сервера
import { initMongoDB } from './db/initMongoConnection.js'; // Импорт функции подключения к MongoDB

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Устанавливаем соединение с MongoDB перед запуском сервера
initMongoDB()
  .then(() => {
    startServer();  // Если соединение с БД успешно, запускаем сервер
  })
  .catch((error) => {
    console.error('Error while connecting to MongoDB:', error.message);
  });
