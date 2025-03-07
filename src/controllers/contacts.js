import { createContact, updateContact } from '../services/contacts.js';
import createError from 'http-errors';

// Контролер для додавання нового контакту
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

// Контролер для оновлення контакту
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
