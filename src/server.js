import express from "express";
import morgan from "morgan";
import contactsRouter from "./routes/contacts.js";
import authRouter from "./routes/auth.js"; 
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
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

app._router.stack.forEach((layer) => {
  if (layer.route) {
    console.log("Registered route:", layer.route.path, "Methods:", layer.route.methods);
  }
});


export const initializeServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
};

initializeServer();
