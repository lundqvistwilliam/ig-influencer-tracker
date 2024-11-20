import { decrypt } from "@/lib/sessions/sessions";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ['/home', '/dashboard', '/settings', '/campaigns/:path*'],
};

/*
export default async function middleware(req: NextRequest) {
  const protectedRoutes = ['/home', '/dashboard', '/settings', '/campaigns'];
  const currentPath = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (isProtectedRoute) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (sessionCookie) {
      const session = await decrypt(sessionCookie.value);

      if (session?.userId) {
        console.log(session);
        return NextResponse.next();
      }
    }

    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
  }
  return NextResponse.next();
}
  */



/*
export default async function middleware(req: NextRequest) {
  const protectedRoutes = ['/home', '/dashboard', '/settings', '/campaigns'];
  const currentPath = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (isProtectedRoute) {
    try {
      // Verify the session and get userId
      const { userId } = await verifySession();

      // If the userId is valid, proceed with the request
      console.log('Authenticated User ID:', userId);
      return NextResponse.next();
    } catch (error) {
      // If verification fails, redirect to login page
      console.log('Session is invalid or expired');
      return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
    }
  }

  // For non-protected routes, just continue
  return NextResponse.next();
}
*/

/*
export default async function middleware(req: NextRequest) {
  const protectedRoutes = ['/home', '/dashboard', '/settings', '/campaigns'];
  const currentPath = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (isProtectedRoute) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session'); // Retrieve the session cookie

    if (sessionCookie) {
      const session = await decrypt(sessionCookie.value); // Decrypt the session cookie
      console.log('Decrypted session:', session);


      if (session?.userId) {
        // If user is authenticated, proceed to call /users/me to get user data
        const token = session;
        console.log("Session", session);
        console.log("token: ", token);
        if (token) {
          console.log("has token");
          try {
            // Make an API request to the backend to get the user data
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`, // Send the JWT token in the Authorization header
              },
            });

            console.log("before response ok");
            if (response.ok) {
              console.log("response ok");
              const userData = await response.json();
              // You now have the user data, and you can do something with it
              console.log(userData);

              // Proceed to the requested page if the user is authenticated
              return NextResponse.next();
            } else {
              console.log("tokendddd", token);
              console.log('Invalid or expired token');
              return NextResponse.redirect(new URL('/auth/signin', req.nextUrl)); // Invalid token, redirect to login
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            return NextResponse.redirect(new URL('/auth/signin', req.nextUrl)); // On error, redirect to login
          }
        } else {
          return NextResponse.redirect(new URL('/auth/signin', req.nextUrl)); // No token in session, redirect to login
        }
      }
    }

    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl)); // No session or userId, redirect to login
  }

  // For non-protected routes, just continue
  return NextResponse.next();
}
  */



export default async function middleware(req: NextRequest) {
  const protectedRoutes = ['/home', '/dashboard', '/settings', '/campaigns'];
  const currentPath = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (isProtectedRoute) {
    try {
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get('session');

      if (!sessionCookie) {
        console.log('No session cookie found');
        return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
      }

      console.log('Session cookie found:', sessionCookie.value);

      const session = await decrypt(sessionCookie.value);
      console.log('Decrypted session:', session);

      if (!session?.userId) {
        console.log('No userId in session');
        return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionCookie.value}`,
          },
        });

        if (!response.ok) {
          console.log('API response not ok:', response.status);
          return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
        }

        // const userData = await response.json();
        // console.log('User data:', userData);
        // let x = NextResponse.next();
        // x.cookies.set("user-data", JSON.stringify(userData));
        // return x;


        return NextResponse.next();
      } catch (error) {
        console.error('API request error:', error);
        return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
      }
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
    }
  }
  console.log("?XD");

  return NextResponse.next();
}

export async function cookieTranslate(cookieSession) {
  const session = await decrypt(cookieSession);
  console.log('Decrypted session:', session);
  return session;
}

