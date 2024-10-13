import { Contact } from '../models/contact.js';

export const fetchAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw new Error('Error fetching contacts: ' + error.message);
  }
};

export const fetchContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw new Error('Error fetching contact: ' + error.message);
  }
};
export const createContact = async (contact) => {
  try {
    const createdContact = await Contact.create(contact);
    return createdContact;
  } catch (error) {
    throw new Error('Error creating contact: ' + error.message);
  }
};

export const updateContact = async (contactId, contact) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    throw new Error('Error updating contact: ' + error.message);
  }
};

export const deleteContact = async (contactId) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    return deletedContact;
  } catch (error) {
    throw new Error('Error removing contact: ' + error.message);
  }
};
