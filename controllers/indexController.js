import {
  getAllMessages,
  addMessage,
  getMessage,
  deleteMessage,
} from '../db/queries.js';

export async function getHomepage(req, res) {
  try {
    const messages = await getAllMessages();

    if (!messages) {
      return res.status(404).render('error', {
        message: 'Messages not found',
      });
    }

    res.render('index', { messages });
  } catch (error) {
    console.error('Controller error:', error);
    return res.status(500).render('error', {
      message: 'Unable to load homepage',
      error,
    });
  }
}

export function getNewMessageForm(req, res) {
  res.render('form');
}

export async function postNewMessage(req, res) {
  try {
    const { name, message } = req.body;

    if (name && message) {
      await addMessage(name, message);
      res.redirect('/');
    }
  } catch (error) {
    console.error('Controller error:', error);
    return res.status(500).render('error', {
      message: 'Error adding new message',
      error,
    });
  }
}

export async function getMessageInfo(req, res) {
  try {
    const { messageID } = req.params;
    const message = await getMessage(messageID);

    if (!message) {
      return res.status(404).render('error', {
        message: 'Message not found',
        details: `Not message found with ID ${messageID}`,
      });
    }

    res.render('partials/message-info', { message });
  } catch (error) {
    console.error('Controller error:', error);
    return res
      .status(500)
      .render('error', { message: 'Error getting message info', error });
  }
}

export async function deleteMessageInfo(req, res) {
  try {
    const { messageID } = req.params;
    await deleteMessage(messageID);

    return res.redirect('/');
  } catch (error) {
    console.error('Controller error:', error);
    return res.status(500).render('error', {
      message: 'Error deleting message',
      error,
    });
  }
}
