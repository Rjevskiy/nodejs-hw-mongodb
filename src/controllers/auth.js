import createHttpError from "http-errors";
import { registerUser } from "../services/auth.js";


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
