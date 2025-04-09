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


router.post("/", authenticate, upload.single("photo"), addContact);
router.patch("/:contactId", authenticate, upload.single("photo"), patchContact);
router.get("/", authenticate, getAllContactsController);
router.get("/:contactId", authenticate, getContactController);
router.delete("/:contactId", authenticate, deleteContactController);

export default router;
