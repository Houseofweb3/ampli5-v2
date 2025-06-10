import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  // Set the current path
  headers.set("x-current-path", request.nextUrl.pathname);

  // Set the 'id' query parameter for redirecting user to article page if he logs in from article page 
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    headers.set("x-query-id", id);
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
