import { MessageProps } from '../app/ChatInput';

export const fetcher = async () => {
  const url = process.env.VERCEL_URL! || 'http://localhost:3000';
  const result = await fetch(`${url}/api/getMessages`);
  const data = await result.json();
  const messages: MessageProps[] = data.messages;
  return messages;
};
