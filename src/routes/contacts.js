import express from 'express';
import { getContacts, getContact  } from '../controllers/contactsController.js';  // Импортируем контроллер


const router = express.Router();

// Роут для получения всех контактов
router.get('/', getContacts);

// Роут для получения контакта по ID
router.get('contactsId', getContact);  // Используем обычное имя без двоеточия

export { router as contactsRouter };