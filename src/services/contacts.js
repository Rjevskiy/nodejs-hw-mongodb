import Contact from '../models/Contact.js';  // Импортируем модель Contact

// Функция для получения всех контактов
export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();  // Получаем все контакты из коллекции
    return contacts;
  } catch (err) {
    throw new Error(`Error fetching contacts: ${err.message}`);
  }
};
