import { NextRequest, NextResponse } from "next/server";
import { DeleteCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";
import { getAuthUser, isUnauthorized } from "@/lib/auth-guard";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAuthUser();
  if (isUnauthorized(user)) return user;

  const { id } = await params;

  // 所有者チェック
  const { Item } = await db.send(new GetCommand({ TableName: TABLE.tracks, Key: { id } }));
  if (!Item) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (Item.userId !== user.email) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  await db.send(new DeleteCommand({ TableName: TABLE.tracks, Key: { id } }));
  return NextResponse.json({ deleted: true });
}
