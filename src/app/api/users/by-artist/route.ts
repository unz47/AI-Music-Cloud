import { NextRequest, NextResponse } from "next/server";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";

// GET /api/users/by-artist?name=xxx → artist名からプロフィール情報（userIdは返さない）
export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });

  const { Items = [] } = await db.send(new ScanCommand({
    TableName: TABLE.tracks,
    FilterExpression: "artist = :a",
    ExpressionAttributeValues: { ":a": name },
  }));

  if (Items.length === 0) return NextResponse.json({ error: "not found" }, { status: 404 });

  const artistImage = Items[0].artistImage as string | null;

  // userIdは返さない。内部IDはサーバーサイドでのみ使用
  return NextResponse.json({ artist: name, artistImage });
}
