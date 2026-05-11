# GitHub認証問題の恒久対策案

## 現状の問題
- GITHUB_TOKEN環境変数が konchangakita-devrev アカウント用
- konchangakita-com organization へのアクセスには konchangakita アカウントが必要
- 環境変数 > gh auth の優先順位により、GITHUB_TOKENがあると gh auth が無視される

## 解決策の比較

### 案1: Organization用のClassic PAT（推奨）

**手順:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. konchangakita アカウントで新しいトークンを生成
3. スコープ: `repo`, `read:org`, `workflow`
4. Organization access で konchangakita-com を許可
5. ~/.zshrc に設定:
   ```bash
   export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"  # konchangakita account token
   ```

**メリット:**
- 環境変数で統一管理
- アカウント切り替え不要
- CI/CDや他のツールでも使える

**デメリット:**
- トークンの有効期限管理が必要
- 漏洩時の影響範囲が広い

---

### 案2: Fine-grained PAT（最もセキュア）

**手順:**
1. GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. konchangakita アカウントで生成
3. Repository access: Only select repositories → konchangakita-com/hack-plus, hq
4. Permissions: Contents (Read/Write), Metadata (Read)
5. ~/.zshrc に設定（同上）

**メリット:**
- 最小権限原則
- 特定リポジトリのみアクセス可能
- 漏洩時の影響が限定的

**デメリット:**
- 新しいリポジトリを追加する度に更新が必要
- 一部のツールが未対応の可能性

---

### 案3: gh auth のみ使用（現在の方針）

**手順:**
1. GITHUB_TOKEN を完全に削除（済み）
2. デフォルトアカウント設定:
   ```bash
   gh auth switch -u konchangakita
   ```

**メリット:**
- トークン管理を gh CLI に委譲
- セキュア（トークンがファイルに残らない）
- 有効期限の自動更新

**デメリット:**
- 複数アカウント運用時に切り替えが必要
- gh CLI 以外のツール（CI/CD等）で使えない

---

## 推奨案

**開発環境: 案1（Classic PAT）**
- konchangakita アカウントで organization 全体にアクセス可能なトークン
- 開発作業がスムーズ
- 定期的にトークン更新（90日推奨）

**CI/CD環境: 案2（Fine-grained PAT）**
- GitHub Actions の secrets に設定
- 最小権限で運用

## 次のアクション

Classic PAT を作成する場合:
1. https://github.com/settings/tokens/new
2. Note: "konchangakita-com organization access"
3. Expiration: 90 days
4. Scopes: `repo`, `read:org`, `workflow`
5. Configure SSO: konchangakita-com を有効化
6. ~/.zshrc に追記:
   ```bash
   export GITHUB_TOKEN="ghp_新しいトークン"
   ```
7. 新しいターミナルで動作確認:
   ```bash
   gh repo list konchangakita-com
   git push
   ```

---

**作成日**: 2026-05-11
**決定者**: CEO
**ステータス**: 提案中
