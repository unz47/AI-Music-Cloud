import { NextRequest, NextResponse } from "next/server";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await db.send(new DeleteCommand({ TableName: TABLE.tracks, Key: { id } }));
  return NextResponse.json({ deleted: true });
}
