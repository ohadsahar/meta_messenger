'use client';

import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import { url } from '../../constant';

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

export const SignIn = ({ providers }: Props) => {
  return (
    <div className='flex justify-center'>
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: url,
              })
            }
          >
            Login with {provider?.name}
          </button>
        </div>
      ))}
    </div>
  );
};
