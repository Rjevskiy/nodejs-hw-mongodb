import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { 
  registerUser, 
  loginUser, 
  logoutUserService, 
  verifyAndRefreshToken 
} from "../services/auth.js";
import bcrypt from "bcrypt";
import { sendResetEmail } from "../services/email.js";  // Импортируем sendResetEmail

const tokenBlacklist = new Set();  // Единственное объявление
const { JWT_SECRET, APP_DOMAIN } = process.env;

export const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw createHttpError(400, "Missing required fields");
    }
    const newUser = await registerUser({ name, email, password });
    res.status(201).json({
      status: 201,
      message: "Successfully registered a user!",
      data: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw createHttpError(400, "Missing required fields");
    }
    const { accessToken, refreshToken } = await loginUser(email, password);
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "None" });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "None" });
    res.status(200).json({ status: 200, message: "Successfully logged in!", data: { accessToken } });
  } catch (error) {
    next(error);
  }
};

export const logoutUserController = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is missing" });
    }
    if (accessToken) tokenBlacklist.add(accessToken);
    await logoutUserService(req);  // Вызовем logoutUserService, который очистит куки
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw createHttpError(401, "Refresh token is missing");
    }
    const newAccessToken = await verifyAndRefreshToken(refreshToken);
    res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true, sameSite: "None" });
    res.status(200).json({ status: 200, message: "Token refreshed!", data: { accessToken: newAccessToken } });
  } catch (error) {
    next(error);
  }
};

export const sendResetEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;
    // Проверяем наличие пользователя
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, "User not found!");
    }
    await sendResetEmail(email);  // Вызываем функцию из сервиса email для отправки письма
    res.status(200).json({ status: 200, message: "Reset email sent!" });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      throw createHttpError(400, "Missing required fields");
    }

    // Проверяем, не был ли этот токен уже использован
    if (tokenBlacklist.has(token)) {
      throw createHttpError(401, "Token is expired or invalid.");
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw createHttpError(401, "Token is expired or invalid.");
    }

    // Логируем email, на который будет отправлен сброс пароля
    console.log("Email to reset password:", payload.email);

    const user = await User.findOne({ email: payload.email });
    if (!user) {
      throw createHttpError(404, "User not found!");
    }

    // Хешируем новый пароль перед сохранением
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    // Добавляем токен в черный список, чтобы его нельзя было повторно использовать
    tokenBlacklist.add(token);

    // ❗ Удаляем активные сессии пользователя (если они хранятся в базе)
    user.refreshToken = null; // Например, если refreshToken хранится в БД
    await user.save();

    res.status(200).json({ 
      status: 200, 
      message: "Password has been successfully reset.", 
      data: {} 
    });
  } catch (error) {
    next(error);
  }
};

export { tokenBlacklist };
