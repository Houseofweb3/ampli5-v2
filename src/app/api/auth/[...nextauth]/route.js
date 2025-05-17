import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import axios from 'axios';
import { URLSearchParams } from 'url';

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
        const username = profile?.username;

        token.id = user.id;
        token.username = username;
        token.name = user.name;
        token.email = user.email;
        token.apiUser = {
          username,
          name: user.name,
          email: user.email,
        };

        try {
          const res = await axios.get(`https://api.kaito.ai/api/v1/yaps?username=${username}`);
          console.log(res, 'data');
          const data = res.data;

          if (data.message) {
            token.kaitoError = 'You are not eligible to join ampli5';
          } else {
            token.yaps_all = data.yaps_all;
          }
        } catch (err) {
          console.error('Kaito API error:', err.message);
          token.kaitoError = 'Failed to fetch Kaito score';
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
      session.yaps_all = token.yaps_all || null;
      session.kaitoError = token.kaitoError || null;
      return session;
    },

    async redirect({ url, baseUrl }) {
      const params = new URLSearchParams({
        username: 'custom_user', // You may replace this with a real value from session or token
        status: 'success',
      });

      return `${baseUrl}/signup?${params.toString()}`;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
