import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getContacts } from './controllers/contactsController.js';
import { getContactById } from './controllers/contactsController.js';

export const setupServer = () => {
  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
    }),
  );
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', getContacts);

  app.get('/contacts/:contactId', getContactById);

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
