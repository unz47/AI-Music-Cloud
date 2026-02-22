import { NextRequest, NextResponse } from "next/server";
import { PutCommand, DeleteCommand, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";
import { getAuthUser, isUnauthorized } from "@/lib/auth-guard";

// いいね状態チェック（認証必須）
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (isUnauthorized(user)) return user;

  const { id: trackId } = await params;
  const existing = await db.send(new GetCommand({
    TableName: TABLE.likes,
    Key: { userId: user.email, trackId },
  }));
  return NextResponse.json({ liked: !!existing.Item });
}

// いいねトグル（認証必須、userIdはセッションから）
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (isUnauthorized(user)) return user;

  const { id: trackId } = await params;
  const userId = user.email;

  const existing = await db.send(new GetCommand({
    TableName: TABLE.likes,
    Key: { userId, trackId },
  }));

  const track = await db.send(new GetCommand({
    TableName: TABLE.tracks,
    Key: { id: trackId },
  }));

  if (existing.Item) {
    await db.send(new DeleteCommand({ TableName: TABLE.likes, Key: { userId, trackId } }));
    if (track.Item) {
      await db.send(new UpdateCommand({
        TableName: TABLE.tracks, Key: { id: trackId },
        UpdateExpression: "ADD likeCount :dec",
        ExpressionAttributeValues: { ":dec": -1 },
      }));
    }
    return NextResponse.json({ liked: false });
  } else {
    await db.send(new PutCommand({ TableName: TABLE.likes, Item: { userId, trackId } }));
    if (track.Item) {
      await db.send(new UpdateCommand({
        TableName: TABLE.tracks, Key: { id: trackId },
        UpdateExpression: "ADD likeCount :inc",
        ExpressionAttributeValues: { ":inc": 1 },
      }));
    }
    return NextResponse.json({ liked: true });
  }
}
