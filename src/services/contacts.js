import Contact from '../models/Contact.js';

// Получение всех контактов
export const getAllContacts = async () => {
  return await Contact.find();
};

// Получение контакт ID
export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

// Создание контакта
export const createContact = async ({ name, phoneNumber, email, isFavourite, contactType }) => {
  const newContact = new Contact({
    name,
    phoneNumber,
    email: email || null,
    isFavourite: isFavourite ?? false,
    contactType,
  });
  return await newContact.save();
};

// Обновление 
export const updateContact = async (contactId, updateData) => {
  return await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
};

// Удаление 
export const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};
