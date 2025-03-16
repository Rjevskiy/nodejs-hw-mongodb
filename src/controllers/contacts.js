import { createContact, updateContact, getAllContacts, getContactById, deleteContact } from "../services/contacts.js";
import createError from "http-errors";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import Contact from "../models/Contact.js";

// Функция для добавления контакта
const addContactFn = async (req, res) => {
  const { contactType } = req.body;

  // Валидация для contactType
  const validContactTypes = ['work', 'home', 'personal'];
  if (contactType && !validContactTypes.includes(contactType)) {
    return res.status(400).json({
      status: 400,
      message: `Invalid contactType. Valid values are: ${validContactTypes.join(', ')}`,
    });
  }

  try {
    const newContact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: newContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Server error occurred while creating the contact.",
    });
  }
};

// Функция для обновления контакта
const patchContactFn = async (req, res) => {
  const { contactId } = req.params;

  const existingContact = await getContactById(contactId);
  if (!existingContact) {
    return res.status(404).json({
      status: 404,
    });
  }

  const { name, phoneNumber } = req.body;

  // Проверка на обязательные поля для обновления
  if (!name || !phoneNumber) {
    return res.status(400).json({
      status: 400,
      message: "\"name\" and \"phoneNumber\" are required",
    });
  }

  try {
    const updatedContact = await updateContact(contactId, req.body);
    res.status(200).json({
      status: 200,
      message: "Successfully updated the contact!",
      data: updatedContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Server error occurred while updating the contact.",
    });
  }
};

// Функция для получения всех контактов
const getAllContactsFn = async (req, res) => {
  const { page = 1, perPage = 10, sortBy = "name", sortOrder = "asc", contactType, isFavourite } = req.query;

  const filter = {};

  if (contactType) {
    filter.contactType = contactType;
  }

  if (isFavourite !== undefined) {
    filter.isFavourite = isFavourite === "true";
  }

  const skip = (parseInt(page) - 1) * parseInt(perPage);
  const sortOptions = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

  try {
    const contacts = await getAllContacts(filter, sortOptions, skip, parseInt(perPage));

    const totalItems = await Contact.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / perPage);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: {
        data: contacts,
        page: parseInt(page),
        perPage: parseInt(perPage),
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Server error occurred while retrieving contacts.",
    });
  }
};

// Функция для получения одного контакта
const getContactFn = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        status: 404,
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Server error occurred while retrieving the contact.",
    });
  }
};

// Функция для удаления контакта
const deleteContactFn = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContact(contactId);
  if (!deletedContact) {
    return res.status(404).json({
      status: 404,
    });
  }

  // ✅ Правильный ответ с 204 No Content (без тела)
  res.status(204).send();
};

export const addContact = ctrlWrapper(addContactFn);
export const patchContact = ctrlWrapper(patchContactFn);
export const getAllContactsController = ctrlWrapper(getAllContactsFn);
export const getContactController = ctrlWrapper(getContactFn);
export const deleteContactController = ctrlWrapper(deleteContactFn);
