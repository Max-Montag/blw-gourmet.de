import React from "react";
import Link from "next/link";
import NoArticlesAvailable from "@/components/error/NoArticlesAvailable";
import { ArticlePreviewData } from "@/types/articleTypes";

export const revalidate = 3600;

async function getAllArticlesData(): Promise<ArticlePreviewData[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/all-articles/`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  return res.json();
}

export default async function ArticlesPage() {
  const articles = await getAllArticlesData();

  if (!articles || articles.length === 0) {
    return <NoArticlesAvailable />;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link key={article.url} href={`/artikel/${article.url}`}>
            <div className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
              <div className="relative">
                {article.thumbnail && (
                  <img
                    src={`${apiUrl}${article.thumbnail}`}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                )}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-cyan-700 transition-colors duration-200">
                  {article.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
