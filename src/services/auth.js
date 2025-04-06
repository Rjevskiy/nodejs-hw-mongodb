import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("Access or Refresh Token Secret is missing!");
}

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, "Invalid email or password");
  }

  const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: "150m" });
  const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

  return { accessToken, refreshToken };
};

export const resetPasswordService = async (token, newPassword) => {
  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      throw createHttpError(404, "User not found!");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return user;
  } catch (error) {
    throw createHttpError(401, "Token is expired or invalid.");
  }
};

export const logoutUserService = (req) => {
  return new Promise((resolve) => {
    req.res.clearCookie("accessToken");
    req.res.clearCookie("refreshToken");
    resolve();
  });
};

export const verifyAndRefreshToken = async (refreshToken) => {
  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign({ id: payload.id }, ACCESS_TOKEN_SECRET, { expiresIn: "150m" });
    return newAccessToken;
  } catch (error) {
    throw createHttpError(403, "Invalid or expired refresh token");
  }
};
