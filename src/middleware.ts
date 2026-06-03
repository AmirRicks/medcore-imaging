import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 100;
const ipRequests = new Map<string, { count: number; resetAt: number }>();

function getRateLimitInfo(ip: string) {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  if (!entry || now > entry.resetAt) {
    const newEntry = { count: 1, resetAt: now + RATE_LIMIT_WINDOW };
    ipRequests.set(ip, newEntry);
    return { remaining: RATE_LIMIT_MAX - 1, limit: RATE_LIMIT_MAX };
  }
  entry.count++;
  return { remaining: Math.max(0, RATE_LIMIT_MAX - entry.count), limit: RATE_LIMIT_MAX };
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (request.nextUrl.pathname.startsWith("/api/")) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const rateInfo = getRateLimitInfo(ip);
    response.headers.set("X-RateLimit-Limit", rateInfo.limit.toString());
    response.headers.set("X-RateLimit-Remaining", rateInfo.remaining.toString());

    if (rateInfo.remaining <= 0) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
