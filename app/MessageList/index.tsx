'use client';

import { useEffect } from 'react';
import useSWR from 'swr';
import { clientPusher } from '../../pusher';
import { fetcher } from '../../utils/fetchMessages';
import { MessageProps } from '../ChatInput';
import { Message } from '../Message';

type Props = {
  initialMessages: MessageProps[];
};

export const MessageList = ({ initialMessages }: Props) => {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<MessageProps[]>(
    `${process.env.VERCEL_URL || 'http://localhost:3000/'}/api/getMessages`,
    fetcher
  );

  useEffect(() => {
    const channel = clientPusher.subscribe('messages');

    channel.bind('new-message', async (data: MessageProps) => {
      if (messages?.find((message) => message.id === data.id)) return;

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, clientPusher, mutate]);

  return (
    <div className='space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto'>
      {(messages || initialMessages).map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
