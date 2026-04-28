# Hack Plus

**Tech Insights & More**

開発者が次のレベルに進むための技術メディア。ハッカソン的な「作って学ぶ」精神で、AI技術とエンジニアリングに関する実践的な情報を発信します。

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown (gray-matter)
- **Hosting**: Vercel
- **Container**: Docker Compose

## Getting Started

### 開発環境の起動（推奨）

```bash
# Docker Composeで起動
docker compose up

# ブラウザで開く
open http://localhost:3000
```

Docker Composeを使うことで、MacでもWindowsでも同じ開発環境が使えます。

### ローカル開発（Docker不使用）

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 記事の追加

1. `content/articles/` に Markdown ファイルを作成
2. Frontmatter を記述

```markdown
---
title: "記事のタイトル"
date: "2026-05-04"
excerpt: "記事の要約（100文字程度）"
author: "Hack Plus"
---

記事の本文...
```

3. ファイル名がスラッグになります（例: `claude-skills-top10.md` → `/articles/claude-skills-top10`）

## Project Structure

```
hack-plus/
├── app/
│   ├── layout.tsx           # 共通レイアウト
│   ├── page.tsx             # トップページ（記事一覧）
│   ├── globals.css          # グローバルCSS
│   ├── articles/
│   │   └── [slug]/
│   │       └── page.tsx     # 記事詳細ページ
│   └── about/
│       └── page.tsx         # Aboutページ
├── content/
│   └── articles/
│       └── *.md             # Markdown記事
├── components/
│   ├── ArticleCard.tsx      # 記事カードコンポーネント
│   ├── Header.tsx           # ヘッダー
│   └── Footer.tsx           # フッター
├── lib/
│   └── markdown.ts          # Markdown処理ユーティリティ
├── public/
│   └── images/              # 画像ファイル
├── docker-compose.yml       # Docker Compose設定
├── Dockerfile.dev           # 開発用Dockerfile
├── Dockerfile               # 本番用Dockerfile
└── package.json
```

## Deployment

### Vercel へのデプロイ

**ドメイン構成:**
- Phase 1 (2026-05-04 〜): `hack-plus.konchangakita.com` (メイン)
- Phase 2 (2026-10 〜): `hack-plus.com` (独立ドメイン移行)

1. GitHub リポジトリに push
2. Vercel でプロジェクトをインポート
3. ドメインを追加: `hack-plus.konchangakita.com`
4. 自動デプロイが実行されます

### 環境変数

```bash
NEXT_PUBLIC_SITE_URL=https://hack-plus.konchangakita.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics 4
```

## Commands

```bash
# 開発サーバー（Docker）
docker compose up

# 開発サーバー（ローカル）
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm run start

# Lint
npm run lint
```

## Brand

- **Name**: Hack Plus
- **Tagline**: Tech Insights & More
- **Color**: #00FF88 (Bright Green), #1A1A1A (Dark), #00D4FF (Cyan Accent)
- **Concept**: ハッカソン的な「作って学ぶ」精神 + 技術情報にプラスアルファの価値

## License

Private
