import Contact from '../models/Contact.js';

// Получение всех контактов с фильтром, сортировкой, пагинацией
export const getAllContacts = async ({ filter, sortBy, sortOrder, skip, limit }) => {
  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
  }
  
  return await Contact.find(filter).sort(sortOptions).skip(skip).limit(limit);
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
