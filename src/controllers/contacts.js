import { fetchAllContacts } from '../services/contacts.js';
import { fetchContactById } from '../services/contacts.js';
import createError from 'http-errors';

export const getContactsController = async (req, res) => {
  try {
    const contacts = await fetchAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Failed to retrieve contacts.',
      error: error.message,
    });
  }
};
export const getContactController = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await fetchContactById(contactId);

    if (!contact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Failed to retrieve contact.',
      error: error.message,
    });
  }
};
