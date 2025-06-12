import axios from "axios";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function GET(req) {
  console.log(req,"req")
const cookieKey = '__Secure-authjs.session-token'
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
     salt: cookieKey,
        cookieName: cookieKey
  });
  console.log(token, "token");

  if (!token) {
    const url = new URL("auth", process.env.NEXTAUTH_URL);
    url.searchParams.set("error", "Authentication failed try again token not found");
    return NextResponse.redirect(url);
  }

  const userData = generateCredentialsFromTwitter({
    id: token.user_id,
    username: token.user_name,
  });

  try {
    const loginPayload = {
      email: userData.email,
      password: userData.password,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_BOUNTY}/auth/verify/user`,
      JSON.stringify(loginPayload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const user = response.data;
    const JwtToken = user.token;

    const url = new URL("/auth", process.env.NEXTAUTH_URL);
    if (token.yaps_error) {
      url.searchParams.set("error", token.yaps_error);
    } else {
      url.searchParams.set("id", String(user.data.id));
      url.searchParams.set("name", String(user.data.firstName));
      url.searchParams.set("username", String(user.data.fullname));
      url.searchParams.set("email", String(user.data.email));
      url.searchParams.set("profile_picture", String(user.data.profilePicture));
      url.searchParams.set("yaps", String(token.yaps_score));
      url.searchParams.set("token", JwtToken);
    }

    return NextResponse.redirect(url);
  } catch (error) {
    let url;
    const status = error?.response?.status;

    if (status === 404) {
      url = new URL(process.env.NEXTAUTH_URL + "/signup");
      if (token.yaps_error) {
        url.searchParams.set("error", token.yaps_error);
      } else {
        url.searchParams.set("name", token.name);
        url.searchParams.set("username", token.user_name);
        url.searchParams.set("profile_picture", token.profile_picture);
        url.searchParams.set("yaps", String(token.yaps_score));
        url.searchParams.set("email", String(userData.email));
        url.searchParams.set("auth", String(userData.password));
      }
    } else {
      url = new URL("/auth", process.env.NEXTAUTH_URL);
      url.searchParams.set("error", "Authentication failed try again server error");
    }

    return NextResponse.redirect(url);
  }
}
function generateCredentialsFromTwitter({ id, username }) {
  const twitterId = id;
  const name = username;
  const email = `${name}@ampli5.ai`;
  const rawPassword = `ampli5-user-secret-${twitterId}-${name}`;
  const password = CryptoJS.SHA256(rawPassword).toString();

  return { email, password };
}
