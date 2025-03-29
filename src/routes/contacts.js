import express from "express";
import authenticate from "../middlewares/authenticate.js"; 
import {
  addContact,
  getAllContactsController,
  getContactController,
  patchContact,
  deleteContactController,
} from "../controllers/contacts.js";

const router = express.Router();


router.post("/", authenticate, addContact); 
router.get("/", authenticate, getAllContactsController); 
router.get("/:contactId", authenticate, getContactController); 
router.patch("/:contactId", authenticate, patchContact); 
router.delete("/:contactId", authenticate, deleteContactController); 

export default router;
