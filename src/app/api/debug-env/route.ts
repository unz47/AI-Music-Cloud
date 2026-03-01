import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasAuthSecret: !!process.env.AUTH_SECRET,
    hasGoogleId: !!process.env.AUTH_GOOGLE_ID,
    hasGoogleSecret: !!process.env.AUTH_GOOGLE_SECRET,
    authUrl: process.env.AUTH_URL ?? "NOT SET",
    trustHost: process.env.AUTH_TRUST_HOST ?? "NOT SET",
    nodeEnv: process.env.NODE_ENV,
  });
}
