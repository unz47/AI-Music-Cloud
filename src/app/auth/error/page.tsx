"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-0">
      <div className="max-w-md rounded-2xl border border-border-default bg-surface-1 p-8 text-center">
        <h1 className="mb-4 text-xl font-bold text-text-primary">認証エラー</h1>
        <p className="mb-6 text-sm text-text-secondary">
          {error === "Configuration"
            ? "サーバーの設定に問題があります。しばらくしてからお試しください。"
            : "認証中にエラーが発生しました。もう一度お試しください。"}
        </p>
        <a
          href="/"
          className="inline-block rounded-lg bg-accent-purple px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-purple-hover"
        >
          ホームに戻る
        </a>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  );
}
