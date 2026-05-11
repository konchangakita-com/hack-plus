# GitHub ハイブリッド認証運用（gh + PAT）

## 方針
- **通常**: gh auth を使用（現在の設定を維持）
- **必要時のみ**: PAT を一時的に使用

## セットアップ

### 1. 両アカウントのPAT作成（保管用）

**konchangakita アカウント:**
```
https://github.com/settings/tokens/new
Note: konchangakita-com organization access
Scopes: repo, read:org, workflow
Organization access: konchangakita-com を有効化
→ トークン: ghp_xxxxxxxxxxxx
```

**konchangakita-devrev アカウント:**
```
同様に作成
→ トークン: ghp_yyyyyyyyyyyy
```

### 2. トークンの安全な保管

**~/.github-tokens に保存（Git管理外）:**
```bash
# ファイル作成
cat > ~/.github-tokens <<'EOF'
# konchangakita account (for konchangakita-com organization)
export GITHUB_TOKEN_PERSONAL="ghp_xxxxxxxxxxxx"

# konchangakita-devrev account (for DevRev work)
export GITHUB_TOKEN_DEVREV="ghp_yyyyyyyyyyyy"
EOF

# 権限を自分だけに制限
chmod 600 ~/.github-tokens
```

### 3. ~/.zshrc は現状維持

```bash
# GITHUB_TOKEN は unset のまま
unset GITHUB_TOKEN

# デフォルトアカウント設定（オプション）
# gh auth switch -u konchangakita
```

## 使い方

### 通常の操作（gh auth を使用）

```bash
# konchangakita-com プロジェクトで作業
cd /Users/skon/DevRev/develop/claude/konchangakita-com/hack-plus
gh auth switch -u konchangakita  # 一度だけ実行すればデフォルトになる
git push  # gh auth のトークンが使われる
gh repo list konchangakita-com  # 動作する

# devrev プロジェクトで作業
cd /Users/skon/DevRev/develop/claude/devrev-project
gh auth switch -u konchangakita-devrev
git push  # gh auth のトークンが使われる
```

### PAT が必要な場面（一時的に使用）

```bash
# トークンを読み込み
source ~/.github-tokens

# 例1: CI/CDスクリプト実行
GITHUB_TOKEN=$GITHUB_TOKEN_PERSONAL gh api repos/konchangakita-com/hack-plus/actions/runs

# 例2: 複数リポジトリの一括操作
GITHUB_TOKEN=$GITHUB_TOKEN_PERSONAL gh repo list konchangakita-com --limit 100

# 例3: git操作でPATを使う必要がある場合
GITHUB_TOKEN=$GITHUB_TOKEN_PERSONAL git push

# 例4: Claudeのスクリプトで使う場合
cd /Users/skon/DevRev/develop/claude/konchangakita-com/hack-plus
source ~/.github-tokens
export GITHUB_TOKEN=$GITHUB_TOKEN_PERSONAL
# ... 作業 ...
unset GITHUB_TOKEN  # 作業後にクリア
```

### エイリアスで簡単切り替え（オプション）

**~/.zshrc に追加:**

```bash
# GitHub トークン読み込み
alias gh-tokens='source ~/.github-tokens'

# konchangakita-com 用に一時的に切り替え
alias gh-personal='source ~/.github-tokens && export GITHUB_TOKEN=$GITHUB_TOKEN_PERSONAL && echo "✓ Using konchangakita account"'

# konchangakita-devrev 用に一時的に切り替え
alias gh-devrev='source ~/.github-tokens && export GITHUB_TOKEN=$GITHUB_TOKEN_DEVREV && echo "✓ Using konchangakita-devrev account"'

# トークンをクリア（gh auth に戻す）
alias gh-clear='unset GITHUB_TOKEN && echo "✓ Using gh auth"'

# 現在の設定確認
alias gh-status='echo "GITHUB_TOKEN: ${GITHUB_TOKEN:+set}${GITHUB_TOKEN:-unset}" && gh auth status'
```

**使用例:**

```bash
# 通常は gh auth
cd /Users/skon/DevRev/develop/claude/konchangakita-com/hack-plus
git push  # gh auth が使われる

# PAT が必要な操作の前だけ
gh-personal  # konchangakita アカウントのPATに切り替え
# ... PAT必要な操作 ...
gh-clear  # gh auth に戻す

# DevRev作業
gh-devrev  # konchangakita-devrev アカウントのPATに切り替え
# ... 作業 ...
gh-clear
```

## メリット

1. **通常は gh auth**: セキュア、トークン漏洩リスク低
2. **必要時のみ PAT**: スクリプトやCI/CDで使える
3. **追加ツール不要**: direnv等不要
4. **柔軟**: 状況に応じて使い分け

## セキュリティ

- ~/.github-tokens は chmod 600 で保護
- GITHUB_TOKEN は環境変数なのでシェル終了時に消える
- ~/.zshrc にトークンを書かない
- 作業後は `unset GITHUB_TOKEN` でクリア

## トラブルシューティング

```bash
# 現在どちらが使われているか確認
gh-status

# gh auth に戻す
gh-clear

# アカウント切り替え
gh auth switch -u konchangakita
gh auth switch -u konchangakita-devrev

# トークンが正しいか確認
source ~/.github-tokens
echo $GITHUB_TOKEN_PERSONAL | cut -c1-10  # 最初の10文字のみ表示
```

---

**作成日**: 2026-05-11
**ステータス**: 推奨案
