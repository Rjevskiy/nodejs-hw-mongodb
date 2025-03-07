import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { startServer } from './server.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log('MONGODB_USER:', process.env.MONGODB_USER);
console.log('MONGODB_URL:', process.env.MONGODB_URL);
console.log('MONGODB_DB:', process.env.MONGODB_DB);
console.log('PORT:', PORT);

const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
    startServer(PORT);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
