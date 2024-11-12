"use client";

import Link from "next/link";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signup } from "@/app/(login)/auth/actions";
import { useActionState } from "react";

export function SignupForm() {
  const initialState = {
    errors: {
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
  };
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="w-full max-w-md">
      <form action={action}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
            </div>
            {state?.errors?.password && <p>{state.errors.password}</p>}
            <div className="space-y-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="password"
              />
            </div>
            {state?.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}
          </CardContent>
          <CardFooter className="flex flex-col">
            <button disabled={pending} className="w-full">{pending ? 'Submitting...' : 'Sign Up'}</button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="signin">
            Sign In
          </Link>
          <Link className="underline ml-2" href="/home">
            SKIP (REMOVE THIS)
          </Link>
        </div>
      </form>
    </div>
  );
}