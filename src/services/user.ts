"use server";
import { cookies } from "next/headers";
import how3 from "../utils/axios";

export const createUser = (
  email: string,
  password: string,
  fullname: string,
  type: string
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // this route now handles both signup and login
      const response = await how3.post(`/api/v1/auth/signup`, {
        email: email,
        password: password,
        fullname: fullname,
        type: type,
      });

      resolve(response.data);
    } catch (error: unknown) {
      reject(error);
    }
  });
};

export const getAuthToken = async () => {
  return {
    accessToken: cookies().get("access_token")?.value,
  };
};
export const setAuthToken = async (newAccessToken: string) => {
  cookies().set("access_token", newAccessToken);
};

// Function to refresh the auth token
export const refreshAuthToken = async (refreshToken: string) => {
  return how3.post("/api/v1/auth/refresh-token", {
    refreshToken: refreshToken,
  });
};
