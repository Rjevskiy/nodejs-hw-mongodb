// src/controllers/contacts.js
import { createContact, updateContact, getAllContacts, getContactById } from '../services/contacts.js';
import createError from 'http-errors';

// Контроллер для добавления нового контакта
export const addContact = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    return next(createError(400, 'Missing required fields: name, phoneNumber, or contactType'));
  }

  try {
    const newContact = await createContact({ name, phoneNumber, email, isFavourite, contactType });
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(createError(500, 'Error creating contact'));
  }
};

// Контроллер для обновления контакта
export const patchContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updateData = req.body;

  try {
    const updatedContact = await updateContact(contactId, updateData);
    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(createError(404, 'Contact not found'));
  }
};

// Контроллер для получения всех контактов
export const getAllContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved all contacts!',
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get contacts', error: err.message });
  }
};

// Контроллер для получения контакта по ID
export const getContactController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve contact', error: err.message });
  }
};
