import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getAuthUser, isUnauthorized } from "@/lib/auth-guard";

const BUCKET = process.env.S3_BUCKET!;
const s3 = new S3Client({ region: process.env.AWS_REGION ?? "ap-northeast-1" });

export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (isUnauthorized(user)) return user;

  const { fileName, contentType } = await req.json();

  if (!fileName || !contentType) {
    return NextResponse.json({ error: "fileName and contentType required" }, { status: 400 });
  }

  const prefix = contentType.startsWith("image/") ? "artwork" : "audio";
  const key = `${prefix}/${Date.now()}-${fileName}`;

  const url = await getSignedUrl(
    s3,
    new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: contentType }),
    { expiresIn: 300 },
  );

  return NextResponse.json({ url, key });
}
