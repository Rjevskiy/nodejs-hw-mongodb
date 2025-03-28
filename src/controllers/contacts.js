import createHttpError from 'http-errors';
import { registerUser } from '../services/auth.js';
import { createContact, updateContact, getAllContacts, getContactById, deleteContact } from '../services/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import Contact from '../models/Contact.js';


export const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw createHttpError(400, 'Missing required fields');
    }

    const newUser = await registerUser({ name, email, password });

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};


const addContactFn = async (req, res) => {
  const { contactType } = req.body;
  const userId = req.user._id; 

  const validContactTypes = ['work', 'home', 'personal'];
  if (contactType && !validContactTypes.includes(contactType)) {
    return res.status(400).json({
      status: 400,
      message: `Invalid contactType. Valid values are: ${validContactTypes.join(', ')}`,
    });
  }

  try {
    const newContact = await createContact({ ...req.body, userId }); 
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Server error occurred while creating the contact.',
    });
  }
};


const patchContactFn = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id; 

  const existingContact = await getContactById(contactId, userId); 
  if (!existingContact) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
    });
  }

  const { name, phoneNumber } = req.body;

  if (!name || !phoneNumber) {
    return res.status(400).json({
      status: 400,
      message: '"name" and "phoneNumber" are required',
    });
  }

  try {
    const updatedContact = await updateContact(contactId, userId, req.body); 
    res.status(200).json({
      status: 200,
      message: 'Successfully updated the contact!',
      data: updatedContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Server error occurred while updating the contact.',
    });
  }
};


const getAllContactsFn = async (req, res) => {
  const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', contactType, isFavourite } = req.query;
  const userId = req.user._id;

  const filter = { userId };

  if (contactType) {
    filter.contactType = contactType;
  }

  if (isFavourite !== undefined) {
    filter.isFavourite = isFavourite === 'true';
  }

  const skip = (parseInt(page) - 1) * parseInt(perPage);
  const sortOptions = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  try {
    // Получаем контакты с использованием фильтра и сортировки
    const contacts = await getAllContacts(filter, sortOptions, skip, parseInt(perPage));

    const totalItems = await Contact.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / perPage);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
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
      message: 'Server error occurred while retrieving contacts.',
    });
  }
};


const getContactFn = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  try {
    const contact = await getContactById(contactId, userId); 
    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
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
      message: 'Server error occurred while retrieving the contact.',
    });
  }
};


const deleteContactFn = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id; 

  const deletedContact = await deleteContact(contactId, userId); 
  if (!deletedContact) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
    });
  }

  res.status(204).send();
};


export const addContact = ctrlWrapper(addContactFn);
export const patchContact = ctrlWrapper(patchContactFn);
export const getAllContactsController = ctrlWrapper(getAllContactsFn);
export const getContactController = ctrlWrapper(getContactFn);
export const deleteContactController = ctrlWrapper(deleteContactFn);
