import React from "react";
import EditArticleDisplay from "@/components/article/EditArticleDisplay";

interface PageProps {
  params: {
    article_url: string;
  };
}

const EditArticlePage: React.FC<PageProps> = ({ params }) => {
  const { article_url } = params;

  return <EditArticleDisplay articleUrl={article_url} />;
};

export default EditArticlePage;
