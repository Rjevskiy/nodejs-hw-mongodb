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

// Контроллер для обработки GET запроса на /contacts/:contactId
export const getContact = async (req, res) => {
  const { contactId } = req.params;  // Получаем id

  try {
    const contact = await getContactById(contactId);  // Получаем контакт из базы

    if (!contact) {
      // Если контакт не найден, возвращаем ошибку
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    // Если контакт найден
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Failed to retrieve contact',
      error: err.message,
    });
  }
};
