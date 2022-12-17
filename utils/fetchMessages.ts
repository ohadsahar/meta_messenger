import { MessageProps } from '../app/ChatInput';
import { url } from '../app/constant';

export const fetcher = async () => {
  const result = await fetch(`${url}/api/getMessages`);
  const data = await result.json();
  const messages: MessageProps[] = data.messages;
  return messages;
};
