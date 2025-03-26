import dotenv from 'dotenv';

import mongoose from 'mongoose';


dotenv.config({ path: './.env' });

//console.log(process.env);
//console.log('All environment variables:', process.env);  // Это выведет все переменные окружения
//console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
//console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);

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
