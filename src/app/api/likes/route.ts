import { NextRequest, NextResponse } from "next/server";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";

// ユーザーの全いいね取得
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json([]);

  const { Items = [] } = await db.send(new QueryCommand({
    TableName: TABLE.likes,
    KeyConditionExpression: "userId = :uid",
    ExpressionAttributeValues: { ":uid": userId },
  }));

  return NextResponse.json(Items.map((i) => i.trackId));
}
