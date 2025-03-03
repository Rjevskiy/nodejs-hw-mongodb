import express from 'express';
import { getContacts } from '../controllers/contactsController.js';  // Импортируем контроллер

const router = express.Router();

// Роут для получения всех контактов
router.get('/', getContacts);

export default router;  // Используем default экспорт
