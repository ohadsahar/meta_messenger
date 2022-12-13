// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { MessageProps } from '../../app/ChatInput';
import { redis } from '../../redis';

type Data = {
  messages: MessageProps[];
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ body: 'Method not allowed' });
    return;
  }

  const messagesResult = await redis.hvals('messages');
  const messages: MessageProps[] = messagesResult
    .map((message) => JSON.parse(message))
    .sort((a, b) => b.created_at - a.created_at);

  res.status(200).json({ messages });
}
