import axios from "axios";
import React from "react";
import { notFound } from 'next/navigation';
import { ArticleData } from "@/types/articleTypes";
import ArticleDisplay from "@/components/article/ArticleDisplay";

interface ArticlePageProps {
  params: { url: string };
}

async function getArticleData(url: string): Promise<ArticleData> {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/article/${url}`,
  );
  return res.data;
}

export async function generateStaticParams() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles/`);
  const articles: ArticleData[] = res.data;
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