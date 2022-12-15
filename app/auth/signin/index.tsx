'use client';

import { useSession, signIn, signOut, getProviders } from 'next-auth/react';

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

export const SignIn = ({ providers }: Props) => {
  return (
    <div>
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button>Login with {provider?.name}</button>
        </div>
      ))}
    </div>
  );
};
