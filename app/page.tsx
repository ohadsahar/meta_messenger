import { ChatInput, MessageProps } from './ChatInput';
import { MessageList } from './MessageList';

async function HomePage() {
  const url = process.env.VERCEL_URL || 'http://localhost:3000';
  const data = await fetch(`${url}/api/getMessages`).then((res) => res.json());

  const messages: MessageProps[] = data.messages;

  return (
    <main>
      <MessageList initialMessages={messages} />
      <ChatInput />
    </main>
  );
}

export default HomePage;
