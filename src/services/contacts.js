import { v4 as uuidv4 } from 'uuid';

const contacts = []; // Временное хранилище (заменим на базу данных позже)

// Функция для получения всех контактов
export const getAllContacts = async () => {
  return contacts;
};

// Функция для получения контакта по ID
export const getContactById = async (id) => {
  return contacts.find((contact) => contact.id === id) || null;
};

// Функция для создания контакта
export const createContact = async ({ name, phoneNumber, email, isFavourite, contactType }) => {
  const newContact = {
    id: uuidv4(),
    name,
    phoneNumber,
    email: email || null,
    isFavourite: isFavourite ?? false,
    contactType,
  };

  contacts.push(newContact);
  return newContact;
};
