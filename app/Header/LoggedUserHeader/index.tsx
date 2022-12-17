import Image from 'next/image';
import LogoutButton from '../../LogoutButton';
import { Session } from 'next-auth';

type Props = {
  session: Session;
};

export const LoggedUserHeader = ({ session }: Props) => (
  <header className='sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm'>
    <div className='flex space-x-2 items-center'>
      <Image
        className='rounded-full mx-2 object-contain'
        src={session?.user?.image!}
        alt='Profile Picture'
        width={50}
        height={10}
      />
      <div>
        <p className='text-blue-400'>Logged in as:{session?.user?.name}</p>
        <p className='font-bold text-lg'></p>
      </div>
    </div>

    <LogoutButton />
  </header>
);
