import { getToken } from "@/lib/session";

export async function getAllAccounts() {
  try {
    
    const token = await getToken();
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    const data = await res.json();
    if(!res.ok){
      throw new Error(data.message);
    }
    return {
      accounts: data.data
    }
  } catch (error) {
    throw error;
  } 
 


}
