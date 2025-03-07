import fs from 'fs';
import path from 'path';

// Получаем путь до текущего файла и определяем путь до contacts.json
const __dirname = path.dirname(new URL(import.meta.url).pathname); // Имитация __dirname для ES модулей
const contactsFilePath = path.join(__dirname, '../../scripts/contacts.json'); // Путь к вашему JSON файлу

// Чтение контактов из JSON файла
const readContactsFromFile = () => {
  try {
    const data = fs.readFileSync(contactsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts file:', error);
    return [];
  }
};

// Запись контактов в JSON файл
const writeContactsToFile = (contacts) => {
  try {
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing contacts to file:', error);
  }
};

// Функция для создания нового контакта
export const createContact = ({ name, phoneNumber, email, isFavourite, contactType }) => {
  const contacts = readContactsFromFile();
  const newContact = {
    id: Date.now().toString(), // Генерация уникального ID с помощью timestamp
    name,
    phoneNumber,
    email: email || null,
    isFavourite: isFavourite ?? false,
    contactType,
  };
  contacts.push(newContact);
  writeContactsToFile(contacts);
  return newContact;
};

// Функция для обновления существующего контакта
export const updateContact = (contactId, updateData) => {
  const contacts = readContactsFromFile();
  const contactIndex = contacts.findIndex(contact => contact.id === contactId);

  if (contactIndex === -1) {
    throw new Error('Contact not found');
  }

  const updatedContact = { ...contacts[contactIndex], ...updateData };
  contacts[contactIndex] = updatedContact;
  writeContactsToFile(contacts);

  return updatedContact;
};

// Функция для получения всех контактов
export const getAllContacts = () => {
  return readContactsFromFile();
};

// Функция для получения контакта по ID
export const getContactById = (contactId) => {
  const contacts = readContactsFromFile();
  return contacts.find(contact => contact.id === contactId);
};
