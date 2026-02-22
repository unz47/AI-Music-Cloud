import { NextRequest, NextResponse } from "next/server";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";
import { getAuthUser, isUnauthorized } from "@/lib/auth-guard";

// 自分の全いいね取得（認証必須）
export async function GET(_req: NextRequest) {
  const user = await getAuthUser();
  if (isUnauthorized(user)) return user;

  const { Items = [] } = await db.send(new QueryCommand({
    TableName: TABLE.likes,
    KeyConditionExpression: "userId = :uid",
    ExpressionAttributeValues: { ":uid": user.email },
  }));

  return NextResponse.json(Items.map((i) => i.trackId));
}
