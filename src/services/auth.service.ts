'use server'

import {z} from "zod";
import { signIn } from "@/auth";
import { loginSchema } from "@/schema/definition";
import { LoginRequest, RegisterRequest } from "@/types";

export async function login(values: z.infer<typeof loginSchema>) {
    await signIn('credentials',{
        redirect: true,
        redirectTo: '/dashboard',
        username: values.username,
        password: values.password
    })
}



export async function loginService(loginRequest: LoginRequest){
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest)
      })
    return await res.json();
}

export async function registerService(registerRequest: RegisterRequest){
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerRequest)
      })
    return await res.json();
}