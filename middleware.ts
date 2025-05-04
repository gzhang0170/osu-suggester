import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (
    process.env.MAINTENANCE_MODE === "true" &&
    !req.nextUrl.pathname.startsWith("/maintenance") &&
    !req.nextUrl.pathname.startsWith("/_next") &&
    !req.nextUrl.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.rewrite(new URL("/maintenance", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|maintenance|changelog|favicon.ico).*)"],
};
