'use server';
import 'server-only';
import * as jose from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const key = new TextEncoder().encode(process.env.NEXT_AUTH_SECRET);

const cookie = {
  name: 'session',
  options: { httpOnly: true, secure: true, sameSite: 'lax', path: '/' },
  duration: 24 * 60 * 60 * 1000
};

export async function encrypt(payload) {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key);
}

export async function decrypt(session) {
  try {
    const { payload } = await jose.jwtVerify(session, key, {
      algorithms: ['HS256']
    });
    return payload;
  } catch (error) {
    return null;
  }

}


export async function createSession(userId) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });

  // @ts-expect-error
  await cookies().set(cookie.name, session, { ...cookie.options, expires });

  redirect('/dashboard');
}

export async function verifySession() {
  // @ts-expect-error  
  const cookie = await cookies().get(cookie.name)?.value;

  const session = await decrypt(cookie);
  if (!session?.userId) {
    redirect('/auth/signin');
  }

  return { userId: session.userId };

}

export async function deleteSession() {
  // @ts-expect-error
  await cookies().delete(cookie.name);

  redirect('/auth/signin');

}

