import express from "express";
import authenticate from "../middlewares/authenticate.js"; 
import { upload } from "../services/cloudinary.js"; // Импортируем настройку для загрузки файлов
import {
  addContact,
  getAllContactsController,
  getContactController,
  patchContact,
  deleteContactController,
} from "../controllers/contacts.js";

const router = express.Router();

// Обновляем роуты для обработки изображений
router.post("/", authenticate, upload.single('photo'), addContact); // Добавляем middleware для загрузки фото
router.patch("/:contactId", authenticate, upload.single('photo'), patchContact); // Добавляем middleware для загрузки фото
router.get("/", authenticate, getAllContactsController); 
router.get("/:contactId", authenticate, getContactController); 
router.delete("/:contactId", authenticate, deleteContactController); 

export default router;


