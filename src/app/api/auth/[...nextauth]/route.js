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
      if (account && profile?.data) {
        const username = profile.data.username;
        const name = profile.data.name;
        const profilePicture = profile.data.profile_image_url;
        const id = profile.data.id;

        try {
          const res = await axios.get(`https://api.kaito.ai/api/v1/yaps?username=${username}`);
          const data = res.data;

          if (data.message || data.yaps_all < 10) {
            token.yeps_error = 'Access denied — you need a minimum Yap score of 10 to continue.';
          }

          token.yaps_score = Number(data.yaps_all || 0).toFixed(0);
          token.user_id = id;
          token.user_name = username;
          token.name = name;
          token.profile_picture = profilePicture;
        } catch (err) {
          token.yeps_error = 'Access denied — you need a minimum Yap score of 10 to continue.';
          token.user_id = id;
          token.user_name = username;
          token.name = name;
          token.profile_picture = profilePicture;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user_id = token.user_id ?? null;
      session.user_name = token.user_name ?? null;
      session.name = token.name ?? null;
      session.profile_picture = token.profile_picture ?? null;
      session.yaps_score = token.yaps_score ?? null;
      session.yeps_error = token.yeps_error ?? null;
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/api/user/verify`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
