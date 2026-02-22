import { NextRequest, NextResponse } from "next/server";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";
import { getAuthUser, isUnauthorized } from "@/lib/auth-guard";

// 曲一覧取得（認証不要）
export async function GET() {
  const { Items = [] } = await db.send(new ScanCommand({ TableName: TABLE.tracks }));
  Items.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));

  // userIdをレスポンスから除外（🟡6の修正）
  const safe = Items.map(({ userId, ...rest }) => rest);
  return NextResponse.json(safe);
}

// 曲を登録（認証必須）
export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (isUnauthorized(user)) return user;

  const body = await req.json();
  const item = {
    id: body.id ?? crypto.randomUUID(),
    title: body.title,
    artist: body.artist,
    artistImage: body.artistImage ?? null,
    userId: user.email, // セッションから強制設定（なりすまし防止）
    genre: body.genre,
    aiTool: body.aiTool,
    audioKey: body.audioKey,
    artworkKey: body.artworkKey ?? null,
    artworkColor: body.artworkColor,
    description: body.description ?? "",
    duration: body.duration ?? 0,
    likeCount: 0,
    playCount: 0,
    createdAt: new Date().toISOString(),
  };
  await db.send(new PutCommand({ TableName: TABLE.tracks, Item: item }));
  const { userId: _uid, ...safe } = item;
  return NextResponse.json(safe, { status: 201 });
}
