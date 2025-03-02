import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

// Функция для установки соединения с MongoDB
export const initMongoConnection = async () => {
  const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Завершаем процесс, если соединение не удалось
  }
};
