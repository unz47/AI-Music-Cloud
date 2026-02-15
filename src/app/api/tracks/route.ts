import { NextRequest, NextResponse } from "next/server";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";

// 曲一覧取得
export async function GET() {
  const { Items = [] } = await db.send(new ScanCommand({ TableName: TABLE.tracks }));
  // 新しい順
  Items.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  return NextResponse.json(Items);
}

// 曲を登録
export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = {
    id: body.id ?? crypto.randomUUID(),
    title: body.title,
    artist: body.artist,
    artistImage: body.artistImage ?? null,
    userId: body.userId ?? "anonymous",
    genre: body.genre,
    aiTool: body.aiTool,
    audioKey: body.audioKey,
    artworkColor: body.artworkColor,
    duration: body.duration ?? 0,
    likeCount: 0,
    playCount: 0,
    createdAt: new Date().toISOString(),
  };
  await db.send(new PutCommand({ TableName: TABLE.tracks, Item: item }));
  return NextResponse.json(item, { status: 201 });
}
