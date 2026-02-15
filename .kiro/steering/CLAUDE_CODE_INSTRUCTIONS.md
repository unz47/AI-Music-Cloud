# Claude Code - 実装指示書

## 概要
AI生成音楽のキュレーション・共有プラットフォーム「AI Music Hub」のフロントエンドを実装してください。
NCS (https://ncs.io) を参考にしたダークテーマの音楽プラットフォームです。
ユーザーがSunoやUdio等で生成したAI音楽を投稿・共有でき、ジャンル別にブラウズ・試聴できるサイトです。

## プロジェクトセットアップ
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- 状態管理は React の useState/useContext で十分

## 実装する画面
トップページ（曲一覧 + 再生プレイヤー）

## データ構造
ダミーデータをJSONで用意（最低8曲）。各曲のデータ構造:

```typescript
type Genre =
  | "Pop" | "Rock" | "Hip-Hop" | "R&B"
  | "EDM" | "House" | "Future Bass" | "Dubstep"
  | "Lo-Fi" | "Jazz" | "Classical" | "Ambient"
  | "Trap" | "Drum & Bass" | "Phonk" | "Synthwave"

type AITool = "Suno" | "Udio" | "AIVA" | "Soundraw" | "Other"

interface Track {
  id: string
  title: string
  artist: string
  genre: Genre
  aiTool: AITool        // 生成に使ったAIツール
  artworkUrl: string    // プレースホルダー画像でOK
  audioUrl: string      // フリーのサンプル音源 or ダミー
  duration: number      // 秒
  createdAt: string     // ISO日付文字列
}
```

## コンポーネント構成
1. **Header** - ロゴ、検索バー（見た目だけでOK）、ログインボタン
2. **GenreFilter** - ジャンルタグのチップ一覧。クリックでフィルタリング
3. **TrackCard** - 曲カードコンポーネント。アートワーク、曲名、アーティスト、ジャンルバッジ、AIツールバッジ、再生ボタン
4. **TrackGrid** - TrackCardをグリッド表示（responsive: 1〜4列）
5. **AudioPlayer** - 画面下部固定のプレイヤーバー。HTML5 Audio APIで再生制御

## 機能要件
- ジャンルタグクリックで曲一覧をフィルタリング（"All"で全表示）
- カードクリックまたは再生ボタンでAudioPlayerに曲をセットして再生
- AudioPlayer: 再生/一時停止、シークバー、時間表示、音量調整
- 各カードにAI生成ツールのバッジ表示（Suno, Udio等）
- レスポンシブ対応（PC優先、モバイル対応）

## デザイン仕様
- ダークテーマ（Tailwind darkモード）
- 背景: #0a0a0a〜#1a1a1a
- アクセントカラー: purple-500 or cyan-400
- カードにホバーエフェクト（scale + shadow）
- 角丸カード

### UIモックアップ
※ Pencil MCPで生成したモックアップ画像を添付してください。
このデザインに沿って実装すること。

## ディレクトリ構成（推奨）
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── GenreFilter.tsx
│   ├── TrackCard.tsx
│   ├── TrackGrid.tsx
│   └── AudioPlayer.tsx
├── data/
│   └── tracks.ts          # ダミーデータ
├── types/
│   └── track.ts           # 型定義
└── contexts/
    └── PlayerContext.tsx   # 再生状態管理
```

## 注意事項
- まずはフロントエンドのみ。バックエンド・DB・認証は後のステップで追加する
- コンポーネントは再利用しやすい粒度で分割する
- 音源はダミーでOK（フリー素材のMP3 or 無音ファイル）
- Tailwind CSS のクラスで直接スタイリング（CSS モジュール不要）

## 今後のロードマップ（参考）
- Step 2: 投稿機能（アップロードフォーム + S3連携）
- Step 3: 認証（Cognito or NextAuth）
- Step 4: バックエンド（API Routes or Lambda + DynamoDB）
- Step 5: 検索機能の実装
- Step 6: ユーザープロフィール・いいね機能