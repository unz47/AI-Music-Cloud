import { NextResponse } from "next/server";
import { auth } from "@/auth";

/** サーバーサイドで認証済みユーザーのemailを取得。未認証なら401レスポンスを返す */
export async function getAuthUser(): Promise<{ email: string } | NextResponse> {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return { email: session.user.email };
}

export function isUnauthorized(result: { email: string } | NextResponse): result is NextResponse {
  return result instanceof NextResponse;
}
