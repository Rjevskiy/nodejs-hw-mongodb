import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import contactsRouter from './routes/contacts.js'; 
import authRouter from './routes/auth.js';  
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

dotenv.config();
console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);



const requiredEnvVars = ['MONGODB_USER', 'MONGODB_PASSWORD', 'MONGODB_URL', 'MONGODB_DB', 'PORT'];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());


app.use('/contacts', contactsRouter);
app.use('/auth', authRouter);  

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
    startServer();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
