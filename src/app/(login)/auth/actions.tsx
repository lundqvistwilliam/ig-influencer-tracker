'use server';
import 'server-only';
import { SignUpSchema, LoginFormSchema } from "@/lib/zod/definitions";
import * as argon2 from "argon2";
import { createUser, getUserByEmail } from '../../../lib/apiHelper/user/userApi';
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

function getUserByEmailAsync(email: string): Promise<any> {
  return new Promise((resolve, reject) => {
    getUserByEmail(
      email,
      (user: any) => resolve(user),
      (error: any) => reject(error)
    );
  });
}

export async function signup(prevState: any, formData: FormData) {
  let success = false; // Flag to track if signup is successful

  try {
    const validationResult = SignUpSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirm-password'),
    });

    if (!validationResult.success) {
      console.log("Validation failed");
      return {
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const { email, password } = validationResult.data;
    const hashedPassword = await argon2.hash(password);

    // Create user
    const user = await createUserAsync(email, hashedPassword);

    if (!user) {
      return {
        error: 'Failed to create user'
      };
    }

    // Create session for the user
    await createSession(user.id);
    success = true; // Mark success

  } catch (error) {
    console.error('Signup error:', error);
    return {
      error: error instanceof Error ? error.message : 'An error occurred during signup'
    };
  } finally {
    if (success) {
      redirect('/home'); // Redirect only if signup was successful
    }
  }
}

export async function login(state: any, formData: FormData,) {
  let success = false;

  try {
    const validationResult = LoginFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    const errorMessage = { message: 'Invalid login credentials.' };

    if (!validationResult.success) {
      return {
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const { email, password } = validationResult.data;

    const user = await getUserByEmailAsync(email);

    if (!user) {
      return {
        error: errorMessage
      };
    }
    const passwordMatch = await argon2.verify(user.password, validationResult.data.password);

    if (!passwordMatch) {
      return errorMessage;
    }

    const userId = user.id.toString();
    await createSession(userId);
    success = true;

  } catch (error) {
    console.error('Signup error:', error);
    return {
      error: error instanceof Error ? error.message : 'An error occurred during signup'
    };
  } finally {
    if (success) {
      redirect('/home'); // Redirect only if signup was successful
    }
  }
}