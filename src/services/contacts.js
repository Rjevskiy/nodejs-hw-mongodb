import fs from 'fs';
import path from 'path';

// Отримуємо шлях до поточного файлу та визначаємо шлях до contacts.json
const __dirname = path.dirname(new URL(import.meta.url).pathname); // Імітація __dirname для ES модулів
const contactsFilePath = path.join(__dirname, '../../scripts/contacts.json'); // Шлях до вашого JSON файлу

// Читання контактів з JSON файлу
const readContactsFromFile = () => {
  try {
    const data = fs.readFileSync(contactsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts file:', error);
    return [];
  }
};

// Запис контактів у JSON файл
const writeContactsToFile = (contacts) => {
  try {
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing contacts to file:', error);
  }
};

// Функція для створення нового контакту
export const createContact = ({ name, phoneNumber, email, isFavourite, contactType }) => {
  const contacts = readContactsFromFile();
  const newContact = {
    id: Date.now().toString(), // Генерація унікального ID за допомогою timestamp
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

// Функція для оновлення існуючого контакту
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
