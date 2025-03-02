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

  const mongoose = require('mongoose');
const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.log("MongoDB connection error: ", err));
