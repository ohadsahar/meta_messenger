'use client';

import { FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetchMessages';
import { Session } from 'next-auth';

export type MessageProps = {
  id: string;
  message: string;
  created_at: number;
  username: string;
  profilePic: string;
  email: string;
};

type Props = {
  session?: Session | null;
};

export const ChatInput = ({ session }: Props) => {
  const [input, setInput] = useState('');
  const { data: messages, mutate } = useSWR(
    `${process.env.VERCEL_URL || 'http://localhost:3000/'}/api/getMessages`,
    fetcher
  );

  const handleMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input || !session) return;

    const messageToSend = input;

    setInput('');

    const id = uuid();
    const message: MessageProps = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };

    const uploadMessageToUpstash = async () => {
      const url = process.env.VERCEL_URL || 'http://localhost:3000';
      const response = await fetch(`${url}/api/addMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());

      return [response.message, ...messages!];
    };

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={handleMessage}
      className='fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-500 bg-white'
    >
      <input
        disabled={!session}
        type='text'
        onChange={({ target: { value } }) => setInput(value)}
        placeholder='Enter message here...'
        value={input}
        className='flex-1 rounded border border-gray-300 focus:outline-none 
		focus:ring-2 focus:ring-blue-500 focus:border-transparent px-5 py-3 
		disabled:opacity-50 disabled:cursor-not-allowed'
      />
      <button
        disabled={!input}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'
        type='submit'
      >
        send
      </button>
    </form>
  );
};
