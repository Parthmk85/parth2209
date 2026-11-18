import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // job.ezcods.com is this same app; its home page is /job.
  if (pathname === "/" && (request.headers.get("host") ?? "").startsWith("job.")) {
    // Must stay an internal rewrite: the job.ezcods.com nginx block omits
    // X-Forwarded-Proto, otherwise Next targets https://localhost:3700 and 500s.
    const url = request.nextUrl.clone();
    url.pathname = "/job";
    return NextResponse.rewrite(url);
  }

  // Only protect routes starting with /admin, but exclude /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification failed:", error);
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};
