import { NextRequest, NextResponse } from "next/server";
import { DeleteCommand, PutCommand, QueryCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";

// GET /api/follows?followerId=xxx  → フォロー中一覧
// GET /api/follows?followeeId=xxx  → フォロワー一覧
// GET /api/follows?followerId=xxx&followeeId=yyy → フォロー状態チェック
// GET /api/follows?countFor=xxx → { followers, following }
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const followerId = p.get("followerId");
  const followeeId = p.get("followeeId");
  const countFor = p.get("countFor");

  // カウント取得
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

  // フォロー状態チェック
  if (followerId && followeeId) {
    const { Item } = await db.send(new GetCommand({
      TableName: TABLE.follows,
      Key: { followerId, followeeId },
    }));
    return NextResponse.json({ following: !!Item });
  }

  // フォロー中一覧
  if (followerId) {
    const { Items = [] } = await db.send(new QueryCommand({
      TableName: TABLE.follows,
      KeyConditionExpression: "followerId = :id",
      ExpressionAttributeValues: { ":id": followerId },
    }));
    return NextResponse.json(Items);
  }

  // フォロワー一覧
  if (followeeId) {
    const { Items = [] } = await db.send(new QueryCommand({
      TableName: TABLE.follows,
      IndexName: "followeeId-index",
      KeyConditionExpression: "followeeId = :id",
      ExpressionAttributeValues: { ":id": followeeId },
    }));
    return NextResponse.json(Items);
  }

  return NextResponse.json([]);
}

// POST /api/follows  { followerId, followeeId } → トグル
export async function POST(req: NextRequest) {
  const { followerId, followeeId } = await req.json();
  if (!followerId || !followeeId || followerId === followeeId) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

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
