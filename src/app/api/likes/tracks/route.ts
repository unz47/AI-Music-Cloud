import { NextRequest, NextResponse } from "next/server";
import { QueryCommand, BatchGetCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";
import { getAuthUser, isUnauthorized } from "@/lib/auth-guard";

// 自分がいいねした曲の詳細一覧（認証必須）
export async function GET(_req: NextRequest) {
  const user = await getAuthUser();
  if (isUnauthorized(user)) return user;

  const { Items: likeItems = [] } = await db.send(new QueryCommand({
    TableName: TABLE.likes,
    KeyConditionExpression: "userId = :uid",
    ExpressionAttributeValues: { ":uid": user.email },
  }));

  if (likeItems.length === 0) return NextResponse.json([]);

  const keys = likeItems.map((i) => ({ id: i.trackId }));
  const { Responses } = await db.send(new BatchGetCommand({
    RequestItems: { [TABLE.tracks]: { Keys: keys } },
  }));

  const tracks = (Responses?.[TABLE.tracks] ?? []).map(({ userId, ...rest }) => rest);
  tracks.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  return NextResponse.json(tracks);
}
