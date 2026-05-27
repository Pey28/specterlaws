import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  // /admin/* — requiere role admin
  if (pathname.startsWith("/admin")) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if ((session.user as { role?: string }).role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // /perfil/* — requiere sesión
  if (pathname.startsWith("/perfil")) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/login?callbackUrl=/perfil", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/perfil/:path*", "/admin/:path*"],
};
