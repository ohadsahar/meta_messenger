import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';

export default function HomePage() {
  return (
    <main>
      <MessageList />
      <ChatInput />
    </main>
  );
}
