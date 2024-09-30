import React from "react";
import NoArticlesAvailable from "@/components/error/NoArticlesAvailable";
import ArticlesList from "@/components/article/ArticleList";
import { getAllArticlesData } from "@/utils/apiUtils";

export default async function ArticlesPage() {
  const articles = await getAllArticlesData();

  if (!articles || articles.length === 0) {
    return <NoArticlesAvailable />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ArticlesList articles={articles} />
    </div>
  );
}
