import { NextResponse, NextRequest } from "next/server";
import { auth, firebaseConfig } from "./lib/firebase/firebaseConfig";
import { initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("fb-auth-token")?.value;
  if (!token && request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  const firebaseServerApp = initializeServerApp(firebaseConfig, {
    authIdToken: token,
  });
  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  if (
    !auth.currentUser &&
    request.nextUrl.pathname !== "/login" &&
    request.nextUrl.pathname !== "/register"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
