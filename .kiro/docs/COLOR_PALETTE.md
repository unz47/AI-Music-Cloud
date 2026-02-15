# Color Palette - AI Music Hub 🎵

> 4色アクセント × ダーク/ライト デュアルテーマ カラーシステム
> 参考: Spotify, YouTube Music, SoundCloud, NCS.io

---

## カラーコンセプト

**「深夜のクラブ × 昼間のフェス」**

ダークテーマ = 深夜のクラブ、ネオンが映える空間
ライトテーマ = 晴れた日の野外フェス、クリーンで開放的

### 4色アクセント構成

| # | 名前 | 役割 | ダーク HEX | ライト HEX |
|---|------|------|-----------|-----------|
| 1 | **ネオンパープル** | プライマリ — CTA、選択、プログレスバー | `#a855f7` | `#9333ea` |
| 2 | **エレクトリックシアン** | セカンダリ — 再生中、リンク、波形 | `#22d3ee` | `#0891b2` |
| 3 | **ネオンピンク** | ターシャリ — いいね、通知、バッジ差し色 | `#ec4899` | `#db2777` |
| 4 | **エレクトリックライム** | クォータナリ — NEW バッジ、成功、アップロード | `#84cc16` | `#65a30d` |

> ライトテーマではアクセントを **1段階濃く** して白背景上のコントラストを確保

---

## ━━ 🌙 ダークテーマ ━━

### D1. サーフェス

| トークン | HEX | 用途 |
|---------|-----|------|
| `surface-base` | `#050505` | ページ最背面 |
| `surface-0` | `#0a0a0a` | メイン背景 |
| `surface-1` | `#121212` | カード、サイドバー |
| `surface-2` | `#1a1a1a` | ヘッダー、フッター、入力 |
| `surface-3` | `#242424` | ホバー、ドロップダウン |
| `surface-4` | `#2a2a2a` | アクティブ、選択中 |
| `surface-5` | `#333333` | スライダートラック |

### D2. テキスト

| トークン | HEX | コントラスト比 (vs `surface-0`) | 用途 |
|---------|-----|------|------|
| `text-primary` | `#ffffff` | 21:1 | 見出し、曲名 |
| `text-secondary` | `#b3b3b3` | 10.5:1 | アーティスト名 |
| `text-tertiary` | `#727272` | 4.8:1 | メタ情報 |
| `text-disabled` | `#535353` | 3.2:1 | 無効状態 |

### D3. アクセント

| トークン | HEX | hover | active |
|---------|-----|-------|--------|
| `purple` | `#a855f7` | `#9333ea` | `#7e22ce` |
| `cyan` | `#22d3ee` | `#06b6d4` | `#0891b2` |
| `pink` | `#ec4899` | `#db2777` | `#be185d` |
| `lime` | `#84cc16` | `#65a30d` | `#4d7c0f` |

### D4. ボーダー

| トークン | 値 | 用途 |
|---------|-----|------|
| `border-subtle` | `white/3` | カード境界 |
| `border-default` | `white/5` | 通常ボーダー |
| `border-strong` | `white/10` | ディバイダー |
| `border-hover` | `white/15` | ホバー時 |
| `border-focus` | `#a855f7` | フォーカスリング |

### D6. オーバーレイ

| トークン | 値 | 用途 |
|---------|-----|------|
| `overlay-light` | `rgba(0,0,0,0.4)` | アートワーク上の再生ボタン背景 |
| `overlay-medium` | `rgba(0,0,0,0.6)` | モーダル背景 |
| `overlay-heavy` | `rgba(0,0,0,0.8)` | フルスクリーンオーバーレイ |

### D7. ステート（インタラクション）

| トークン | 値 | 用途 |
|---------|-----|------|
| `state-hover` | `white/5` | ホバー時の背景オーバーレイ |
| `state-pressed` | `white/8` | プレス時の背景オーバーレイ |
| `state-selected` | `purple/10` | 選択中の背景 |
| `state-disabled-bg` | `white/3` | 無効状態の背景 |
| `state-disabled-fg` | `#535353` | 無効状態のテキスト/アイコン |

### D5. グロー効果

```css
--glow-purple: 0 0 20px rgba(168, 85, 247, 0.3);
--glow-cyan: 0 0 20px rgba(34, 211, 238, 0.3);
--glow-pink: 0 0 20px rgba(236, 72, 153, 0.3);
--glow-lime: 0 0 20px rgba(132, 204, 22, 0.3);
```

---

## ━━ ☀️ ライトテーマ ━━

