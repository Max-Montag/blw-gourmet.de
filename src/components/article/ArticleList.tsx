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
      <div className="max-w-5xl lg:max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Link
            key={article.url}
            href={`/artikel/${article.url}`}
            className="flex flex-col h-full justify-start bg-white shadow-sm md:hover:shadow-md rounded-md group overflow-hidden cursor-pointer"
          >
            <div className="relative w-full h-[160px] overflow-hidden bg-cyan-50">
              {article.thumbnail ? (
                <Image
                  src={`${apiUrl}${article.thumbnail}`}
                  alt={article.title}
                  fill
                  sizes="360px"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-50"
                />
              ) : (
                <div className="flex justify-center items-center w-full h-auto bg-zinc-300">
                  <span className="text-xs text-zinc-600">
                    Bild nicht gefunden
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-50"></div>
            </div>
            <div className="p-4 text-start">
              <h2 className="text-lg xl:text-xl font-bold text-cyan-900 group-hover:text-cyan-700 my-2 min-h-[3.5rem] line-clamp-2">
                {article.title}
              </h2>
              <p className="text-gray-600 text-sm xl:text-base line-clamp-3">
                {article.preview || "Keine Vorschau verfügbar..."}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
