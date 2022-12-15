import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import Image from 'next/image';
import { SignIn } from '.';

async function SignInPage() {
  const providers = await getProviders();
  return (
    <div>
      <div>
        <Image
          className='rounded-full mx-2 object-contain'
          src='https://links.papareact.com/161'
          alt='Profile Picture'
          width={700}
          height={700}
        />
      </div>
      <SignIn providers={providers} />
    </div>
  );
}

export default SignInPage;
