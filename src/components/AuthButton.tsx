"use client";

import { Plus } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

export function AuthButton({ onUploadClick }: { onUploadClick: () => void }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-9 w-20 animate-pulse rounded-lg bg-surface-3" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={onUploadClick}
          className="flex items-center gap-1.5 rounded-lg bg-accent-purple px-4 py-2 text-sm font-semibold text-white hover:bg-accent-purple-hover"
        >
          <Plus size={24} />
          Upload
        </button>
        <button
          onClick={() => signOut()}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-purple"
        >
          {session.user.image ? (
            <img src={session.user.image} alt="" className="h-9 w-9 rounded-full" />
          ) : (
            <span className="text-xs text-white">{session.user.name?.[0] ?? "?"}</span>
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="rounded-lg bg-surface-3 px-6 py-2.5 text-sm font-semibold text-text-secondary hover:bg-surface-4"
    >
      Log In
    </button>
  );
}
