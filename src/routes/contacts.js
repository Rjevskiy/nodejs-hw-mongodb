import express from 'express';
import { getAllContacts, getContactById, createContact } from '../services/contacts.js';
import { addContact } from '../controllers/contacts.js';

const contactsRouter = express.Router();

contactsRouter.get('/', async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({ status: 200, message: 'Successfully fetched all contacts', data: contacts });
  } catch (err) {
    next(err);
  }
});

contactsRouter.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      throw createError(404, 'Contact not found');
    }
    res.status(200).json({ status: 200, message: `Successfully found contact with id ${req.params.contactId}!`, data: contact });
  } catch (err) {
    next(err);
  }
});

contactsRouter.post('/', addContact);

export { contactsRouter }; // ✅ Именованный экспорт
