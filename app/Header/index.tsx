import { unstable_getServerSession } from 'next-auth/next';
import { LoggedUserHeader } from './LoggedUserHeader';
import { SignOutUserHeader } from './SignOutUserHeader';

export const Header = async () => {
  const session = await unstable_getServerSession();
  return session ? (
    <LoggedUserHeader session={session} />
  ) : (
    <SignOutUserHeader />
  );
};
