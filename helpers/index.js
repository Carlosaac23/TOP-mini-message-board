export async function getOneMessage(messages, messageID) {
  return messages.find(msg => msg.id === messageID);
}
