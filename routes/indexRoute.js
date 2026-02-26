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
router.route('/new').get(getNewMessageForm).post(postNewMessage);
router.get('/:messageID', getMessageInfo);
router.delete('/:messageID/delete', deleteMessageInfo);