### L1. サーフェス

| トークン | HEX | 用途 |
|---------|-----|------|
| `surface-base` | `#f8f8f8` | ページ最背面 |
| `surface-0` | `#ffffff` | メイン背景 |
| `surface-1` | `#f5f5f5` | カード、サイドバー |
| `surface-2` | `#eeeeee` | ヘッダー、フッター、入力 |
| `surface-3` | `#e5e5e5` | ホバー、ドロップダウン |
| `surface-4` | `#d4d4d4` | アクティブ、選択中 |
| `surface-5` | `#c0c0c0` | スライダートラック |

### L2. テキスト

| トークン | HEX | コントラスト比 (vs `surface-0`) | 用途 |
|---------|-----|------|------|
| `text-primary` | `#0a0a0a` | 21:1 | 見出し、曲名 |
| `text-secondary` | `#525252` | 7.5:1 | アーティスト名 |
| `text-tertiary` | `#737373` | 4.7:1 | メタ情報 |
| `text-disabled` | `#a3a3a3` | 2.6:1 | 無効状態 |

### L3. アクセント（1段階濃い）

| トークン | HEX | hover | active |
|---------|-----|-------|--------|
| `purple` | `#9333ea` | `#7e22ce` | `#6b21a8` |
| `cyan` | `#0891b2` | `#0e7490` | `#155e75` |
| `pink` | `#db2777` | `#be185d` | `#9d174d` |
| `lime` | `#65a30d` | `#4d7c0f` | `#3f6212` |

### L4. ボーダー

| トークン | 値 | 用途 |
|---------|-----|------|
| `border-subtle` | `black/3` | カード境界 |
| `border-default` | `black/8` | 通常ボーダー |
| `border-strong` | `black/12` | ディバイダー |
| `border-hover` | `black/18` | ホバー時 |
| `border-focus` | `#7c3aed` | フォーカスリング（濃い紫で白背景上の視認性確保） |

### L6. オーバーレイ

| トークン | 値 | 用途 |
|---------|-----|------|
| `overlay-light` | `rgba(0,0,0,0.3)` | アートワーク上の再生ボタン背景 |
| `overlay-medium` | `rgba(0,0,0,0.5)` | モーダル背景 |
| `overlay-heavy` | `rgba(0,0,0,0.7)` | フルスクリーンオーバーレイ |

### L7. ステート（インタラクション）

| トークン | 値 | 用途 |
|---------|-----|------|
| `state-hover` | `black/4` | ホバー時の背景オーバーレイ |
| `state-pressed` | `black/8` | プレス時の背景オーバーレイ |
| `state-selected` | `purple/8` | 選択中の背景 |
| `state-disabled-bg` | `black/3` | 無効状態の背景 |
| `state-disabled-fg` | `#a3a3a3` | 無効状態のテキスト/アイコン |

### L5. シャドウ（ライトテーマは影が主役）

```css
--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-card-hover: 0 10px 25px rgba(0, 0, 0, 0.08);
--shadow-dropdown: 0 10px 40px rgba(0, 0, 0, 0.1);
```

---

## ━━ 共通 ━━

### アイコンカラー

| トークン | ダーク | ライト | 用途 |
|---------|-------|-------|------|
| `icon-primary` | `#ffffff` | `#0a0a0a` | メインアイコン（ナビ、プレイヤーコントロール） |
| `icon-secondary` | `#b3b3b3` | `#525252` | 補助アイコン（メタ情報、サブアクション） |
| `icon-tertiary` | `#727272` | `#737373` | 低優先度アイコン（ヒント、装飾） |
| `icon-disabled` | `#535353` | `#a3a3a3` | 無効状態 |
| `icon-on-accent` | `#ffffff` | `#ffffff` | アクセント背景上のアイコン（再生ボタン等） |
| `icon-interactive` | `#a855f7` / `#22d3ee` | `#9333ea` / `#0891b2` | いいね済み、再生中などアクセント色アイコン |

> アイコンカラーはテキストカラーと同じトークンを共有する設計（`currentColor` 準拠）。  
> 独立して色を変えたい場合のみ `icon-*` トークンを明示的に使う。

### セマンティック（両テーマ共通）

| トークン | ダーク HEX | ライト HEX | 用途 |
|---------|-----------|-----------|------|
| `success` | `#22c55e` | `#16a34a` | 成功 |
| `error` | `#ef4444` | `#dc2626` | エラー |
| `warning` | `#f59e0b` | `#d97706` | 警告 |
| `info` | `#3b82f6` | `#2563eb` | 情報 |

