import { get, post } from "../apiClient";

export function createUser(email, password, onSuccess, onError) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users`;
  post(url, { email: email, password: password }, onSuccess, onError);
}

/*
export async function getCurrentUser(onSuccess, onError) {
  try {
    // Get the current session userId
    const { userId, accessToken } = await verifySession();
    console.log("!!!", userId);

    // Send the userId to your backend to fetch the user data
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,  // Send the session token to authenticate
    };

    get(url, onSuccess, onError, headers);
  } catch (error) {
    onError(error.message || 'Error fetching current user');
  }
}
  */



export function getUserByEmail(email, onSuccess, onError) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users/email/${email}`;
  get(url, onSuccess, onError);
}


