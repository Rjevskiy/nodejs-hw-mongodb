import express from 'express';
import { addContact, patchContact } from '../controllers/contacts.js';  // Імпортуємо addContact

const contactsRouter = express.Router();

contactsRouter.post('/', addContact);  // Реєструємо маршрут для створення контакту
contactsRouter.patch('/:contactId', patchContact);  // Реєструємо маршрут для оновлення контакту

export { contactsRouter };
