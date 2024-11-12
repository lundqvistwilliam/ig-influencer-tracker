import { get, post } from "../apiClient";

export function createUser(email, password, onSuccess, onError) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users`;
  post(url, { email: email, password: password }, onSuccess, onError);
}
