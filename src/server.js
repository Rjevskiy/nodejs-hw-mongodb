import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouter from './routes/contacts.js';

export const startServer = (PORT) => {
  const app = express();

  // Используем middleware
  app.use(pino());
  app.use(cors());
  app.use(express.json());

  // Пример маршрута
  app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

  // Роут для /contacts
  app.use('/contacts', contactsRouter);  // Добавляем роут для получения контактов

  // Обработчик несуществующих маршрутов
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
