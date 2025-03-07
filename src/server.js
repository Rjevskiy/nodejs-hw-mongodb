import express from 'express';
import { contactsRouter } from './routes/contacts.js';  // правильный импорт
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

export const startServer = (PORT) => {
  const app = express();

  app.use(express.json());  // Для обработки JSON в запросах

  app.use('/contacts', contactsRouter);  // Подключаем роутер

  app.use('*', notFoundHandler);  // Обработчик 404

  app.use(errorHandler);  // Глобальный обработчик ошибок

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
