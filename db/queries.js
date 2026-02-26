import { sql } from './client.js';

export async function getAllMessages() {
  try {
    return await sql`SELECT * FROM messages`;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addMessage(name, message) {
  try {
    await sql`INSERT INTO messages (name, message) VALUES (${name}, ${message})`;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMessage(messageID) {
  try {
    const rows = await sql`SELECT * FROM messages WHERE id = ${messageID}`;
    return rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteMessage(messageID) {
  try {
    await sql`DELETE FROM messages WHERE id = ${messageID}`;
  } catch (error) {
    throw new Error(error.message);
  }
}
