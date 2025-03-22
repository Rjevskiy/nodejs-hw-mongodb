import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  addContact,
  patchContact,
  getAllContactsController,
  getContactController,
  deleteContactController,
} from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { contactSchema, updateContactSchema } from "../schemas/contactSchema.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

// 👇 Применяем authenticate ко всем роутам
contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContactsController); // Получаем все контакты для текущего пользователя
contactsRouter.get("/:contactId", isValidId, getContactController); // Получаем один контакт для текущего пользователя
contactsRouter.post("/", validateBody(contactSchema), addContact); // Создаем контакт для текущего пользователя
contactsRouter.patch("/:contactId", isValidId, validateBody(updateContactSchema), patchContact);
contactsRouter.delete("/:contactId", isValidId, deleteContactController);

export default contactsRouter;
