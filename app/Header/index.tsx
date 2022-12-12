import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '../LogoutButton';
import { LoggedUserHeader } from './LoggedUserHeader';
import { SignOutUserHeader } from './SignOutUserHeader';

export const Header = () => {
  const session = false;
  return session ? <LoggedUserHeader /> : <SignOutUserHeader />;
};
