import dotenv from 'dotenv';
dotenv.config(); // Загрузка переменных окружения

import { MongoClient, ServerApiVersion } from 'mongodb';

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const initMongoDB = async () => {
  try {
    await client.connect();
    await client.db(MONGODB_DB).command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
};
