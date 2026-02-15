import { NextRequest, NextResponse } from "next/server";
import { PutCommand, DeleteCommand, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";

// いいね状態チェック
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: trackId } = await params;
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ liked: false });

  const existing = await db.send(new GetCommand({
    TableName: TABLE.likes,
    Key: { userId, trackId },
  }));

  return NextResponse.json({ liked: !!existing.Item });
}

// いいねトグル
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: trackId } = await params;
  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  const existing = await db.send(new GetCommand({
    TableName: TABLE.likes,
    Key: { userId, trackId },
  }));

  // トラックがDBに存在するか確認
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
