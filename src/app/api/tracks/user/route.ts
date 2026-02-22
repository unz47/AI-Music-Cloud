import { NextRequest, NextResponse } from "next/server";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";
import { getAuthUser, isUnauthorized } from "@/lib/auth-guard";

// 自分が投稿した曲一覧を取得（認証必須、GSI: userId-index）
export async function GET(_req: NextRequest) {
  const user = await getAuthUser();
  if (isUnauthorized(user)) return user;

  const { Items = [] } = await db.send(new QueryCommand({
    TableName: TABLE.tracks,
    IndexName: "userId-index",
    KeyConditionExpression: "userId = :uid",
    ExpressionAttributeValues: { ":uid": user.email },
  }));

  Items.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  const safe = Items.map(({ userId: _uid, ...rest }) => rest);
  return NextResponse.json(safe);
}
