import React from "react";
import { notFound } from 'next/navigation';
import { ArticleData } from "@/types/articleTypes";
import ArticleDisplay from "@/components/article/ArticleDisplay";

interface ArticlePageProps {
  params: { url: string };
}

async function getArticleData(url: string): Promise<ArticleData | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${url}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/`);
  if (!res.ok) {
    return [];
  }
  const articles: ArticleData[] = await res.json();
  return articles.map((article) => ({
    url: article.url,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleData(params.url);

  if (!article) {
    notFound();
  }

  return <ArticleDisplay article={article} />;
}
