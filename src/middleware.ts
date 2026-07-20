import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPlaceholderResourceId } from "@/data/resource-details";

export function middleware(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/resources\/([^/]+)\/?$/);
  if (!match) return NextResponse.next();

  const id = match[1];
  if (!isPlaceholderResourceId(id)) return NextResponse.next();

  return new NextResponse("This resource has been removed.", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export const config = {
  matcher: ["/resources/:id"],
};
