import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRoutes from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

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

app.use('/contacts', contactsRoutes);
app.use(errorHandler);
app.use(notFoundHandler);
export default app;
