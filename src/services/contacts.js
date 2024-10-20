import { SORT_ORDER } from '../constants/index.js';
import { Contact } from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const fetchAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = Contact.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavorite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavorite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
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
