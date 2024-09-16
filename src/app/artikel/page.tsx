import React from "react";
import NoArticlesAvailable from "@/components/error/NoArticlesAvailable";
import { ArticlePreviewData } from "@/types/articleTypes";
import ArticlesList from "@/components/article/ArticleList";

async function getAllArticlesData(): Promise<ArticlePreviewData[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/all-articles/`,
    {
      cache: 'force-cache',
    },
  );
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

  return <ArticlesList articles={articles} />;
}
