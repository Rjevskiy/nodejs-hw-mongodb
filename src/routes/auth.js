import express from "express";
import { registerUserController, loginUserController, logoutUserController } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);  // Новый роут для логаута

export default router;
