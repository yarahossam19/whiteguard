import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getUpstreamApplicationsUrl(): string {
  const raw =
    process.env.PARTNER_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_PARTNER_API_URL?.trim() ||
    "";
  const base = raw.replace(/\/$/, "") || "https://partner.whiteguard.io";
  return `${base}/api/applications`;
}

/**
 * Server-side proxy: browser posts here (same origin) to avoid CORS on partner.whiteguard.io.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const upstream = getUpstreamApplicationsUrl();

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(upstream, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("[partner-applications] upstream fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to reach partner API. Try again later." },
      { status: 502 },
    );
  }

  const text = await upstreamRes.text();
  let payload: unknown = {};
  if (text) {
    try {
      payload = JSON.parse(text) as unknown;
    } catch {
      payload = { message: text };
    }
  }

  return NextResponse.json(payload, { status: upstreamRes.status });
}
