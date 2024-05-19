import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthState, login, logout } from '@/utils/auth';

// List of routes that require authentication
const protectedRoutes = ['/dashboard', '/chat'];

// List of routes that should not be accessible to authenticated users
const unauthenticatedOnlyRoutes = ['/login', '/preregister'];

export async function middleware(req: NextRequest) {
  const { token, user } = await getAuthState();
  const { pathname, origin } = req.nextUrl;
  const userRoles = user?.roles || [];

  // Check if the requested route is protected
  if (protectedRoutes.includes(pathname)) {
    // If the user is authenticated, allow access to the protected route
    if (token && user) {
      // You can add additional role-based access control logic here
      return NextResponse.next();
    }

    // If the user is not authenticated, redirect them to the /login route
    return NextResponse.redirect(`${origin}/login`);
  }

  // Check if the requested route should only be accessible to unauthenticated users
  if (unauthenticatedOnlyRoutes.includes(pathname)) {
    // If the user is not authenticated, allow access to the route
    if (!token || !user) {
      return NextResponse.next();
    }

    // If the user is authenticated, redirect them to the /dashboard route
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  // For all other routes, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};