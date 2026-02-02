import {
  getAllMessages,
  addMessage,
  getMessage,
  deleteMessage,
} from '../db/queries.js';

export async function getHomepage(req, res) {
  const messages = await getAllMessages();

  res.render('index', { title: 'Mini Messageboard', messages });
}

export function getNewMessageForm(req, res) {
  res.render('form');
}

export async function postNewMessage(req, res) {
  const { name, message } = req.body;

  if (name && message) {
    await addMessage(name, message);
    res.redirect('/');
  }
}

export async function getMessageInfo(req, res) {
  const { messageID } = req.params;

  if (isNaN(messageID)) {
    return res.status(404).send('Not found');
  }

  const message = await getMessage(messageID);

  if (message) {
    res.render('components/MessageInfo', { message });
  }
}

export async function deleteMessageInfo(req, res) {
  const { messageID } = req.params;
  await deleteMessage(messageID);
  res.redirect('/');
}
