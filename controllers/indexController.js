import { getAllMessages, addMessage, getMessage } from '../db/queries.js';

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
  const message = await getMessage(messageID);

  if (message) {
    res.render('components/MessageInfo', { message });
  }
}
