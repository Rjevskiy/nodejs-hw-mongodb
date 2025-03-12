import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import contactsRouter from './routes/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import { initializeServer } from './server.js';

dotenv.config();

const requiredEnvVars = ['MONGODB_USER', 'MONGODB_PASSWORD', 'MONGODB_URL', 'MONGODB_DB', 'PORT'];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
    initializeServer(); 
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const app = express();
app.use(express.json());

app.use('/contacts', contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);
