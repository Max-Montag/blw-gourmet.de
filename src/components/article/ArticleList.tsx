import React from "react";
import Link from "next/link";
import { ArticlePreviewData } from "@/types/articleTypes";
import Image from "next/image";

interface ArticleListProps {
  articles: ArticlePreviewData[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-5xl lg:max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Link key={article.url} href={`/artikel/${article.url}`}>
            <div className="h-full bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-50 cursor-pointer group">
              <div className="relative overflow-hidden">
                {article.thumbnail ? (
                  <Image
                    src={`${apiUrl}${article.thumbnail}`}
                    alt={article.title}
                    width={288}
                    height={192}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-50"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-48 bg-zinc-300">
                    <span className="text-xs text-zinc-600">
                      Bild nicht gefunden
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-50"></div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-cyan-900 group-hover:text-cyan-700 transition-colors duration-50">
                  {article.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
