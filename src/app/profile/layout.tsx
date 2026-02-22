import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プロフィール",
  description: "あなたのAI Music Cloudプロフィール。投稿したトラック、フォロワー数を確認。",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
