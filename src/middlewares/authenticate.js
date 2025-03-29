import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../models/User.js";
import { tokenBlacklist } from "../controllers/auth.js";

const { ACCESS_TOKEN_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    console.log("Заголовок авторизації:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Заголовок Authorization відсутній або некоректний");
      throw createHttpError(401, "Відсутній або некоректний заголовок авторизації");
    }

    const token = authHeader.split(" ")[1];
    console.log("Витягнутий токен:", token);

    if (tokenBlacklist.has(token)) {
      console.log("Токен у чорному списку!");
      throw createHttpError(401, "Недійсний токен доступу (вийшов з системи)");
    }

    if (!ACCESS_TOKEN_SECRET) {
      console.log("ACCESS_TOKEN_SECRET не завантажений!");
      throw createHttpError(500, "Помилка конфігурації сервера: відсутній секретний ключ токена");
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log("🔍 Декодований токен:", decoded);

    if (!decoded.id) {
      console.log("ID у токені відсутній!");
      throw createHttpError(401, "Недійсний токен доступу");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("Користувача не знайдено в БД!");
      throw createHttpError(401, "Недійсний токен доступу");
    }

    console.log("Користувач авторизований:", user.email);

    req.user = user;
    next();
  } catch (error) {
    console.log("Помилка автентифікації:", error.message);

    if (error.name === "TokenExpiredError") {
      next(createHttpError(401, "Токен доступу закінчився"));
    } else {
      next(createHttpError(401, "Недійсний токен доступу"));
    }
  }
};

export default authenticate;
