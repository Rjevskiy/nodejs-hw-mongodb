import express from "express";
import  authenticate  from "../middlewares/authenticate.js"; // Исправленный импорт
import { validateBody } from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import {
  addContact,
  patchContact,
  getAllContactsController,
  getContactController,
  deleteContactController,
} from "../controllers/contacts.js";
import { contactSchema, updateContactSchema } from "../schemas/contactSchema.js";

const contactsRouter = express.Router();

// Защищаем маршруты авторизацией
contactsRouter.get("/", authenticate, getAllContactsController);
contactsRouter.get("/:contactId", authenticate, isValidId, getContactController);
contactsRouter.post("/", authenticate, validateBody(contactSchema), addContact);
contactsRouter.patch("/:contactId", authenticate, isValidId, validateBody(updateContactSchema), patchContact);
contactsRouter.delete("/:contactId", authenticate, isValidId, deleteContactController);

export default contactsRouter;
