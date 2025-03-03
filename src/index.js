import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { startServer } from './server.js'; // Импорт функции запуска сервера

dotenv.config();

const PORT = process.env.PORT || 3000;

// Логирование значений переменных окружения
console.log('MONGODB_USER:', process.env.MONGODB_USER);
console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('MONGODB_DB:', process.env.MONGODB_DB);
console.log('PORT:', PORT);

const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

// Подключение к MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('🔥 MongoDB connected');
    // После подключения к базе данных, запускаем сервер
    startServer(PORT);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
