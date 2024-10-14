import createHttpError from 'http-errors';
import { fetchAllContacts } from '../services/contacts.js';
import {
  fetchContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

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
      throw createError(404, 'Contact not found');
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
export const createContactController = async (req, res) => {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const result = await createContact(contact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  console.log(contact);

  const result = await updateContact(contactId, contact);

  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const result = await deleteContact(contactId);

  if (result === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
