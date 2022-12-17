import { MessageProps } from '../app/ChatInput';

export const fetcher = async () => {
  const result = await fetch(`${process.env.VERCEL_URL}/api/getMessages`);
  const data = await result.json();
  const messages: MessageProps[] = data.messages;
  return messages;
};
