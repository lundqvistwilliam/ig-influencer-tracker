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
  /*
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key);
    */
  console.log('Creating token with payload:', payload);
  console.log('Using secret (first 10 chars):', process.env.NEXT_AUTH_SECRET?.slice(0, 10));
  /*
  return new jose.SignJWT({
    userId: parseInt(payload.userId), // Ensure userId is a number
    type: 'access_token'
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key);
    */
  try {
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1day')
      .sign(key);

    console.log('Token created successfully');
    return token;
  } catch (error) {
    console.error('Token creation error:', error);
    throw error;
  }
}

export async function decrypt(session) {
  try {
    const { payload } = await jose.jwtVerify(session, key, {
      algorithms: ['HS256']
    });
    return payload;
  } catch (error) {
    console.error('Decrypt error:', error);
    return null;
  }

}

/*
export async function createSession(userId) {
  const cookieStore = cookies();
  const expires = new Date(Date.now() + cookie.duration);

  const token = await encrypt({ userId, expires });

  // const session = await encrypt({ userId, expires }); add

  // @ts-expect-error
  cookieStore.set(cookie.name, token, {
    ...cookie.options,
    expires
  });
  /* keep
  cookieStore.set(cookie.name, token, session, {
    ...cookie.options,
    expires
  });
  
}
*/

export async function createSession(userId) {
  const cookieStore = await cookies();
  const expires = new Date(Date.now() + cookie.duration);

  // Create the session token
  const sessionToken = await encrypt({
    userId,
    expires: expires.toISOString()
  });

  console.log('Creating session with token:', sessionToken);
  console.log('Session payload:', { userId, expires: expires.toISOString() });

  //@ts-expect-error
  cookieStore.set(cookie.name, sessionToken, {
    ...cookie.options,
    expires
  });
}


export async function verifySession() {
  //@ts-expect-error
  const sessionCookie = await cookies().get(cookie.name)?.value;

  if (!sessionCookie) {
    redirect('/auth/signin');
  }

  const session = await decrypt(sessionCookie);
  if (!session?.userId || !session?.accessToken) {
    redirect('/auth/signin');
  }

  return { userId: session.userId, accessToken: session.accessToken };
}

export async function deleteSession() {
  // @ts-expect-error
  await cookies().delete(cookie.name);

  redirect('/auth/signin');

}

