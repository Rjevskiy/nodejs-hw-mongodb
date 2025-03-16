import Contact from '../models/Contact.js';

// Получение всех контактов с фильтром, сортировкой, пагинацией
export const getAllContacts = async (filter, sortOptions, skip, limit) => {
  return await Contact.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sortOptions);
};

// Получение контакта по ID
export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

// Создание контакта
export const createContact = async ({ name, phoneNumber, email, isFavourite, contactType }) => {
  return await Contact.create({
    name,
    phoneNumber,
    email,
    isFavourite: isFavourite ?? false,
    contactType,
  });
};

// Обновление контакта
export const updateContact = async (contactId, updateData) => {
  return await Contact.findByIdAndUpdate(contactId, updateData, { new: true, runValidators: true });
};

// Удаление контакта
export const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};
