import { createContact, updateContact, getAllContacts, getContactById, deleteContact } from '../services/contacts.js';
import createError from 'http-errors';
import ctrlWrapper from "../utils/ctrlWrapper.js";

// Проверка валидности на MongoDB
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Контроллер добавления контакта
const addContactFn = async (req, res, next) => {
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

// Контроллер обновления контакта
const patchContactFn = async (req, res, next) => {
  const { contactId } = req.params;
  const updateData = req.body;

  if (!isValidObjectId(contactId)) {
    return next(createError(400, 'Invalid contact ID format'));
  }

  try {
    const existingContact = await getContactById(contactId);
    if (!existingContact) {
      return next(createError(404, 'Contact not found'));
    }

    const updatedContact = await updateContact(contactId, updateData);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated the contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(createError(500, 'Error updating contact'));
  }
};

// Контроллер получения всех контактов
const getAllContactsFn = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    message: "Successfully retrieved all contacts!",
    data: contacts,
  });
};

// Контроллер получения контакта по ID
const getContactFn = async (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(createError(400, 'Invalid contact ID format'));
  }

  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return next(createError(404, 'Contact not found'));
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(createError(500, 'Failed to retrieve contact'));
  }
};

// Контроллер удаления 
const deleteContactFn = async (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(createError(400, 'Invalid contact ID format'));
  }

  try {
    const deletedContact = await deleteContact(contactId);
    if (!deletedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(204).send();  
  } catch (err) {
    next(createError(500, 'Failed to delete contact'));
  }
};


export const addContact = ctrlWrapper(addContactFn);
export const patchContact = ctrlWrapper(patchContactFn);
export const getAllContactsController = ctrlWrapper(getAllContactsFn);
export const getContactController = ctrlWrapper(getContactFn);
export const deleteContactController = ctrlWrapper(deleteContactFn);
