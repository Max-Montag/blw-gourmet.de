import React from "react";
import { TbArticleOff } from "react-icons/tb";

const ArticleNotAvailable: React.FC = () => {
  return (
    <div className="text-lg md:text-2xl lg:text-4xl text-cyan-800 flex flex-col items-center text-center p-8">
      <TbArticleOff className="w-24 md:w-44 h-24 md:h-44 mb-4" />
      <p>Leider steht dieser Artikel nicht zur Verfügung.</p>
    </div>
  );
};

export default ArticleNotAvailable;
