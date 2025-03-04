import express from 'express';
import { getAllContacts, getContactById } from '../services/contacts.js';  

const contactsRouter = express.Router();  


contactsRouter.get('/', async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched all contacts',
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Failed to fetch contacts',
      error: err.message,
    });
  }
});


contactsRouter.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Failed to retrieve contact',
      error: err.message,
    });
  }
});

export { contactsRouter };  
