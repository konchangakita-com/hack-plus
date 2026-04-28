import Link from "next/link";

interface ArticleCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function ArticleCard({ slug, title, date, excerpt }: ArticleCardProps) {
  return (
    <article className="border border-gray-800 rounded-lg p-6 hover:border-[#00FF88] transition-colors">
      <Link href={`/articles/${slug}`} className="group">
        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00FF88] transition-colors">
          {title}
        </h2>
        <time className="text-sm text-gray-500 mb-3 block">{date}</time>
        <p className="text-gray-400 leading-relaxed">{excerpt}</p>
      </Link>
    </article>
  );
}
