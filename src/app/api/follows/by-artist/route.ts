import { NextRequest, NextResponse } from "next/server";
import { DeleteCommand, PutCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";
import { getAuthUser, isUnauthorized } from "@/lib/auth-guard";

// POST /api/follows/by-artist { artistName } → artist名でフォロートグル
export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (isUnauthorized(user)) return user;

  const { artistName } = await req.json();
  if (!artistName) return NextResponse.json({ error: "artistName required" }, { status: 400 });

  // artist名からuserIdを解決
  const { Items = [] } = await db.send(new ScanCommand({
    TableName: TABLE.tracks,
    FilterExpression: "artist = :a",
    ExpressionAttributeValues: { ":a": artistName },
    ProjectionExpression: "userId",
  }));

  if (Items.length === 0) return NextResponse.json({ error: "artist not found" }, { status: 404 });
  const followeeId = Items[0].userId as string;

  if (user.email === followeeId) {
    return NextResponse.json({ error: "cannot follow yourself" }, { status: 400 });
  }

  const followerId = user.email;

  const { Item } = await db.send(new GetCommand({
    TableName: TABLE.follows,
    Key: { followerId, followeeId },
  }));

  if (Item) {
    await db.send(new DeleteCommand({ TableName: TABLE.follows, Key: { followerId, followeeId } }));
    return NextResponse.json({ following: false });
  }

  await db.send(new PutCommand({
    TableName: TABLE.follows,
    Item: { followerId, followeeId, createdAt: new Date().toISOString() },
  }));
  return NextResponse.json({ following: true });
}

// GET /api/follows/by-artist?artistName=xxx → 自分がこのartistをフォローしているか
export async function GET(req: NextRequest) {
  const user = await getAuthUser();
  if (isUnauthorized(user)) return user;

  const artistName = req.nextUrl.searchParams.get("artistName");
  if (!artistName) return NextResponse.json({ following: false });

  const { Items = [] } = await db.send(new ScanCommand({
    TableName: TABLE.tracks,
    FilterExpression: "artist = :a",
    ExpressionAttributeValues: { ":a": artistName },
    ProjectionExpression: "userId",
  }));

  if (Items.length === 0) return NextResponse.json({ following: false });
  const followeeId = Items[0].userId as string;

  const { Item } = await db.send(new GetCommand({
    TableName: TABLE.follows,
    Key: { followerId: user.email, followeeId },
  }));

  return NextResponse.json({ following: !!Item });
}
