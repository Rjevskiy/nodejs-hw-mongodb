import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); 

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

const mongoURI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

export const initMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI); 
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};
