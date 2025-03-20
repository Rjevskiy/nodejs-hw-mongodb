import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import User from "../models/User.js";

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
