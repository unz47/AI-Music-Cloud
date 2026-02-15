# UI Rules - AI Music Hub 🎵

> 参考: SoundCloud, YouTube Music, Spotify, NCS.io のモダンUIパターンを踏襲

---

## 1. スペーシングシステム（4px ベースグリッド）

モダンな音楽アプリ（Spotify, YouTube Music）は **4px ベースグリッド** を採用。
8の倍数を基本としつつ、細かい調整に 4px 単位を許容する。

| トークン | 値 | Tailwind | 用途 |
|---------|------|---------|------|
| `space-0.5` | 2px | `gap-0.5` | アイコン内余白 |
| `space-1` | 4px | `p-1` | バッジ内 padding、最小余白 |
| `space-2` | 8px | `p-2` | チップ内 padding、インライン要素間 |
| `space-3` | 12px | `p-3` | コンパクトカード内 padding |
| `space-4` | 16px | `p-4` | カード内 padding、リスト項目間 |
| `space-5` | 20px | `p-5` | セクション内要素間 |
| `space-6` | 24px | `p-6` | グリッド gap、セクション間 |
| `space-8` | 32px | `p-8` | ページ左右 padding（PC） |
| `space-10` | 40px | `p-10` | セクション間 margin |
| `space-12` | 48px | `p-12` | 大セクション間 |
| `space-16` | 64px | `p-16` | ヘッダー/フッター高さ |

### ルール
- コンポーネント内部: 4px / 8px / 12px / 16px
- コンポーネント間: 16px / 24px / 32px
- セクション間: 32px / 48px / 64px
- ページ余白: PC `32px` / タブレット `24px` / モバイル `16px`

---

## 2. カラーシステム

> 📎 詳細は **[COLOR_PALETTE.md](./COLOR_PALETTE.md)** を参照

**4色アクセント × ダーク/ライト デュアルテーマ:**

| # | 名前 | 役割 | ダーク | ライト |
|---|------|------|-------|-------|
| 1 | 🟣 ネオンパープル | CTA、選択、プログレスバー | `#a855f7` | `#9333ea` |
| 2 | 🔵 エレクトリックシアン | 再生中、リンク、波形 | `#22d3ee` | `#0891b2` |
| 3 | 🩷 ネオンピンク | いいね、通知、バッジ差し色 | `#ec4899` | `#db2777` |
| 4 | 🟢 エレクトリックライム | NEW バッジ、成功、アップロード | `#84cc16` | `#65a30d` |

- テーマ切り替え: `data-theme="dark|light"` + CSS カスタムプロパティ
- ダーク: グロー効果 + ボーダーで奥行き / ライト: シャドウで奥行き
- ジャンル別カラー: 8ジャンル × 固有グラデーション（テーマ非依存）

---

## 3. タイポグラフィ

フォント: `Inter` (Google Fonts) / フォールバック: `system-ui, -apple-system, sans-serif`

### 3.1 タイプスケール

| レベル | サイズ | ウェイト | 行間 | 字間 | 用途 |
|--------|--------|---------|------|------|------|
| Display | 32px (`text-3xl`) | 800 | 1.1 | `-0.02em` | ヒーロータイトル |
| Heading L | 24px (`text-2xl`) | 700 | 1.2 | `-0.01em` | ページタイトル |
| Heading M | 20px (`text-xl`) | 600 | 1.3 | `0` | セクション見出し |
| Heading S | 16px (`text-base`) | 600 | 1.4 | `0` | カード曲名 |
| Body | 14px (`text-sm`) | 400 | 1.5 | `0` | 本文、アーティスト名 |
| Caption | 12px (`text-xs`) | 500 | 1.4 | `0.01em` | バッジ、メタ情報 |
| Micro | 10px (`text-[10px]`) | 500 | 1.2 | `0.02em` | タイムスタンプ |

### 3.2 ルール
- 見出しは **1行に収める**（`truncate` / `line-clamp-1`）
- アーティスト名は最大2行（`line-clamp-2`）
- ダークモードでは **Regular (400) 以上** のウェイトを使用（Light は視認性低下）
- 字間（letter-spacing）: 見出しはタイト、本文はデフォルト

---

## 4. 角丸（Border Radius）

YouTube Music / Spotify のモダンな角丸ルール:

