import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "いいねした曲",
  description: "あなたがいいねしたAI生成音楽の一覧。お気に入りのトラックをまとめて聴こう。",
};

export default function LikedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
