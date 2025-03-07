import express from 'express';
import { addContact, patchContact, getAllContactsController, getContactController } from '../controllers/contacts.js';

const contactsRouter = express.Router();

contactsRouter.post('/', addContact);  // создание контакта
contactsRouter.get('/', getAllContactsController);  // получение всех контактов
contactsRouter.get('/:contactId', getContactController);  // получение контакта по ID
contactsRouter.patch('/:contactId', patchContact);  // обновление контакта

export { contactsRouter };
