import { ChatInput, MessageProps } from './ChatInput';
import { MessageList } from './MessageList';
import { unstable_getServerSession } from 'next-auth/next';
import { Providers } from './providers';
import { url } from './constant';

async function HomePage() {
  const data = await fetch(`${url}/api/getMessages`).then((res) => res.json());

  const messages: MessageProps[] = data.messages;

  // protect an API Route
  const session = await unstable_getServerSession();

  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Providers>
  );
}

export default HomePage;
