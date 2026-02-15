import { NextRequest, NextResponse } from "next/server";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { db, TABLE } from "@/lib/db";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.send(new UpdateCommand({
    TableName: TABLE.tracks,
    Key: { id },
    UpdateExpression: "ADD playCount :inc",
    ExpressionAttributeValues: { ":inc": 1 },
    ConditionExpression: "attribute_exists(id)",
  }));
  return NextResponse.json({ ok: true });
}
