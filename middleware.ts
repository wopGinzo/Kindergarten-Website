import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthState, login, logout} from '@/utils/auth'

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/preregister','/'];

export async function middleware(req: NextRequest) {
    const { token, user} = await getAuthState();
  const { pathname, origin } = req.nextUrl;
  console.log(user?.sub,"with",token,"reaching",pathname)
  // Check if the current route is public
  if (publicRoutes.includes(pathname)) {
    // If the user is authenticated, redirect them to the /dashboard route
    if (token) {
      return NextResponse.redirect(`${origin}/dashboard`);
    }

    // If the user is not authenticated, allow access to the public route
    return NextResponse.next();
  }

  // Check if the requested route is the /dashboard route
  if (pathname === '/dashboard') {
    // If the user is authenticated, allow access to the /dashboard route
    if (token) {
      return NextResponse.next();
    }

    // If the user is not authenticated, redirect them to the /login route
    return NextResponse.redirect(`${origin}/login`);
  }

  // For all other routes, allow the request to proceed if the user is authenticated
  if (token && user) {
    return NextResponse.next();
  }

  // If the user is not authenticated, redirect them to the /login route
  return NextResponse.redirect(`${origin}/login`);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};