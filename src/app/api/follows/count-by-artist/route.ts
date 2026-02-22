import { NextRequest, NextResponse } from "next/server";
import { QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";

// GET /api/follows/count-by-artist?name=xxx → artist名でフォロワー数/フォロー数取得
export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) return NextResponse.json({ followers: 0, following: 0 });

  // artist名からuserIdを解決（サーバーサイドのみ）
  const { Items = [] } = await db.send(new ScanCommand({
    TableName: TABLE.tracks,
    FilterExpression: "artist = :a",
    ExpressionAttributeValues: { ":a": name },
    ProjectionExpression: "userId",
  }));

  if (Items.length === 0) return NextResponse.json({ followers: 0, following: 0 });
  const userId = Items[0].userId as string;

  const [{ Count: followers = 0 }, { Count: following = 0 }] = await Promise.all([
    db.send(new QueryCommand({
      TableName: TABLE.follows,
      IndexName: "followeeId-index",
      KeyConditionExpression: "followeeId = :id",
      ExpressionAttributeValues: { ":id": userId },
      Select: "COUNT",
    })),
    db.send(new QueryCommand({
      TableName: TABLE.follows,
      KeyConditionExpression: "followerId = :id",
      ExpressionAttributeValues: { ":id": userId },
      Select: "COUNT",
    })),
  ]);

  return NextResponse.json({ followers, following });
}