| 要素 | 値 | Tailwind |
|------|------|---------|
| カード（大） | 12px | `rounded-xl` |
| カード（小）/ ボタン | 8px | `rounded-lg` |
| チップ / バッジ / タグ | 9999px | `rounded-full` |
| 入力フィールド | 8px | `rounded-lg` |
| アートワーク画像 | 8px | `rounded-lg` |
| アバター | 9999px | `rounded-full` |
| プログレスバー | 9999px | `rounded-full` |
| モーダル / ダイアログ | 16px | `rounded-2xl` |

---

## 5. レイアウト

### 5.1 ページ構造

```
┌─────────────────────────────────────┐
│ Header (h: 64px, fixed, z-40)       │
├─────────────────────────────────────┤
│ Filter Bar (h: 48px, sticky)        │
├─────────────────────────────────────┤
│                                     │
│  Main Content (max-w: 1440px)       │
│  padding: 32px (PC) / 16px (SP)    │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌────┐ │
│  │ Card │ │ Card │ │ Card │ │Card│ │
│  └──────┘ └──────┘ └──────┘ └────┘ │
│                                     │
├─────────────────────────────────────┤
│ Player Bar (h: 72-80px, fixed, z-50)│
└─────────────────────────────────────┘
```

- 最大幅: `1440px` (`max-w-[1440px]`)
- コンテンツ最大幅: `1280px` (`max-w-7xl`)
- 中央寄せ: `mx-auto`

### 5.2 グリッド（TrackCard）

| 画面幅 | カラム数 | gap |
|--------|---------|-----|
| < 640px | 2列 | 12px |
| 640–767px | 2列 | 16px |
| 768–1023px | 3列 | 16px |
| 1024–1279px | 4列 | 20px |
| ≥ 1280px | 5列 | 24px |

> 各ブレークポイントでカラム数を固定し、カードは `1fr` で均等幅にする。  
> `auto-fill` / `minmax()` は使わない（行ごとのカード数がばらつくため）。

Tailwind 実装:
```html
<div class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-6">
```

### 5.3 固定要素

| 要素 | 高さ | 位置 |
|------|------|------|
| ヘッダー | 64px | `fixed top-0` |
| フィルターバー | 48px | `sticky top-16` |
| プレイヤーバー | 72px (SP) / 80px (PC) | `fixed bottom-0` |

### 5.4 コンテンツ領域の padding 調整
```css
/* ヘッダー + フッタープレイヤー分のスペース確保 */
main {
  padding-top: 112px;   /* 64px header + 48px filter */
  padding-bottom: 80px; /* player bar */
}
```

---

## 6. コンポーネントパターン

### 6.1 TrackCard（SoundCloud / Spotify 風）

```
┌──────────────────┐
│ ┌──────────────┐ │
│ │              │ │  ← アートワーク（1:1 アスペクト比）
│ │   ▶ (hover)  │ │  ← 再生ボタン（ホバーで表示）
│ │              │ │
│ └──────────────┘ │
│ Track Title       │  ← 16px / semibold / white / truncate
│ Artist Name       │  ← 14px / regular / #b3b3b3 / truncate
│ ┌──────┐          │
│ │ EDM  │          │  ← ジャンルバッジ 12px / pill
│ └──────┘          │
└──────────────────┘
```

