import createHttpError from "http-errors";
import { registerUser, loginUser } from "../services/auth.js";

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

    const accessToken = await loginUser(email, password);

    res.status(200).json({
      status: 200,
      message: "Successfully logged in an user!",
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};
