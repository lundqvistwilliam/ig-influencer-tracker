import { cookies } from "next/headers";
import { decrypt } from "./sessions/sessions";

export function getCurrentUserAction() {
  return getCurrentUser();
}


export async function getCurrentUser(): Promise<any> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    return null;
  }
  const session = await decrypt(sessionCookie.value);
  console.log('Decrypted session: actions', session);

  if (!session?.userId) {
    console.log('No userId in session');
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionCookie.value}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log("Error");
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}