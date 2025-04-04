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

// Маршруты для работы с контактами без префикса /auth
router.post("/", authenticate, upload.single('photo'), addContact);  // POST /auth/contacts
router.patch("/:contactId", authenticate, upload.single('photo'), patchContact);  // PATCH /auth/contacts/:contactId
router.get("/", authenticate, getAllContactsController);  // GET /auth/contacts
router.get("/:contactId", authenticate, getContactController);  // GET /auth/contacts/:contactId
router.delete("/:contactId", authenticate, deleteContactController);  // DELETE /auth/contacts/:contactId

export default router;
