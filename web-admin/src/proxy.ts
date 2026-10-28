import { NextResponse } from "next/server";
import { isAdminConsoleLocked } from "@/lib/public-access";

export function proxy() {
  if (!isAdminConsoleLocked()) return NextResponse.next();

  return new NextResponse("This console is not available.\n", {
    status: 403,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "x-robots-tag": "noindex, nofollow, noarchive",
      "cache-control": "no-store",
    },
  });
}

// robots.txt stays reachable so crawlers can still read the Disallow rule.
export const config = {
  matcher: ["/((?!_next/static|_next/image|robots.txt|favicon.ico).*)"],
};