### ジャンル別カラー（両テーマ共通）

| ジャンル | HEX | グラデーション |
|---------|-----|-------------|
| Future Bass | `#a855f7` | `#a855f7 → #c084fc` |
| House | `#22d3ee` | `#22d3ee → #67e8f9` |
| Dubstep | `#ef4444` | `#ef4444 → #f87171` |
| Drum & Bass | `#f59e0b` | `#f59e0b → #fbbf24` |
| Trance | `#3b82f6` | `#3b82f6 → #60a5fa` |
| Mid-Tempo | `#ec4899` | `#ec4899 → #f472b6` |
| Trap | `#84cc16` | `#84cc16 → #a3e635` |
| Hardstyle | `#f97316` | `#f97316 → #fb923c` |

> ジャンルカラーはテーマ非依存。ダーク/ライトどちらでも同じ色を使い、背景との組み合わせで `bg-{color}/10` (soft) or `bg-{color}` (solid) を切り替える。

### グラデーション

| 名前 | ダーク | ライト |
|------|-------|-------|
| ヒーロー | `purple/25% → cyan/8% → surface-0` | `purple/8% → cyan/4% → surface-0` |
| カードグロー | `radial: purple/12% → transparent` | 使わない（影で代替） |
| プレイヤーバー | `surface-2/95% + blur(16px)` | `surface-0/90% + blur(16px)` |

---

## CSS カスタムプロパティ（実装用）

```css
/* ===== globals.css ===== */

/* --- Dark Theme (default) --- */
:root {
  --surface-base: #050505;
  --surface-0: #0a0a0a;
  --surface-1: #121212;
  --surface-2: #1a1a1a;
  --surface-3: #242424;
  --surface-4: #2a2a2a;
  --surface-5: #333333;

  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --text-tertiary: #727272;
  --text-disabled: #535353;

  --icon-primary: #ffffff;
  --icon-secondary: #b3b3b3;
  --icon-tertiary: #727272;
  --icon-disabled: #535353;
  --icon-on-accent: #ffffff;

  --accent-purple: #a855f7;
  --accent-purple-hover: #9333ea;
  --accent-cyan: #22d3ee;
  --accent-cyan-hover: #06b6d4;
  --accent-pink: #ec4899;
  --accent-pink-hover: #db2777;
  --accent-lime: #84cc16;
  --accent-lime-hover: #65a30d;

  --border-subtle: rgba(255, 255, 255, 0.03);
  --border-default: rgba(255, 255, 255, 0.05);
  --border-strong: rgba(255, 255, 255, 0.10);
  --border-focus: #a855f7;

  --overlay-light: rgba(0, 0, 0, 0.4);
  --overlay-medium: rgba(0, 0, 0, 0.6);
  --overlay-heavy: rgba(0, 0, 0, 0.8);

  --state-hover: rgba(255, 255, 255, 0.05);
  --state-pressed: rgba(255, 255, 255, 0.08);
  --state-selected: rgba(168, 85, 247, 0.10);

  --shadow-card: none;
  --shadow-card-hover: 0 8px 32px rgba(0, 0, 0, 0.3);

  --glow-purple: 0 0 20px rgba(168, 85, 247, 0.3);
  --glow-cyan: 0 0 20px rgba(34, 211, 238, 0.3);
  --glow-pink: 0 0 20px rgba(236, 72, 153, 0.3);
  --glow-lime: 0 0 20px rgba(132, 204, 22, 0.3);
}

/* --- Light Theme --- */
[data-theme="light"] {
  --surface-base: #f8f8f8;
  --surface-0: #ffffff;
  --surface-1: #f5f5f5;
  --surface-2: #eeeeee;
  --surface-3: #e5e5e5;
  --surface-4: #d4d4d4;
  --surface-5: #c0c0c0;

  --text-primary: #0a0a0a;
  --text-secondary: #525252;
  --text-tertiary: #737373;
  --text-disabled: #a3a3a3;

  --icon-primary: #0a0a0a;
  --icon-secondary: #525252;
  --icon-tertiary: #737373;
  --icon-disabled: #a3a3a3;
  --icon-on-accent: #ffffff;

  --accent-purple: #9333ea;
  --accent-purple-hover: #7e22ce;
  --accent-cyan: #0891b2;
  --accent-cyan-hover: #0e7490;
  --accent-pink: #db2777;
  --accent-pink-hover: #be185d;
  --accent-lime: #65a30d;
  --accent-lime-hover: #4d7c0f;

  --border-subtle: rgba(0, 0, 0, 0.03);
  --border-default: rgba(0, 0, 0, 0.08);
  --border-strong: rgba(0, 0, 0, 0.12);
  --border-focus: #7c3aed;

  --overlay-light: rgba(0, 0, 0, 0.3);
  --overlay-medium: rgba(0, 0, 0, 0.5);
  --overlay-heavy: rgba(0, 0, 0, 0.7);

  --state-hover: rgba(0, 0, 0, 0.04);
  --state-pressed: rgba(0, 0, 0, 0.08);
  --state-selected: rgba(147, 51, 234, 0.08);

  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-card-hover: 0 10px 25px rgba(0, 0, 0, 0.08);

  --glow-purple: none;
  --glow-cyan: none;
  --glow-pink: none;
  --glow-lime: none;
}
```

