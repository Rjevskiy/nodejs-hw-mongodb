import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { startServer } from './server.js'; // Импорт функции запуска сервера
import { initMongoDB } from './db/initMongoConnection.js'; // Импорт функции подключения к MongoDB

dotenv.config();

const PORT = process.env.PORT || 3000;

// Логирование значений переменных окружения
console.log('MONGODB_USER:', process.env.MONGODB_USER);
console.log('MONGODB_PASSWORD:', process.env.MONGODB_PASSWORD);
console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('MONGODB_DB:', process.env.MONGODB_DB);

// Соединение с MongoDB
const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("MongoDB connected");
      startServer(); // Если подключение успешно, запускаем сервер
   })
   .catch(err => {
      console.error('MongoDB connection error: ', err.message);
   });
