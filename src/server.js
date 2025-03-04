import express from 'express';
import { contactsRouter } from './routes/contacts.js';  // Импортируем роут для контактов

// Функция для запуска сервера
export const startServer = (PORT) => {
  const app = express();  // Создаем экземпляр Express

  // Используем middleware
  app.use(express.json());  // Для парсинга JSON в теле запроса

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
