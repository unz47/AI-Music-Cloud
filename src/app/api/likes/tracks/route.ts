import { NextRequest, NextResponse } from "next/server";
import { QueryCommand, BatchGetCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";

// ユーザーがいいねした曲の詳細一覧を取得
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json([]);

  // 1. いいねしたtrackIdを取得
  const { Items: likeItems = [] } = await db.send(new QueryCommand({
    TableName: TABLE.likes,
    KeyConditionExpression: "userId = :uid",
    ExpressionAttributeValues: { ":uid": userId },
  }));

  if (likeItems.length === 0) return NextResponse.json([]);

  // 2. BatchGetでトラック詳細を取得
  const keys = likeItems.map((i) => ({ id: i.trackId }));
  const { Responses } = await db.send(new BatchGetCommand({
    RequestItems: { [TABLE.tracks]: { Keys: keys } },
  }));

  const tracks = Responses?.[TABLE.tracks] ?? [];
  tracks.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  return NextResponse.json(tracks);
}
