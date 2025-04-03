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

//  обработка изображений
router.post("/", authenticate, upload.single('photo'), addContact); 
router.patch("/:contact", authenticate, upload.single('photo'), patchContact); 
router.get("/", authenticate, getAllContactsController); 
router.get("/:contact", authenticate, getContactController); 
router.delete("/:contact", authenticate, deleteContactController); 

export default router;

