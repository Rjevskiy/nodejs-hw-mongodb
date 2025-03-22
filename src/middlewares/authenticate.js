import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../models/User.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authenticate = async (req, res, next) => {
  try {
    // Логируем заголовки запроса
    console.log("👉 Authorization Header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("⛔ Заголовок Authorization отсутствует или некорректен");
      throw createHttpError(401, "Missing or invalid authorization header");
    }

    const token = authHeader.split(" ")[1]; // Извлекаем сам токен
    console.log("👉 Extracted Token:", token);

    // Проверяем токен
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log("✅ Token Decoded:", decoded);

    // Ищем пользователя в базе данных
    const user = await User.findById(decoded.id);
    console.log("👤 Найденный пользователь:", user);

    if (!user) {
      console.log("⛔ Пользователь не найден по ID из токена");
      throw createHttpError(401, "Invalid access token");
    }

    req.user = user; // Добавляем пользователя в запрос
    next();
  } catch (error) {
    console.log("⛔ Ошибка при проверке токена:", error.message);

    if (error.name === "TokenExpiredError") {
      next(createHttpError(401, "Access token expired"));
    } else {
      next(createHttpError(401, "Invalid access token"));
    }
  }
};

export default authenticate;
