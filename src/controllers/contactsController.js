import { getContactById, getAllContacts } from '../services/contacts.js';


export const getAllContactsController = async (req, res) => {
  try {
    console.log("Запрос на получение всех контактов");  // Логируем начало запроса

    const { page = 1, limit = 10, sort = 'name', filter = {} } = req.query; // Параметры для пагинации, сортировки и фильтрации
    const skip = (page - 1) * limit;
    const sortOptions = { [sort]: 1 }; // Сортировка по полю (по умолчанию по имени)

    // Преобразование фильтров в объект для использования в запросе
    const userId = req.user.id; // Предполагаем, что userId можно получить из auth middleware
    filter.userId = userId; // Добавляем фильтрацию по userId

    const contacts = await getAllContacts(filter, sortOptions, skip, limit);
    console.log("Контакты получены:", contacts);  // Логируем полученные контакты

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved all contacts!',
      data: contacts,
    });
  } catch (err) {
    console.error("Ошибка при получении контактов:", err);  // Логируем ошибку
    res.status(500).json({ message: 'Failed to get contacts', error: err.message });
  }
};




// Получение контакта по ID
export const getContactController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId, req.user.id); // передаем userId
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




export const getContact = async (req, res) => {
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

