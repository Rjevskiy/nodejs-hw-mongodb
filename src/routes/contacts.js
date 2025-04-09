// src/routes/contacts.js
import express from "express";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";  
import {
  addContact,
  getAllContactsController,
  getContactController,
  patchContact,
  deleteContactController,
} from "../controllers/contacts.js";

const router = express.Router();

// Создание контакта
router.post("/", authenticate, upload.single("photo"), addContact);

// Обновление контакта
router.patch("/:contactId", authenticate, upload.single("photo"), patchContact);

// Получение всех контактов
router.get("/", authenticate, getAllContactsController);

// Получение одного контакта
router.get("/:contactId", authenticate, getContactController);

// Удаление контакта
router.delete("/:contactId", authenticate, deleteContactController);

export default router;
