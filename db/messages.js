const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

export const messages = [
  {
    id: crypto.randomUUID(),
    text: 'Hi there!',
    user: 'Armando',
    added: new Date().toLocaleDateString('es-CO', options),
  },
  {
    id: crypto.randomUUID(),
    text: 'Hello World!',
    user: 'Charles',
    added: new Date().toLocaleDateString('es-CO', options),
  },
];
