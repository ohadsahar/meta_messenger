import { MessageProps } from '../ChatInput';
import Image from 'next/image';

type Props = {
  message: MessageProps;
};

export const Message = ({ message }: Props) => {
  return (
    <div key={message?.id} className='flex w-fit'>
      <div className='flex-shrink-0'>
        <Image
          className='rounded-full mx-2'
          src={message?.profilePic}
          alt='Profile Picture'
          width={50}
          height={10}
        />
      </div>
      <div>
        <p className='text-[0.65rem] px-[2px] pb-[2px]'>{message?.username}</p>
        <div className='flex items-end'>
          <div className='px-3 py-2 rounded-lg w-fit text-white bg-red-400'>
            <p>{message?.message}</p>
          </div>
          <p className='text-[0.65rem] italic px-2 text-gray-300'>
            {new Date(message?.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
