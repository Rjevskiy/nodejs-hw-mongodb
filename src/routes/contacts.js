import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { upload } from "../services/cloudinary.js";
import {
  addContact,
  getAllContactsController,
  getContactController,
  patchContact,
  deleteContactController,
} from "../controllers/contacts.js";

const router = express.Router();

// Маршруты для контактов
router.post("/", authenticate, upload.single('photo'), addContact);  // Добавление контакта
router.patch("/:contactId", authenticate, upload.single('photo'), patchContact);  // Обновление контакта с фото
router.get("/", authenticate, getAllContactsController);  // Получение всех контактов
router.get("/:contactId", authenticate, getContactController);  // Получение контакта по ID
router.delete("/:contactId", authenticate, deleteContactController);  // Удаление контакта

export default router;
