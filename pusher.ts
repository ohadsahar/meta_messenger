import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_SERVER_APP_ID!,
  key: process.env.NEXT_PUBLIC_SERVER_PUSHER_KEY!,
  secret: process.env.NEXT_PUBLIC_SERVER_PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_CLUSTER_REGION!,
  useTLS: true,
});

export const clientPusher = new ClientPusher('be290c4026bd6169e611', {
  cluster: 'eu',
  forceTLS: true,
});
