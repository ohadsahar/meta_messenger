import { MessageProps } from '../app/ChatInput';

export const fetcher = async () => {
  const result = await fetch('http://localhost:3000/api/getMessages');
  const data = await result.json();
  const messages: MessageProps[] = data.messages;
  return messages;
};
