import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!,
  pages: {
    signIn: '/auth/signin',
  },
};
export default NextAuth(authOptions);
