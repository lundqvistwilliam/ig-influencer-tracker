'use server';
import 'server-only';
import { SignUpSchema } from "@/lib/zod/definitions";
import * as argon2 from "argon2";
import { createUser } from '../../../lib/apiHelper/user/userApi';
// import { createSession, encrypt } from "@/lib/sessions/sessions";
import { createSession, encrypt } from "./sessions";
import { redirect } from "next/navigation";

function createUserAsync(email: string, password: string): Promise<any> {
  return new Promise((resolve, reject) => {
    createUser(
      email,
      password,
      (user: any) => resolve(user),
      (error: any) => reject(error)
    );
  });
}


/*
export async function signup(state, formData: FormData) {

  const validationResult = SignUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
  });

  if (!validationResult.success) {
    console.log("f validation ailed");
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  const { email, password, confirmPassword } = validationResult.data;

  const hashedPassword = await argon2.hash(password);

  createUser(email, hashedPassword, async (user: any) => {
    console.log('success user', user);
    await createSession(user.id);
  }, (error: any) => {
    console.log(error);
  });
}
*/

export async function signup(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    const hashedPassword = await argon2.hash(password);

    // Use the promisified version
    const user = await createUserAsync(email, hashedPassword);

    if (!user) {
      return {
        error: 'Failed to create user'
      };
    }

    await createSession(user.id);
    // redirect('/dashboard');
  } catch (error) {
    console.error('Signup error:', error);
    return {
      error: error instanceof Error ? error.message : 'An error occurred during signup'
    };
  } finally {
    redirect('/home');
  }
}