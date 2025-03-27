import createHttpError from "http-errors";
import { registerUser, loginUser, logoutUserService, verifyAndRefreshToken } from "../services/auth.js";

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

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.status(200).json({
      status: 200,
      message: "Successfully logged in an user!",
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUserController = async (req, res, next) => {
  try {
    await logoutUserService(req);

    res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "None" });
    res.clearCookie("accessToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "None" });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Контроллер для обновления токена
export const refreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createHttpError(401, "Refresh token is missing");
    }

    const newAccessToken = await verifyAndRefreshToken(refreshToken);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.status(200).json({
      status: 200,
      message: "Access token refreshed successfully!",
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    next(error);
  }
};
