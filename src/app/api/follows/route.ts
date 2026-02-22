import { NextRequest, NextResponse } from "next/server";
import { DeleteCommand, PutCommand, QueryCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";
import { getAuthUser, isUnauthorized } from "@/lib/auth-guard";

// GET /api/follows?countFor=xxx → { followers, following }（認証不要）
// GET /api/follows?followeeId=xxx → フォロー状態チェック（認証必要: 自分のfollowerIdを使用）
// GET /api/follows?list=1 → 自分のフォロー中一覧（認証必要）
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const countFor = p.get("countFor");
  const followeeId = p.get("followeeId");
  const list = p.get("list");

  // カウント取得（認証不要）
  if (countFor) {
    const [{ Count: followers = 0 }, { Count: following = 0 }] = await Promise.all([
      db.send(new QueryCommand({
        TableName: TABLE.follows,
        IndexName: "followeeId-index",
        KeyConditionExpression: "followeeId = :id",
        ExpressionAttributeValues: { ":id": countFor },
        Select: "COUNT",
      })),
      db.send(new QueryCommand({
        TableName: TABLE.follows,
        KeyConditionExpression: "followerId = :id",
        ExpressionAttributeValues: { ":id": countFor },
        Select: "COUNT",
      })),
    ]);
    return NextResponse.json({ followers, following });
  }

  // 以降は認証必須
  const user = await getAuthUser();
  if (isUnauthorized(user)) return user;

  // フォロー状態チェック（自分→対象）
  if (followeeId) {
    const { Item } = await db.send(new GetCommand({
      TableName: TABLE.follows,
      Key: { followerId: user.email, followeeId },
    }));
    return NextResponse.json({ following: !!Item });
  }

  // 自分のフォロー中一覧
  if (list) {
    const { Items = [] } = await db.send(new QueryCommand({
      TableName: TABLE.follows,
      KeyConditionExpression: "followerId = :id",
      ExpressionAttributeValues: { ":id": user.email },
    }));

    const { Items: allTracks = [] } = await db.send(new ScanCommand({
      TableName: TABLE.tracks,
      ProjectionExpression: "userId, artist",
    }));
    const userArtistMap = new Map<string, string>();
    for (const t of allTracks) {
      if (t.userId && t.artist && !userArtistMap.has(t.userId as string)) {
        userArtistMap.set(t.userId as string, t.artist as string);
      }
    }

    // followeeId（メアド）をレスポンスから除外（🟡5の修正）
    const result = Items.map((item) => ({
      artistName: userArtistMap.get(item.followeeId as string) ?? "Unknown",
    }));
    return NextResponse.json(result);
  }

  return NextResponse.json([]);
}

// POST /api/follows { followeeId } → トグル（認証必須、followerIdはセッションから）
export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (isUnauthorized(user)) return user;

  const { followeeId } = await req.json();
  if (!followeeId || user.email === followeeId) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const followerId = user.email;

  const { Item } = await db.send(new GetCommand({
    TableName: TABLE.follows,
    Key: { followerId, followeeId },
  }));

  if (Item) {
    await db.send(new DeleteCommand({
      TableName: TABLE.follows,
      Key: { followerId, followeeId },
    }));
    return NextResponse.json({ following: false });
  }

  await db.send(new PutCommand({
    TableName: TABLE.follows,
    Item: { followerId, followeeId, createdAt: new Date().toISOString() },
  }));
  return NextResponse.json({ following: true });
}
