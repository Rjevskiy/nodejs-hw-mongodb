import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Contact from '../models/Contact.js';

dotenv.config();

const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log(' MongoDB подключена');

    
    const filePath = path.resolve('scripts', 'contacts.json');  
    const contactsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    
    await Contact.deleteMany();
    console.log(' Коллекция очищена');

    
    await Contact.insertMany(contactsData);
    console.log(' Данные успешно импортированы');

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(' Ошибка подключения:', err.message);
    mongoose.connection.close();
  });
