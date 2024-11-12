import { getCurrentUser } from "@/lib/apiHelper/user/userApi";
import { verifySession } from "../(login)/auth/sessions";
import { cache } from "react";


export const getUser = cache(async () => {
  const session = await verifySession();

  const user = await getCurrentUser();

  return user;
});