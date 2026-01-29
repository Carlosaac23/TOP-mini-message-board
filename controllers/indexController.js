import { messages } from '../db/messages.js';
import { getOneMessage } from '../helpers/index.js';

export function getHomepage(req, res) {
  res.render('index', { title: 'Mini Messageboard', messages });
}

export function getNewMessageForm(req, res) {
  res.render('form');
}

export function postNewMessage(req, res) {
  const { name, message } = req.body;

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  messages.push({
    id: crypto.randomUUID(),
    text: message,
    user: name,
    added: new Date().toLocaleDateString('es-CO', options),
  });
  res.redirect('/');
}

export async function getMessageInfo(req, res) {
  const { messageID } = req.params;
  const message = await getOneMessage(messages, messageID);
  res.render('components/MessageInfo', { message });
}
