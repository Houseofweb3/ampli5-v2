import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import axios from 'axios';

export const authOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0',
    }),
  ],

  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account && user) {
        token.id = user.id;
        token.username = profile?.username;
        token.name = user.name;
        token.picture = user.image;
        token.email = user.email;
        token.apiToken = user.id;
        token.apiUser = {
          name: profile?.username || user.name,
          profile: profile?.username || user.name,
        };

        try {
          //           const res = await axios.post('https://your-api.com/auth', {
          //             email: user.email,
          //           });
          //
          //           console.log(res);
        } catch (error) {
          console.error('Failed to fetch external API token/user:', error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.image = token.picture;
      session.user.email = token.email;
      session.apiToken = token.apiToken || null;
      session.apiUser = token.apiUser || null;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
