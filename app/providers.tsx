'use client';

import { SessionProvider } from 'next-auth/react';

export const Providers = ({ session, children }: any) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);
