import { getAllContacts } from '../services/contacts.js';  // Импортируем сервис

// Контроллер для обработки GET запроса на /contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();  // Получаем все контакты через сервис
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve contacts",
      error: err.message,
    });
  }
};
