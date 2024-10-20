import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getContactsController,
  getContactController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { validateBody } from '../middlewares/validateBody.js';
import {
  contactValidationSchema,
  contactUpdateValidationSchema,
} from '../validation/contacts.js';
import { isValidID } from '../middlewares/isValidId.js';

const router = express.Router();
const jsonParser = express.json({
  type: 'application/json',
});

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidID, ctrlWrapper(getContactController));
router.post(
  '/',
  jsonParser,
  validateBody(contactValidationSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:contactId',
  isValidID,
  jsonParser,
  validateBody(contactUpdateValidationSchema),
  ctrlWrapper(patchContactController),
);
router.delete('/:contactId', isValidID, ctrlWrapper(deleteContactController));

export default router;
