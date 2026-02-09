import { pool } from './pool.js';
import { safeQuerySingle, safeQueryMany } from './safeQueries.js';

export async function getAllMessages() {
  return await safeQueryMany(
    () => pool.query('SELECT * FROM messages'),
    'getAllMessage()'
  );
}

export async function addMessage(name, message) {
  return await safeQuerySingle(
    () =>
      pool.query('INSERT INTO messages (name, message) VALUES ($1, $2)', [
        name,
        message,
      ]),
    `addMessage(${name}, ${message})`
  );
}

export async function getMessage(messageID) {
  return await safeQuerySingle(
    () => pool.query('SELECT * FROM messages WHERE id = $1', [messageID]),
    `getMessage(${messageID})`
  );
}

export async function deleteMessage(messageID) {
  return await safeQuerySingle(
    () => pool.query('DELETE FROM messages WHERE id = $1', [messageID]),
    `deleteMessage(${messageID})`
  );
}
