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
    console.log('MongoDB підключена');

    const filePath = path.resolve('scripts', 'contacts.json');
    
    let contactsData;
    try {
      contactsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
      console.error('Помилка при читанні файлу contacts.json:', err);
      process.exit(1);
    }

    const tempUserId = new mongoose.Types.ObjectId(); 

    contactsData = contactsData.map(contact => ({
      ...contact,
      userId: tempUserId, 
    }));

    await Contact.deleteMany(); 
    console.log('Колекція очищена');

    await Contact.insertMany(contactsData); 
    console.log('Дані успішно імпортовані');

    mongoose.connection.close(); 
  })
  .catch((err) => {
    console.error('Помилка підключення:', err.message);
    mongoose.connection.close();
  });
