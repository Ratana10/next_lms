"use server";

import { z } from "zod";
import { signIn } from "@/auth";
import { loginSchema } from "@/schema/definition";
import { LoginRequest, RegisterRequest } from "@/types";

export async function login(values: z.infer<typeof loginSchema>) {
  try {
    await signIn("credentials", {
      redirect: true,
      redirectTo: "/",
      username: values.username,
      password: values.password,
    });
  } catch (error: any) {
    if (error.cause && error.cause.err && error.cause.err.message) {
      console.error("Login error:", error.cause.err.message);
      throw new Error(`${error.cause.err.message}`);
    }
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
    throw new Error(`${data.message}`);
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
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`${data.message}`);
  }

  return {
    token: data.token,
  };
}
