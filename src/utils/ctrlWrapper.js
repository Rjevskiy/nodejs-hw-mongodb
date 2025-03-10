import HttpError from "http-errors";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import contactsService from "../services/contacts.js";

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getById(contactId);
  if (!contact) {
    throw new HttpError(404, "Contact not found");
  }
  res.json({ status: 200, data: contact });
};

export default {
  getContactById: ctrlWrapper(getContactById),
};
