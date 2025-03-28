import express from "express";
import authenticate from "../middlewares/authenticate.js"; // Импортируем middleware для аутентификации
import {
  addContact,
  getAllContactsController,
  getContactController,
  patchContact,
  deleteContactController,
} from "../controllers/contacts.js";

const router = express.Router();

// Применяем middleware для защиты роутов
router.post("/", authenticate, addContact); // Добавить контакт
router.get("/", authenticate, getAllContactsController); // Получить все контакты
router.get("/:contactId", authenticate, getContactController); // Получить контакт по ID
router.patch("/:contactId", authenticate, patchContact); // Обновить контакт
router.delete("/:contactId", authenticate, deleteContactController); // Удалить контакт

export default router;
