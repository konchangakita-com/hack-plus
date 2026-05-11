export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Pulse-techは、AI技術とエンジニアリングに関する情報を発信するメディアです。
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">ミッション</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          最新のAI技術とエンジニアリングのトレンドを、実践的な視点で解説し、
          エンジニアの生産性向上とイノベーションの促進に貢献します。
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">コンテンツ</h2>
        <ul className="text-gray-600 leading-relaxed space-y-2">
          <li>Claude Skills、Prompt Engineering などの実践的なガイド</li>
          <li>AI技術の最新トレンドと活用事例</li>
          <li>エンジニアリングのベストプラクティス</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">お問い合わせ</h2>
        <p className="text-gray-600 leading-relaxed">
          ご質問やご提案がございましたら、お気軽にお問い合わせください。
        </p>
      </div>
    </div>
  );
}
