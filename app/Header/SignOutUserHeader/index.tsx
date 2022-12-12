import Image from 'next/image';
import Link from 'next/link';

export const SignOutUserHeader = () => (
  <header className='sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm'>
    <div className='flex flex-col items-center space-y-5'>
      <div className='flex space-x-2 items-center'>
        <Image
          src='https://links.papareact.com/jne'
          alt='Logo'
          width={50}
          height={10}
        />
        <p className='text-blue-400'>Welcome to Meta Messenger</p>
      </div>
      <Link
        href='/auth/signin'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Sign in
      </Link>
    </div>
  </header>
);