---

## Tailwind CSS 設定（実装用）

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        surface: {
          base: 'var(--surface-base)',
          0: 'var(--surface-0)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          4: 'var(--surface-4)',
          5: 'var(--surface-5)',
        },
        'text-theme': {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          disabled: 'var(--text-disabled)',
        },
        accent: {
          purple: { DEFAULT: 'var(--accent-purple)', hover: 'var(--accent-purple-hover)' },
          cyan: { DEFAULT: 'var(--accent-cyan)', hover: 'var(--accent-cyan-hover)' },
          pink: { DEFAULT: 'var(--accent-pink)', hover: 'var(--accent-pink-hover)' },
          lime: { DEFAULT: 'var(--accent-lime)', hover: 'var(--accent-lime-hover)' },
        },
      },
      borderColor: {
        subtle: 'var(--border-subtle)',
        default: 'var(--border-default)',
        strong: 'var(--border-strong)',
        focus: 'var(--border-focus)',
      },
      backgroundColor: {
        overlay: {
          light: 'var(--overlay-light)',
          medium: 'var(--overlay-medium)',
          heavy: 'var(--overlay-heavy)',
        },
        state: {
          hover: 'var(--state-hover)',
          pressed: 'var(--state-pressed)',
          selected: 'var(--state-selected)',
        },
      },
      outlineColor: {
        focus: 'var(--border-focus)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'glow-purple': 'var(--glow-purple)',
        'glow-cyan': 'var(--glow-cyan)',
        'glow-pink': 'var(--glow-pink)',
        'glow-lime': 'var(--glow-lime)',
      },
    },
  },
}
```

---

## テーマ切り替え実装

```tsx
// 使い方: <html data-theme="dark"> or <html data-theme="light">
function toggleTheme() {
  const html = document.documentElement;
  const next = html.dataset.theme === 'light' ? 'dark' : 'light';
  html.dataset.theme = next;
  localStorage.setItem('theme', next);
}
```

---

## カラー使用ルール

| ルール | 詳細 |
|--------|------|
| 純黒 `#000000` / 純白 `#ffffff` を背景に使わない | ダーク最暗 `#050505`、ライト最明 `#f8f8f8` |
| アクセントカラーは画面面積の **5%以下** | 広い面積に使うとチカチカする |
| ライトテーマではグロー効果を使わない | 影（shadow）で奥行きを表現 |
| ダークテーマでは影よりボーダーで区切る | 暗い背景では影が見えにくい |
| ジャンルバッジはテーマ非依存 | 同じ色、背景の透明度だけ切り替え |
| テキストカラーは必ず CSS 変数経由 | ハードコードしない |
| 4色アクセントの使い分けを守る | purple=CTA, cyan=再生, pink=いいね, lime=NEW |

---

## ビジュアルサマリー

```
🌙 ダークテーマ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
サーフェス   #050505 ▓▓ → #0a0a0a ▓▓▓ → #121212 ▓▓▓▓ → #333333 ▓▓▓▓▓▓
テキスト     #ffffff ████████ → #b3b3b3 ██████ → #727272 ████ → #535353 ██
アクセント   🟣 #a855f7  🔵 #22d3ee  🩷 #ec4899  🟢 #84cc16

☀️ ライトテーマ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
サーフェス   #f8f8f8 ░░ → #ffffff ░░░ → #f5f5f5 ░░░░ → #c0c0c0 ░░░░░░
テキスト     #0a0a0a ████████ → #525252 ██████ → #737373 ████ → #a3a3a3 ██
アクセント   🟣 #9333ea  🔵 #0891b2  🩷 #db2777  🟢 #65a30d
```
