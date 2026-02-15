AI Music Hub 🎵
AI生成音楽のキュレーション・共有プラットフォーム
コンセプト

AI生成音楽に特化したNCSライクなプラットフォーム
ジャンル別にカテゴリ分けされた楽曲ライブラリ（Pop, Rock, EDM, Lo-Fi, Jazz, Classical等）
ユーザーがSuno/Udio等で生成したAI音楽を投稿・共有できるオープンなコミュニティ

技術スタック

Frontend: Next.js 14+ (App Router) / TypeScript / Tailwind CSS
Backend: (後日追加) Lambda + API Gateway
Database: (後日追加) DynamoDB
Storage: (後日追加) S3
Auth: (後日追加) Cognito or NextAuth

開発ワークフロー

Pencil MCP → UI設計・モックアップ生成 (docs/PENCIL_INSTRUCTIONS.md)
Claude Code → 実装 (docs/CLAUDE_CODE_INSTRUCTIONS.md)

ロードマップ

 Step 0: プロジェクト設計・指示書作成
 Step 1: トップページ（曲一覧 + 再生プレイヤー）
 Step 2: 投稿機能（アップロードフォーム + S3連携）
 Step 3: 認証
 Step 4: バックエンド API
 Step 5: 検索機能
 Step 6: ユーザープロフィール・いいね機能