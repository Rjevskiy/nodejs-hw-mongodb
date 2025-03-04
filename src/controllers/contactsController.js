import { getContactById, getAllContacts } from '../services/contacts.js';

// Получить все контакты
export const getAllContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved all contacts!',
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get contacts', error: err.message });
  }
};

// Получить один контакт по ID
export const getContactController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve contact', error: err.message });
  }
};

// Контроллер для GET /contacts/:contactId
export const getContact = async (req, res) => {
  const { contactId } = req.params; // Получаем ID из URL

  try {
    const contact = await getContactById(contactId); // Получаем контакт из сервиса

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' }); // Если нет контакта — 404
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve contact', error: err.message });
  }
};