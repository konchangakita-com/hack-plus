import { getAllArticles } from "@/lib/markdown";
import ArticleCard from "@/components/ArticleCard";

export default function Home() {
  const articles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Tech Insights <span className="text-[#00FF88]">&</span> More
        </h1>
        <p className="text-gray-400">
          ハッカソン的な「作って学ぶ」精神で、開発者が次のレベルに進むための実践的な技術情報をお届けします
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">記事はまだありません</p>
        </div>
      ) : (
        <div className="space-y-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              title={article.title}
              date={article.date}
              excerpt={article.excerpt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
