import { getContactById, getAllContacts } from '../services/contacts.js';

// Отримання усіх контактів
export const getAllContactsController = async (req, res) => {
  try {
    console.log("Запит на отримання всіх контактів");

    const { page = 1, limit = 10, sort = 'name', filter = {} } = req.query;
    const skip = (page - 1) * limit;
    const sortOptions = { [sort]: 1 };

    const userId = req.user.id;
    filter.userId = userId;

    const contacts = await getAllContacts(filter, sortOptions, skip, limit);
    console.log("Контакти отримані:", contacts);

    res.status(200).json({
      status: 200,
      message: 'Успішно отримано всі контакти!',
      data: contacts,
    });
  } catch (err) {
    console.error("Помилка під час отримання контактів:", err);
    res.status(500).json({ message: 'Не вдалося отримати контакти', error: err.message });
  }
};

// Отримання контакту за ID
export const getContactController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId, req.user.id);
    if (!contact) {
      return res.status(404).json({ message: 'Контакт не знайдено' });
    }
    res.status(200).json({
      status: 200,
      message: `Успішно знайдено контакт з ID ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося отримати контакт', error: err.message });
  }
};


export const getContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Контакт не знайдено' });
    }

    res.status(200).json({
      status: 200,
      message: `Успішно знайдено контакт з ID ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося отримати контакт', error: err.message });
  }
};
