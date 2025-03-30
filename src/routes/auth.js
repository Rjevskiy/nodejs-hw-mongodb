import express from "express";
import { 
  registerUserController, 
  loginUserController, 
  logoutUserController, 
  refreshTokenController, 
  sendResetEmailController 
} from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerSchema, loginSchema, resetEmailSchema } from "../schemas/authSchema.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), registerUserController);
router.post("/login", validateBody(loginSchema), loginUserController);
router.post("/logout", logoutUserController);
router.post("/refresh", refreshTokenController);
router.post("/send-reset-email", validateBody(resetEmailSchema), sendResetEmailController);

export default router;