import createHttpError from "http-errors";
import { registerUser, loginUser, logoutUserService } from "../services/auth.js";

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
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
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

    // Устанавливаем cookies с токенами
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(200).json({
      status: 200,
      message: "Successfully logged in an user!",
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

// Контроллер для логаута
export const logoutUserController = async (req, res, next) => {
  try {
    await logoutUserService(req);  // Вызовем сервис для удаления токенов

    res.status(204).send();  // Отправим статус 204 без тела ответа
  } catch (error) {
    next(error);
  }
};
