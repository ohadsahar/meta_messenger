import Image from 'next/image';
import LogoutButton from '../../LogoutButton';

export const LoggedUserHeader = () => (
  <header className='sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm'>
    <div className='flex space-x-2 items-center'>
      <Image
        className='rounded-full mx-2 object-contain'
        src='https://links.papareact.com/jne'
        alt='Profile Picture'
        width={50}
        height={10}
      />
      <div>
        <p className='text-blue-400'>Logged in as:</p>
        <p className='font-bold text-lg'>Ohad Sahar</p>
      </div>
    </div>

    <LogoutButton />
  </header>
);
