import express from 'express';
import { getAllContactsController, getContactController } from '../controllers/contactsController.js';

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContactsController);       // GET /contacts
contactsRouter.get('/:contactId', getContactController); // GET /contacts/:contactId

export default contactsRouter;
