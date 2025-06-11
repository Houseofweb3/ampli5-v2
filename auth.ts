import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import type { OAuthUserConfig } from "next-auth/providers";
import axios from "axios";

import { cookies } from "next/headers";
import { createUser } from "./src/services/user";
import { UserDataType } from "./src/lib/types";
import { convertDaysToSeconds } from "./src/utils/helpers";

declare module "next-auth" {
  interface User {
    isOAuth?: boolean;
    name?: string | null;
    email?: string | null;
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    provider?: string;
    emailVerified?: boolean | null;
    image?: string | null;
  }
}

interface TwitterProfileData {
  username: string;
  name: string;
  profile_image_url: string;
  id: string;
}

const setUserCookies = (userData: UserDataType) => {
  const { user, accessToken, refreshToken } = userData;

  if (user?.id) {
    cookies().set("userId", user.id, {
      maxAge: convertDaysToSeconds(7),
    });
  }

  if (accessToken) {
    cookies().set("access_token", accessToken, {
      maxAge: convertDaysToSeconds(7),
    });
  }

  if (refreshToken) {
    cookies().set("refresh_token", refreshToken, {
      maxAge: convertDaysToSeconds(7),
    });
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    } as OAuthUserConfig<any>),
  ],

  callbacks: {
    async signIn({ user, account }) {
      const { email, name } = user;

      if (account?.provider === "google") {
        if (!email) {
          console.error("No email returned from Google provider");
          return false;
        }

        try {
          const userData = await createUser(
            email,
            email,
            name || "User",
            "user"
          );
          setUserCookies(userData);
          return true;
        } catch (err) {
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user, account, profile }) {
      if (account && profile?.data) {
        const {
          username,
          name,
          profile_image_url: profilePicture,
          id,
        } = profile.data as TwitterProfileData;
        try {
          const res = await axios.get(
            `https://api.kaito.ai/api/v1/yaps?username=${username}`
          );
          const data = res.data;

          if (data.message || data.yaps_all < 10) {
            token.yaps_error =
              "Access denied — you need a minimum Yap score of 10 to continue.";
          }
          token.yaps_score = Number(data.yaps_all || 0).toFixed(0);
          token.user_id = id;
          token.user_name = username;
          token.name = name;
          token.profile_picture = profilePicture;
        } catch (err) {
          token.yaps_error =
            "Access denied — you need a minimum Yap score of 10 to continue.";
          token.user_id = id;
          token.user_name = username;
          token.name = name;
          token.profile_picture = profilePicture;
        }
      }

      if (user) token.id = user.id;
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }

      return { ...user, ...token };
    },

    async session({ session }) {
      session.user.accessToken = cookies().get("access_token")?.value;
      session.user.refreshToken = cookies().get("refresh_token")?.value;
      const userId = cookies().get("userId")?.value;
      if (userId) {
        session.user.id = userId;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  debug: true,

  session: {
    strategy: "jwt",
  },
});
