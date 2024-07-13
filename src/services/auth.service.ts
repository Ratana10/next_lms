"use server";

import { z } from "zod";
import { signIn } from "@/auth";
import { loginSchema } from "@/schema/definition";
import { LoginRequest, RegisterRequest } from "@/types";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function login(values: z.infer<typeof loginSchema>) {
  try {
   await signIn("credentials", {
      redirect: true,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      username: values.username,
      password: values.password,
      
    });

  } catch (error: any) {
    throw new Error("Invalid Credential")
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case "CredentialsSignin":
    //       return { error: "Invalid cridential" };
    //     default:
    //       return { error: "Something went wrong!" };
    //   }
    // }
    // throw error;
  }
}

export async function loginService(loginRequest: LoginRequest) {
  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequest),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return {
    token: data.token,
  };
}

export async function registerService(registerRequest: RegisterRequest) {
  const res = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerRequest),
  });
  return await res.json();
}
