
import Contact from '../models/Contact.js';


// Получение всех контактов с фильтрацией, сортировкой и пагинацией
export const getAllContacts = async (filter = {}, sortOptions = {}, skip = 0, limit = 10) => {
  // Добавляем фильтр по userId, если он не был передан
  if (!filter.userId) {
    throw new Error('userId is required');
  }

  return await Contact.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sortOptions);
};


// Получение контакта по ID
export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};


// Создание контакта
export const createContact = async ({ name, phoneNumber, email, isFavourite, contactType, userId, photo }) => {
  const newContact = new Contact({
    name,
    phoneNumber,
    email,
    isFavourite: isFavourite ?? false,
    contactType,
    userId,
    photo, // Сохраняем URL фото
  });

  return newContact.save();
};


// Обновление контакта
export const updateContact = async (contactId, userId, { name, phoneNumber, email, isFavourite, contactType, photo }) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    { name, phoneNumber, email, isFavourite, contactType, photo },
    { new: true, runValidators: true }
  );

  return updatedContact;
};


// Удаление контакта
export const deleteContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};
