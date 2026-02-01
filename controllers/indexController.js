import { getAllMessages, addMessage, getMessage } from '../db/queries.js';

export async function getHomepage(req, res) {
  const messages = await getAllMessages();
  console.log(messages);
  const { added } = messages;
  console.log(added);
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
  console.log(messageID);
  const message = await getMessage(messageID);
  console.log('Message controller: ', message);
  if (message) {
    res.render('components/MessageInfo', { message });
  }
}
