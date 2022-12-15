'use client';

import { FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetchMessages';

export type MessageProps = {
  id: string;
  message: string;
  created_at: number;
  username: string;
  profilePic: string;
  email: string;
};

export const ChatInput = () => {
  const profile =
    'https://scontent.ftlv19-1.fna.fbcdn.net/v/t39.30808-6/275136774_7652695838077468_7272837155158811764_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GyXr-_uS19oAX-PVSfd&_nc_ht=scontent.ftlv19-1.fna&oh=00_AfBcqm0yP06igQb4EtWC9-74CMkqMSfR2RCT5Weesmvg8g&oe=639D9E0D';
  const [input, setInput] = useState('');
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

  const handleMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input) return;

    const messageToSend = input;

    setInput('');

    const id = uuid();
    const message: MessageProps = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: 'Ohad Green',
      profilePic: profile,
      email: 'osahar5@gmail.com',
    };

    const uploadMessageToUpstash = async () => {
      const response = await fetch('/api/addMessage', {
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
