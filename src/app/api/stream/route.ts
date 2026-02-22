import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3, BUCKET } from "@/lib/s3";

const ALLOWED_PREFIXES = ["audio/", "artwork/"];

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "key required" }, { status: 400 });
  }

  if (key.includes("..") || !ALLOWED_PREFIXES.some((p) => key.startsWith(p))) {
    return NextResponse.json({ error: "invalid key" }, { status: 400 });
  }

  const redirect = req.nextUrl.searchParams.get("redirect");

  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: BUCKET, Key: key }),
    { expiresIn: 3600 },
  );

  if (redirect) {
    return NextResponse.redirect(url);
  }

  return NextResponse.json({ url });
}
