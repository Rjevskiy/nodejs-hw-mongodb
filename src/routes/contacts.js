import express from "express";
import {
  addContact,
  patchContact,
  getAllContactsController,
  getContactController,
  deleteContactController,
} from "../controllers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js"; 
import { contactSchema } from "../schemas/contactSchema.js";
import isValidId from "../middlewares/isValidId.js"; 

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContactsController);
contactsRouter.get("/:contactId", isValidId, getContactController);
contactsRouter.post("/", validateBody(contactSchema), addContact); 
contactsRouter.patch("/:contactId", isValidId, validateBody(contactSchema), patchContact);
contactsRouter.delete("/:contactId", isValidId, deleteContactController);

export default contactsRouter;
