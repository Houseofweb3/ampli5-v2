import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

export async function GET(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const url = new URL('https://main.d3fv5kv319fusc.amplifyapp.com');
    url.searchParams.set('auth', 'Authentication failed try again');
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
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify/user`,
      JSON.stringify(loginPayload),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const user = response.data;
    const JwtToken = user.token;

    const url = new URL('https://main.d3fv5kv319fusc.amplifyapp.com');
    if (token.yeps_error) {
      url.searchParams.set('message', token.yeps_error);
    } else {
      url.searchParams.set('yeps_score', String(token.yaps_score));
      url.searchParams.set('token', JwtToken);
      url.searchParams.set('id', String(user.data.id));
      url.searchParams.set('email', String(user.data.email));
      url.searchParams.set('name', String(user.data.firstName));
      url.searchParams.set('username', String(user.data.fullname));
      url.searchParams.set('profile_picture', String(user.data.profilePicture));
    }

    return NextResponse.redirect(url);
  } catch (error) {
  
    let url;
    const status = error?.response?.status;

    if (status === 404) {
      url = new URL('https://main.d3fv5kv319fusc.amplifyapp.com'+'/signup');
      if (token.yeps_error) {
        url.searchParams.set('message', token.yeps_error);
      } else {
        url.searchParams.set('name', token.name);
        url.searchParams.set('username', token.user_name);
        url.searchParams.set('profile_picture', token.profile_picture);
        url.searchParams.set('yaps', String(token.yaps_score));
        url.searchParams.set('email', String(userData.email));
        url.searchParams.set('auth', String(userData.password));
      }
    } else {
      url = new URL('https://main.d3fv5kv319fusc.amplifyapp.com');
      url.searchParams.set('message', 'Authentication request failed! try again');
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
