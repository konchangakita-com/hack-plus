# GitHub 複数アカウント運用方法

## 要件
- **konchangakita**: konchangakita-com organization用（hack-plus, hq等）
- **konchangakita-devrev**: DevRev業務用

## 解決策の比較

### 案1: direnv による自動切り替え（推奨）

プロジェクトディレクトリに入ると自動的にGITHUB_TOKENが切り替わる。

**セットアップ:**

```bash
# 1. direnv インストール
brew install direnv

# 2. ~/.zshrc に追加
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc

# 3. konchangakita-com プロジェクト用トークン設定
cd /Users/skon/DevRev/develop/claude/konchangakita-com
echo 'export GITHUB_TOKEN="ghp_konchangakita_token"' > .envrc
direnv allow

# 4. devrev プロジェクト用トークン設定
cd /Users/skon/DevRev/develop/claude/devrev-project
echo 'export GITHUB_TOKEN="ghp_konchangakita-devrev_token"' > .envrc
direnv allow
```

**メリット:**
- ディレクトリに入るだけで自動切り替え
- .envrc は .gitignore に追加すればトークンが漏れない
- プロジェクトごとに独立した環境

**デメリット:**
- direnv のインストールが必要
- .envrc の管理が必要

---

### 案2: プロジェクト起動エイリアス

プロジェクトごとに起動コマンドを用意。

**~/.zshrc に追加:**

```bash
# konchangakita-com プロジェクト起動
alias cd-hackplus='cd /Users/skon/DevRev/develop/claude/konchangakita-com/hack-plus && export GITHUB_TOKEN="ghp_konchangakita_token" && gh auth switch -u konchangakita'
alias cd-hq='cd /Users/skon/DevRev/develop/claude/konchangakita-com/hq && export GITHUB_TOKEN="ghp_konchangakita_token" && gh auth switch -u konchangakita'

# konchangakita-devrev プロジェクト起動
alias cd-devrev='cd /Users/skon/DevRev/develop/claude/devrev-project && export GITHUB_TOKEN="ghp_konchangakita-devrev_token" && gh auth switch -u konchangakita-devrev'

# 現在のGitHub設定確認
alias gh-status='echo "GITHUB_TOKEN: ${GITHUB_TOKEN:0:10}..." && gh auth status'
```

**メリット:**
- 追加ツール不要
- 明示的な切り替えで分かりやすい

**デメリット:**
- cdコマンドで移動すると切り替わらない
- エイリアス経由でないと切り替わらない

---

### 案3: git credential helper による切り替え

git操作時にアカウントを自動判定。

**セットアップ:**

```bash
# 1. konchangakita-com organization 用の設定
cd /Users/skon/DevRev/develop/claude/konchangakita-com/hack-plus
git config user.name "konchangakita"
git config user.email "your-email@example.com"
git config credential.https://github.com.username "konchangakita"

# 2. devrev プロジェクト用の設定
cd /Users/skon/DevRev/develop/claude/devrev-project
git config user.name "konchangakita-devrev"
git config user.email "satoru.kondou@devrev.ai"
git config credential.https://github.com.username "konchangakita-devrev"

# 3. macOS Keychain に両方のトークンを保存
# git push 時に macOS がトークンを自動選択
```

**メリット:**
- git操作時のみ自動切り替え
- macOS Keychain でセキュア管理

**デメリット:**
- gh CLI では切り替わらない
- GITHUB_TOKEN環境変数は使われない

---

## 推奨構成: 案1（direnv） + PAT

### Step 1: 両アカウントのPAT作成

**konchangakita アカウント:**
1. https://github.com/settings/tokens/new
2. Note: "konchangakita-com organization"
3. Scopes: `repo`, `read:org`, `workflow`
4. Organization access: konchangakita-com を有効化
5. トークン生成: `ghp_xxxxxxxxxxxx`

**konchangakita-devrev アカウント:**
1. アカウント切り替え
2. 同様にトークン生成
3. DevRev organization へのアクセス設定

### Step 2: direnv セットアップ

```bash
# インストール
brew install direnv

# ~/.zshrc に追加（unset GITHUB_TOKEN の行を削除）
eval "$(direnv hook zsh)"

# konchangakita-com プロジェクト
cd /Users/skon/DevRev/develop/claude/konchangakita-com
cat > .envrc <<'EOF'
export GITHUB_TOKEN="ghp_konchangakita_token"
gh auth switch -u konchangakita 2>/dev/null
EOF
direnv allow

# .gitignore に追加
echo ".envrc" >> /Users/skon/DevRev/develop/claude/konchangakita-com/.gitignore
```

### Step 3: 動作確認

```bash
# konchangakita-com プロジェクトに移動
cd /Users/skon/DevRev/develop/claude/konchangakita-com/hack-plus
echo $GITHUB_TOKEN  # konchangakita用トークンが表示される
gh repo list konchangakita-com  # 成功するはず

# devrev プロジェクトに移動
cd /Users/skon/DevRev/develop/claude/devrev-project
echo $GITHUB_TOKEN  # konchangakita-devrev用トークンが表示される
```

---

## 実装方針

1. **まず direnv をインストール**
2. **両アカウントのPATを作成**（organization access 付き）
3. **プロジェクトディレクトリごとに .envrc を配置**
4. **~/.zshrc から `unset GITHUB_TOKEN` を削除**（direnv が管理するため）

この方式なら、ディレクトリに入るだけで自動的に適切なアカウントに切り替わります。

---

**作成日**: 2026-05-11
**ステータス**: 提案中
