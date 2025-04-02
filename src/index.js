import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import contactsRouter from "./routes/contacts.js";
import authRouter from "./routes/auth.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

dotenv.config({ path: ".env" });

// Перевірка наявності змінних середовища
const requiredEnvVars = [
  "MONGODB_USER", "MONGODB_PASSWORD", "MONGODB_URL", "MONGODB_DB", "PORT",
  "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET", 
  "SMTP_PASSWORD", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_FROM", "APP_DOMAIN", "JWT_SECRET"
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Ошибка: Переменная окружения ${envVar} отсутствует!`);
    process.exit(1);
  }
});

console.log("Загруженные переменные окружения:", {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ? "Загружен" : "Нет",
});

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// Маршрути
app.use("/contacts", contactsRouter);
app.use("/auth", authRouter);

// Обробка помилок
app.use(notFoundHandler);
app.use(errorHandler);

// MongoDB
const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB подключена!");
    app.listen(process.env.PORT, () => {
      console.log(`Сервер запущен на http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Ошибка подключения к MongoDB:", err.message);
    process.exit(1);
  });
