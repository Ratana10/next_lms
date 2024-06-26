import { auth } from "@/auth";

export async function getToken(){
    const session = await auth();
    return session?.user.token;
}