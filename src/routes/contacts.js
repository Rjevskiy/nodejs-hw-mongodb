import express from 'express';
import { addContact, patchContact, getAllContactsController, getContactController, deleteContactController } from '../controllers/contacts.js';

const contactsRouter = express.Router();

contactsRouter.post('/', addContact);
contactsRouter.patch('/:contactId', patchContact);
contactsRouter.get('/', getAllContactsController);
contactsRouter.get('/:contactId', getContactController);
contactsRouter.delete('/:contactId', deleteContactController);

export default contactsRouter; 
