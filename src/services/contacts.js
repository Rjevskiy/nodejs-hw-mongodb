import Contact from '../models/Contact.js';

// Получение всех контактов 
export const getAllContacts = async (filter, sortOptions, skip, limit) => {
  return await Contact.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sortOptions);
};

// Получение контакта
export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

// Создание контакта 
export const createContact = async ({ name, phoneNumber, email, isFavourite, contactType, userId }) => {
  return await Contact.create({
    name,
    phoneNumber,
    email,
    isFavourite: isFavourite ?? false,
    contactType,
    userId, 
  });
};

// Обновление контакта 
export const updateContact = async (contactId, userId, updateData) => {
  return await Contact.findOneAndUpdate({ _id: contactId, userId }, updateData, { new: true, runValidators: true });
};

// Удаление контакта 
export const deleteContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};
