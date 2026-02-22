import { NextRequest, NextResponse } from "next/server";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";

// GET /api/tracks/by-artist?name=xxx → artist名でトラック一覧取得
export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) return NextResponse.json([]);

  const { Items = [] } = await db.send(new ScanCommand({
    TableName: TABLE.tracks,
    FilterExpression: "artist = :a",
    ExpressionAttributeValues: { ":a": name },
  }));

  Items.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  return NextResponse.json(Items);
}
