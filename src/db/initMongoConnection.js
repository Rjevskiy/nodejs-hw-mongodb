import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Загружаем переменные окружения

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

// Строка подключения с использованием переменных окружения
const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

// Создаем MongoClient с объектом MongoClientOptions для установки версии стабильного API
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const initMongoDB = async () => {
  try {
    // Подключаем клиента к серверу (опционально начиная с версии v4.7)
    await client.connect();

    // Отправляем пинг для подтверждения успешного соединения
    await client.db(MONGODB_DB).command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Завершаем процесс, если не удалось подключиться
  } finally {
    // Убедитесь, что клиент будет закрыт после завершения/ошибки
    await client.close();
  }
};
