import { Router } from 'express';

export const router = Router();

import {
  getHomepage,
  getNewMessageForm,
  postNewMessage,
  getMessageInfo,
  deleteMessageInfo,
} from '../controllers/indexController.js';

router.get('/', getHomepage);
router.get('/new', getNewMessageForm);
router.post('/new', postNewMessage);
router.get('/:messageID', getMessageInfo);
router.post('/:messageID/delete', deleteMessageInfo);
