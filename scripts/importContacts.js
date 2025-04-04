  import mongoose from 'mongoose';
  import fs from 'fs';
  import path from 'path';
  import dotenv from 'dotenv';
  import Contact from '../src/models/Contact.js';

  dotenv.config();

  const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

  mongoose
    .connect(mongoURI)
    .then(async () => {
      console.log('MongoDB подключена');

      const filePath = path.resolve('scripts', 'contacts.json');
      
      let contactsData;
      try {
        contactsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (err) {
        console.error('Ошибка чтения файла contacts.json:', err);
        process.exit(1);
      }

      // Добавим временный userId для каждого контакта
      const tempUserId = new mongoose.Types.ObjectId(); // Генерируем новый ObjectId

      contactsData = contactsData.map(contact => ({
        ...contact,
        userId: tempUserId, // Добавляем этот userId ко всем контактам
      }));

      await Contact.deleteMany();
      console.log('Коллекция очищена');

      await Contact.insertMany(contactsData);
      console.log('Данные успешно импортированы');

      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('Ошибка подключения:', err.message);
      mongoose.connection.close();
    });
