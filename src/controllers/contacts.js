import createHttpError from "http-errors";
import { registerUser } from "../services/auth.js";
import {
  createContact,
  updateContact,
  getAllContacts,
  getContactById,
  deleteContact,
} from "../services/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import Contact from "../models/Contact.js";

// Реєстрація користувача
export const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw createHttpError(400, "Відсутні обов’язкові поля");
    }

    const newUser = await registerUser({ name, email, password });

    res.status(201).json({
      status: 201,
      message: "Користувача успішно зареєстровано!",
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

// Створення 
const addContactFn = async (req, res) => {
  const { contactType, name, phone } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ status: 401, message: "Неавторизований доступ" });
  }

  if (!name || !phone) {
    return res.status(400).json({
      status: 400,
      message: "Ім’я та номер телефону обов’язкові",
    });
  }

  const validContactTypes = ["work", "home", "personal"];
  if (contactType && !validContactTypes.includes(contactType)) {
    return res.status(400).json({
      status: 400,
      message: `Невірний тип контакту. Можливі значення: ${validContactTypes.join(", ")}`,
    });
  }

  try {
    const photoUrl = req.file?.path || null;

    const newContact = await createContact({
      ...req.body,
      userId,
      photo: photoUrl,
    });

    res.status(201).json({
      status: 201,
      message: "Контакт успішно створено!",
      data: newContact,
    });
  } catch (error) {
    console.error(" Помилка при створенні контакту:", error.message);
    res.status(500).json({
      status: 500,
      message: "Помилка сервера під час створення контакту.",
    });
  }
};

// Оновлення 
const patchContactFn = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ status: 401, message: "Неавторизований доступ" });
  }

  if (!Object.keys(req.body).length && !req.file) {
    return res.status(400).json({
      status: 400,
      message: "Передайте хоча б одне поле для оновлення",
    });
  }

  try {
    const existingContact = await getContactById(contactId, userId);
    if (!existingContact) {
      return res.status(404).json({
        status: 404,
        message: "Контакт не знайдено",
      });
    }

    const photoUrl = req.file?.path || existingContact.photo;

    const updatedContact = await updateContact(contactId, userId, {
      ...req.body,
      photo: photoUrl,
    });

    res.status(200).json({
      status: 200,
      message: "Контакт успішно оновлено",
      data: updatedContact,
    });
  } catch (error) {
    console.error(" Помилка при оновленні контакту:", error.message);
    res.status(500).json({
      status: 500,
      message: "Помилка сервера під час оновлення контакту.",
    });
  }
};

// Отримання усіх контактів
const getAllContactsFn = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = "name",
    sortOrder = "asc",
    contactType,
    isFavourite,
  } = req.query;

  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ status: 401, message: "Неавторизований доступ" });
  }

  const filter = { userId };
  if (contactType) filter.contactType = contactType;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite === "true";

  const skip = (parseInt(page) - 1) * parseInt(perPage);
  const sortOptions = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

  try {
    const contacts = await getAllContacts(filter, sortOptions, skip, parseInt(perPage));
    const totalItems = await Contact.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / perPage);

    res.status(200).json({
      status: 200,
      message: "Контакти успішно отримано",
      data: {
        data: contacts,
        page: parseInt(page),
        perPage: parseInt(perPage),
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    console.error(" Помилка при отриманні контактів:", error.message);
    res.status(500).json({
      status: 500,
      message: "Помилка сервера під час отримання контактів.",
    });
  }
};

// Отримання контакту
const getContactFn = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ status: 401, message: "Неавторизований доступ" });
  }

  try {
    const contact = await getContactById(contactId, userId);
    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: "Контакт не знайдено",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Контакт успішно знайдено",
      data: contact,
    });
  } catch (error) {
    console.error(" Помилка при отриманні контакту:", error.message);
    res.status(500).json({
      status: 500,
      message: "Помилка сервера під час отримання контакту.",
    });
  }
};

// Видалення контакту
const deleteContactFn = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ status: 401, message: "Неавторизований доступ" });
  }

  try {
    const deletedContact = await deleteContact(contactId, userId);
    if (!deletedContact) {
      return res.status(404).json({
        status: 404,
        message: "Контакт не знайдено",
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(" Помилка при видаленні контакту:", error.message);
    res.status(500).json({
      status: 500,
      message: "Помилка сервера під час видалення контакту.",
    });
  }
};


export const addContact = ctrlWrapper(addContactFn);
export const patchContact = ctrlWrapper(patchContactFn);
export const getAllContactsController = ctrlWrapper(getAllContactsFn);
export const getContactController = ctrlWrapper(getContactFn);
export const deleteContactController = ctrlWrapper(deleteContactFn);
