import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getContactsController,
  getContactController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

const router = express.Router();
const jsonParser = express.json({
  type: 'application/json',
});

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactController));
router.post('/', jsonParser, ctrlWrapper(createContactController));
router.patch('/:contactId', jsonParser, ctrlWrapper(patchContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