- カード背景: `Surface 1` (#121212)
- ホバー: `Surface 3` (#242424) + `scale(1.02)` + shadow
- アートワーク上の再生ボタン: `opacity-0 → hover:opacity-100`
- アートワークオーバーレイ: `bg-black/40`

### 6.2 プレイヤーバー（YouTube Music 風）

```
┌─────────────────────────────────────────────────────┐
│ [🎵] Title - Artist  │  ◀ ▶ ▷  │ ━━━━━●━━━  │ 🔊━━ │
│  48px                │  controls │  seekbar    │ vol  │
└─────────────────────────────────────────────────────┘
```

- 背景: `Surface 2` (#1a1a1a) + `backdrop-blur-xl` + 上部ボーダー `border-t border-white/5`
- プログレスバー: アクセントカラー、高さ 4px、ホバー時 6px に拡大
- サムネイル: 48px × 48px、`rounded-lg`

### 6.3 ジャンルフィルター（チップ）

- 非選択: `Surface 3` 背景 + `text-secondary`
- 選択中: `accent` 背景 + `text-primary`
- ホバー: `Surface 4` 背景
- padding: `8px 16px`
- 横スクロール: `overflow-x-auto` + `scrollbar-hide`
- gap: `8px`

---

## 7. アニメーション統一ルール

### 7.0 基本原則

1. **GPU プロパティのみアニメーション**: `transform` と `opacity` だけを動かす。`width`, `height`, `top`, `left`, `margin`, `padding` のアニメーションは禁止（レイアウトシフト回避）
2. **`transition-all` 禁止**: 必ずアニメーション対象プロパティを明示する（例: `transition-[transform,opacity]`）。意図しないプロパティが動くのを防ぐ
3. **`prefers-reduced-motion` 必須対応**: すべてのアニメーションは `motion-safe:` プレフィックス付きで記述するか、グローバルで無効化する
4. **同時アニメーション上限**: 1つのインタラクションで同時に動くプロパティは最大3つまで
5. **`@keyframes` の命名**: `kebab-case` で用途を明示（例: `shimmer-loading`, `fade-in`, `slide-up`）

### 7.1 デュレーション・イージングトークン

| トークン | 値 | Tailwind | 用途 |
|---------|------|---------|------|
| `duration-instant` | 100ms | `duration-100` | プログレスバー、トグル |
| `duration-fast` | 150ms | `duration-150` | 色変化、opacity |
| `duration-normal` | 200ms | `duration-200` | transform、ホバー全般 |
| `duration-slow` | 300ms | `duration-300` | ページ遷移、パネル開閉 |
| `duration-slower` | 500ms | `duration-500` | ルート遷移、大きなレイアウト変更 |

| トークン | 値 | Tailwind | 用途 |
|---------|------|---------|------|
| `ease-out` | `cubic-bezier(0.0, 0, 0.2, 1)` | `ease-out` | 要素の出現・展開（デフォルト） |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | `ease-in` | 要素の退出・縮小 |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | `ease-in-out` | ページ遷移、位置移動 |
| `ease-linear` | `linear` | `ease-linear` | プログレスバー、ローディング |

### 7.2 インタラクション別パターン

| インタラクション | プロパティ | duration | easing | Tailwind |
|----------------|-----------|----------|--------|----------|
| ホバー（色） | `background-color` | 150ms | `ease-out` | `transition-colors duration-150` |
| ホバー（浮き） | `transform, box-shadow` | 200ms | `ease-out` | `motion-safe:transition-[transform,box-shadow] duration-200` |
| フェードイン/アウト | `opacity` | 150ms | `ease-out` / `ease-in` | `motion-safe:transition-opacity duration-150` |
| スケール（ボタン押下） | `transform` | 150ms | `ease-out` | `motion-safe:active:scale-95 transition-transform duration-150` |
| スライド（パネル） | `transform` | 300ms | `ease-in-out` | `motion-safe:transition-transform duration-300 ease-in-out` |
| モーダル表示 | `opacity, transform` | 200ms | `ease-out` | `motion-safe:transition-[opacity,transform] duration-200` |
| モーダル非表示 | `opacity, transform` | 150ms | `ease-in` | `motion-safe:transition-[opacity,transform] duration-150 ease-in` |

### 7.3 コンポーネント適用例

**カードホバー:**
```html
<div class="transition-colors duration-150 motion-safe:transition-[transform,box-shadow,background-color] motion-safe:duration-200
            hover:scale-[1.02] hover:bg-[var(--surface-3)] hover:shadow-card-hover">
```

**再生ボタン（アートワーク上）:**
```html
<!-- オーバーレイ -->
<div class="opacity-0 group-hover:opacity-100 motion-safe:transition-opacity duration-150">
  <!-- ボタン -->
  <button class="scale-75 group-hover:scale-100 motion-safe:transition-transform duration-150">
```

**プログレスバー:**
- 通常: 高さ 4px、`accent` カラー
- ホバー: 高さ 6px に拡大 + つまみ（ノブ）表示
- つまみ: 12px 円、`accent` カラー、`opacity-0 → hover:opacity-100`
- バー進行: `duration-instant` + `ease-linear`

**スケルトンローディング:**
```css
@keyframes shimmer-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: shimmer-loading 1.5s infinite linear;
}
```

### 7.4 禁止事項

| ❌ やってはいけない | ✅ 代わりにこうする |
|-------------------|-------------------|
| `transition: all` | `transition-property` を明示 |
| `width` / `height` をアニメーション | `transform: scale()` を使う |
| `top` / `left` をアニメーション | `transform: translate()` を使う |
| 300ms 超のホバーアニメーション | ホバーは最大 200ms |
| `motion-safe:` なしの transform/scale | 必ず `motion-safe:` を付ける |
| `animation-duration: infinite` を装飾に多用 | ローディング系のみ許可 |

---

## 8. Glassmorphism（控えめに使用）

YouTube Music / Spotify のモダンUIで使われる半透明効果:

```css
.glass {
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

適用箇所（限定的に）:
- ヘッダー（スクロール時）
- プレイヤーバー
- モーダル背景

> ⚠️ 乱用しない。パフォーマンスに影響するため、固定要素のみに使用。

---

## 9. シャドウ & エレベーション

ダークテーマでは影が見えにくいため、**ボーダー + 微妙な影** の組み合わせ:

| レベル | 用途 | CSS |
|--------|------|-----|
| Elevation 0 | フラット要素 | なし |
| Elevation 1 | カード | `shadow-lg shadow-black/20` + `border border-white/5` |
| Elevation 2 | ホバーカード | `shadow-2xl shadow-black/30` |
| Elevation 3 | ドロップダウン | `shadow-2xl shadow-black/40` + `border border-white/10` |
| Elevation 4 | モーダル | `shadow-2xl shadow-black/50` + `border border-white/10` |

---

## 10. アイコン

ライブラリ: `lucide-react`（Spotify / YouTube Music 風の線画アイコン）

| サイズ | 値 | 用途 |
|--------|------|------|
| Small | 16px | バッジ内、インラインアイコン |
| Medium | 20px | ナビゲーション、ボタン内 |
| Large | 24px | プレイヤーコントロール |
| XL | 32px | カード上の再生ボタン |
| Hero | 48px | 空状態、エラー画面 |

アイコンカラー: テキストカラーに準拠（`currentColor`）

---

## 11. z-index レイヤー

| レイヤー | z-index | 要素 |
|---------|---------|------|
| Base | `z-0` | メインコンテンツ |
| Sticky | `z-10` | フィルターバー |
| Dropdown | `z-20` | ドロップダウン、ポップオーバー |
| Header | `z-30` | ヘッダー |
| Player | `z-40` | フッタープレイヤーバー |
| Overlay | `z-50` | モーダル背景 |
| Modal | `z-60` | モーダル本体 |
| Toast | `z-70` | トースト通知 |

---

## 12. レスポンシブ

Tailwind デフォルトブレークポイント:

| プレフィックス | 幅 | 対象 |
|--------------|------|------|
| (default) | < 640px | モバイル |
| `sm` | ≥ 640px | モバイル横 |
| `md` | ≥ 768px | タブレット |
| `lg` | ≥ 1024px | デスクトップ |
| `xl` | ≥ 1280px | ワイドデスクトップ |
| `2xl` | ≥ 1536px | 超ワイド |

### モバイル対応ルール
- タッチターゲット: 最小 **44px × 44px**
- プレイヤーバー: モバイルではシンプル化（音量スライダー非表示）
- グリッド: モバイルは2列（1列だとスカスカになる）
- フィルターバー: 横スクロール + スクロールバー非表示

---

## 13. アクセシビリティ

| ルール | 基準 |
|--------|------|
| カラーコントラスト | WCAG AA（通常テキスト 4.5:1、大テキスト 3:1） |
| フォーカスリング | `outline: 2px solid #a855f7; outline-offset: 2px` |
| キーボード操作 | すべてのインタラクティブ要素に `tabindex` / `role` |
| スクリーンリーダー | 再生ボタンに `aria-label="Play {曲名}"` |
| モーション | `prefers-reduced-motion` でアニメーション無効化 |

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 14. 命名規則

| 対象 | ルール | 例 |
|------|--------|-----|
| コンポーネント | PascalCase | `TrackCard.tsx`, `AudioPlayer.tsx` |
| ユーティリティ / データ | camelCase | `tracks.ts`, `formatTime.ts` |
| 型定義 | camelCase + PascalCase 型名 | `types/track.ts` → `interface Track` |
| CSS カスタムクラス | `@layer components` in `globals.css` |
| カラー変数 | `--color-{name}` | `--color-surface-1` |

---

## 15. パフォーマンスルール

| ルール | 詳細 |
|--------|------|
| 画像 | `next/image` + WebP + lazy loading |
| アートワーク | 固定サイズ（300×300, 600×600）で最適化 |
| フォント | `next/font` で Inter を最適読み込み |
| `backdrop-filter` | 固定要素のみ（最大2箇所） |
| アニメーション | `transform` / `opacity` のみ（レイアウトシフト回避） |
| バンドル | コンポーネント単位で dynamic import |
