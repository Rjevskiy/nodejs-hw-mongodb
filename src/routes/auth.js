import express from "express";
import { validateBody } from "../middlewares/validateBody.js"; 
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
  sendResetEmailController,
  resetPasswordController
} from "../controllers/auth.js";
import { registerSchema, loginSchema, resetPasswordSchema } from "../schemas/authSchema.js"; 
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), registerUserController);
router.post("/login", validateBody(loginSchema), loginUserController);
router.post("/logout", authenticate, logoutUserController);
router.post("/refresh", refreshTokenController);
router.post("/send-reset-email", sendResetEmailController);

router.post("/reset-pwd", validateBody(resetPasswordSchema), resetPasswordController);

export default router;



