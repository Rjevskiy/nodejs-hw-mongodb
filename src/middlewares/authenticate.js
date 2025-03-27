import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../models/User.js";

const { ACCESS_TOKEN_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
      console.log("Заголовок Authorization отсутствует или некорректен");
      throw createHttpError(401, "Missing or invalid authorization header");
    }

    
    const token = authHeader.replace("Bearer ", "").trim();
    console.log("Extracted Token:", token);

    if (!ACCESS_TOKEN_SECRET) {
      console.log("ACCESS_TOKEN_SECRET не загружен!");
      throw createHttpError(500, "Server misconfiguration: missing token secret");
    }

    console.log("Проверка токена...");
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log("Token Decoded:", decoded);

    if (!decoded.id) {
      console.log("ID в токене отсутствует!");
      throw createHttpError(401, "Invalid access token");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("Пользователь не найден в БД!");
      throw createHttpError(401, "Invalid access token");
    }

    console.log("Пользователь авторизован:", user.email);

    req.user = user;
    next();
  } catch (error) {
    console.log("Ошибка аутентификации:", error.message);

    if (error.name === "TokenExpiredError") {
      next(createHttpError(401, "Access token expired"));
    } else {
      next(createHttpError(401, "Invalid access token"));
    }
  }
};

export default authenticate;
