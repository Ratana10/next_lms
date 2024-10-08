"use server"

import { signIn, signOut } from "@/auth";
import { loginSchema } from "@/schema/definition";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof loginSchema>) => {

  try {
    await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirectTo: "/"
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };

        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
  
};

export const logout = async () => {
  await signOut({ redirectTo: "/auth/login" });
  revalidatePath("/");
};
