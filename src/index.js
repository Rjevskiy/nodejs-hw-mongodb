import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { startServer } from './server.js'; // Импорт функции запуска сервера
import { initMongoDB } from './db/initMongoConnection.js'; // Импорт функции подключения к MongoDB

dotenv.config();

const PORT = process.env.PORT || 3000;

// Логирование значений переменных окружения
console.log('MONGODB_USER:', process.env.MONGODB_USER);
console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD ? '******' : 'Not set'); // Скрываем пароль
console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('MONGODB_DB:', process.env.MONGODB_DB);
console.log('PORT:', PORT);

const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('🔥 MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

