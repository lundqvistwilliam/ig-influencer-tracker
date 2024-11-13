import { getCurrentUser } from "@/lib/apiHelper/user/userApi";
import { verifySession } from "../(login)/auth/sessions";
import { cache } from "react";


export const getUser = cache(async () => {
  const currUser = await getCurrentUser((user: any) => {
    console.log("!!USER", user);
    return user;
  }, (error: any) => {
    console.log(error);
  });
  console.log("currUser", currUser);

});