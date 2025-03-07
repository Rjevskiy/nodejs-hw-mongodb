import express from 'express';
import { contactsRouter } from './routes/contacts.js'; // ✅ Правильный импорт
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

export const startServer = (PORT) => {
  const app = express();

  app.use(express.json());

  app.use('/contacts', contactsRouter);

  app.use('*', notFoundHandler); // Обработчик 404

  app.use(errorHandler); // Глобальный обработчик ошибок

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
