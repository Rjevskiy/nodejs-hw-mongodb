import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";  
import YAML from "yamljs";  
import path from "path";
import { fileURLToPath } from "url";

import contactsRouter from "./routes/contacts.js";
import authRouter from "./routes/auth.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

import { resetPasswordController } from "./controllers/auth.js";
import { validateBody } from "./middlewares/validateBody.js";
import { resetPasswordSchema } from "./schemas/authSchema.js";


dotenv.config({ path: ".env" });

const requiredEnvVars = [
  "MONGODB_USER", "MONGODB_PASSWORD", "MONGODB_URL", "MONGODB_DB", "PORT",
  "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET", 
  "SMTP_PASSWORD", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_FROM", "APP_DOMAIN", "JWT_SECRET"
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Помилка: Змінна середовища ${envVar} відсутня!`);
    process.exit(1);
  }
});

console.log("Завантажені змінні середовища:", {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ? "Завантажено" : "Немає",
});

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = YAML.load(path.join(__dirname, "..", "docs", "swagger", "openapi.yaml"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/reset-pwd", validateBody(resetPasswordSchema), resetPasswordController);
app.use("/auth", authRouter);
app.use("/contacts", contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

// Підключення до MongoDB
const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Підключено до MongoDB!");
    app.listen(process.env.PORT, () => {
      console.log(`Сервер запущено на http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Помилка підключення до MongoDB:", err.message);
    process.exit(1);
  });
