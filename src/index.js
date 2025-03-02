import express from 'express';
import dotenv from 'dotenv';
import { startServer } from './server.js'; // Импортируем функцию запуска сервера
import { initMongoConnection } from './db/initMongoConnection.js'; // Импортируем функцию для подключения к MongoDB

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Устанавливаем соединение с MongoDB до запуска сервера
initMongoConnection()
  .then(() => {
    startServer();  // Если соединение с БД успешно, запускаем сервер
  })
  .catch((error) => {
    console.error('Error while connecting to MongoDB:', error.message);
  });
