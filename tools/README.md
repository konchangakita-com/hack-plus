# Tools

This directory contains automation and integration tools for hack-plus operations.

## Structure

```
tools/
├── scraper/    # 情報収集・スクレイピング基盤
├── social/     # SNS連携（Twitter/X, LinkedIn等）
└── analytics/  # データ分析・レポート生成
```

## Future Development

各ツールディレクトリは今後の機能拡張に備えて準備されています：

### scraper/
- Exa APIを使った最新AI情報の収集
- 記事ソースのファクトチェック
- 定期実行スケジューラー

### social/
- 記事公開時の自動投稿
- SNSエンゲージメント分析
- マルチチャネル配信管理

### analytics/
- アクセス解析データの集約
- コンテンツパフォーマンスレポート
- 読者インサイトの可視化

## Development

各ツールは独立して開発・デプロイ可能です。
詳細は各ディレクトリのREADMEを参照してください。
