import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "マイトラック",
  description: "あなたが投稿したAI生成音楽の管理ページ。トラックの確認・削除ができます。",
};

export default function MyTracksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
