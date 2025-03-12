import { createContact, updateContact, getAllContacts, getContactById, deleteContact } from '../services/contacts.js';
import createError from 'http-errors';
import ctrlWrapper from "../utils/ctrlWrapper.js";

// Проверка валидности на MongoDB
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Контроллер добавления контакта
const addContactFn = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createError(400, 'Missing required fields: name, phoneNumber, or contactType');
  }

  const newContact = await createContact({ name, phoneNumber, email, isFavourite, contactType });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

// Контроллер обновления контакта
const patchContactFn = async (req, res) => {
  const { contactId } = req.params;
  const updateData = req.body;

  if (!isValidObjectId(contactId)) {
    throw createError(400, 'Invalid contact ID format');
  }

  const existingContact = await getContactById(contactId);
  if (!existingContact) {
    throw createError(404, 'Contact not found');
  }

  const updatedContact = await updateContact(contactId, updateData);
  res.status(200).json({
    status: 200,
    message: 'Successfully updated the contact!',
    data: updatedContact,
  });
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
const getContactFn = async (req, res) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    throw createError(400, 'Invalid contact ID format');
  }

  const contact = await getContactById(contactId);
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

// Контроллер удаления контакта
const deleteContactFn = async (req, res) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    throw createError(400, 'Invalid contact ID format');
  }

  const deletedContact = await deleteContact(contactId);
  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();  
};

// Обернем контроллеры с помощью ctrlWrapper
export const addContact = ctrlWrapper(addContactFn);
export const patchContact = ctrlWrapper(patchContactFn);
export const getAllContactsController = ctrlWrapper(getAllContactsFn);
export const getContactController = ctrlWrapper(getContactFn);
export const deleteContactController = ctrlWrapper(deleteContactFn);
