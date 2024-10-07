import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

const DB_URI = `mongodb+srv://student105:12345678abcd@contactscluster.lg45b.mongodb.net/phonebook?retryWrites=true&w=majority&appName=ContactsCluster`;

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
