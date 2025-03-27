import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import contactsRouter from "./routes/contacts.js";
import authRouter from "./routes/auth.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";


dotenv.config({ path: ".env" });


const requiredEnvVars = ["MONGODB_USER", "MONGODB_PASSWORD", "MONGODB_URL", "MONGODB_DB", "PORT"];
const requiredAuthVars = ["ACCESS_TOKEN_SECRET", "REFRESH_TOKEN_SECRET"];

[...requiredEnvVars, ...requiredAuthVars].forEach((envVar) => {
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


app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Роуты
app.use("/contacts", contactsRouter);
app.use("/auth", authRouter);


app.use(notFoundHandler);
app.use(errorHandler);

//  MongoDB
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
