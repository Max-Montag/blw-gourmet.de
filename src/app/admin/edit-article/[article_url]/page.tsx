import React from "react";
import EditArticleDisplay from "@/components/article/EditArticleDisplay";

interface PageProps {
  params: {
    article_url: string;
  };
}

const EditArticlePage: React.FC<PageProps> = ({ params }) => {
  const { article_url } = params;

  return (
    <div>
      <EditArticleDisplay articleUrl={article_url} />
    </div>
  );
};

export default EditArticlePage;
