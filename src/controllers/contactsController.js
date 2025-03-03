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

export const getContact = async (req, res) => {
    console.log('Получен запрос на контакт с ID:', req.params.contactId);  // Логируем ID
  
    try {
      const contact = await getContactById(req.params.contactId);  // Получаем контакт по ID
  
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });  // Если не найден, возвращаем ошибку
      }
  
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${req.params.contactId}!`,
        data: contact,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Failed to retrieve contact",
        error: err.message,
      });
    }
  };
