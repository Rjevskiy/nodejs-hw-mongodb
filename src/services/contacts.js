import Contact from '../models/Contact.js';

 

// Отримання всіх контактів
export const getAllContacts = async (filter = {}, sortOptions = {}, skip = 0, limit = 10) => {

  if (!filter.userId) {
    throw new Error('userId обов\'язковий');
  }

  return await Contact.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sortOptions);
};

// Отримання контакту за ID
export const getContactById = async (contactId, userId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId, userId });
    return contact;
  } catch (error) {
    throw new Error("Помилка при отриманні контакту за ID");
  }
};

// Створення контакту
export const createContact = async ({ name, phoneNumber, email, isFavourite, contactType, userId, photo }) => {
  const newContact = new Contact({
    name,
    phoneNumber,
    email,
    isFavourite: isFavourite ?? false,
    contactType,
    userId,
    photo, 
  });

  return newContact.save();
};


// Оновлення контакту
export const updateContact = async (contactId, userId, { name, phoneNumber, email, isFavourite, contactType, photo }) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    { name, phoneNumber, email, isFavourite, contactType, photo },
    { new: true, runValidators: true }
  );

  return updatedContact;
};


// Видалення контакту
export const deleteContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};
