import {
  createContact,
  updateContact,
  getAllContacts,
  getContactById,
  deleteContact,
} from "../services/contacts.js";
import createError from "http-errors";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const addContactFn = async (req, res) => {
  const newContact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: newContact,
  });
};

const patchContactFn = async (req, res) => {
  const { contactId } = req.params;

  const existingContact = await getContactById(contactId);
  if (!existingContact) {
    throw createError(404, "Contact not found");
  }

  const updatedContact = await updateContact(contactId, req.body);
  res.status(200).json({
    status: 200,
    message: "Successfully updated the contact!",
    data: updatedContact,
  });
};

const getAllContactsFn = async (req, res) => {
  const { page = 1, limit = 10, sortBy = "name", sortOrder = "asc", contactType, isFavourite } = req.query;

  const filter = {};
  if (contactType) filter.contactType = contactType;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite === "true";

  const skip = (page - 1) * limit;
  const sortOptions = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

  const contacts = await getAllContacts(filter, sortOptions, skip, Number(limit));

  res.status(200).json({
    message: "Successfully retrieved contacts!",
    data: contacts,
  });
};

const getContactFn = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    throw createError(404, "Contact not found");
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

const deleteContactFn = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContact(contactId);
  if (!deletedContact) {
    throw createError(404, "Contact not found");
  }

  res.status(204).send();
};

export const addContact = ctrlWrapper(addContactFn);
export const patchContact = ctrlWrapper(patchContactFn);
export const getAllContactsController = ctrlWrapper(getAllContactsFn);
export const getContactController = ctrlWrapper(getContactFn);
export const deleteContactController = ctrlWrapper(deleteContactFn);
