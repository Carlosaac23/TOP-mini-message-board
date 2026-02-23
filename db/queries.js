import { supabase } from './client.js';

export async function getAllMessages() {
  const { data, error } = await supabase.from('messages').select('*');
  if (error) throw new Error(error.message);
  return data;
}

export async function addMessage(name, message) {
  const { error } = await supabase.from('messages').insert({ name, message });
  if (error) throw new Error(error.message);
}

export async function getMessage(messageID) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('id', messageID);
  if (error) throw new Error(error.message);
  return data[0];
}

export async function deleteMessage(messageID) {
  await supabase.from('messages').delete().eq('id', messageID);
}
