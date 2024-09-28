"use client";

import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { AdminArticlePreview } from "@/types/articleTypes";
import { formatDate } from "@/utils/dateUtils";

interface EditArticleListProps {
  articles: AdminArticlePreview[];
  apiUrl?: string;
  handleAddArticle: () => void;
  openDeleteArticleModal: (articleUrl: string) => void;
}

const EditArticleList: React.FC<EditArticleListProps> = ({
  articles,
  apiUrl,
  handleAddArticle,
  openDeleteArticleModal,
}) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <li
        key={"add_article"}
        className="bg-zinc-100 hover:bg-zinc-200 shadow-md rounded-md p-4 cursor-pointer"
      >
        <div
          className="w-full h-full flex flex-col items-center justify-center"
          onClick={handleAddArticle}
        >
          <FaPlus className="w-32 h-32 text-gray-400 my-8" />
        </div>
      </li>
      {articles &&
        articles.length > 0 &&
        articles.map((article) => (
          <li
            key={article.url}
            className="bg-white shadow-md hover:shadow-xl rounded-md relative"
          >
            <Link href={`/admin/artikel-bearbeiten/${article.url}`}>
              {article.thumbnail ? (
                <Image
                  src={`${apiUrl}${article.thumbnail}`}
                  alt={article.title || "Article Image"}
                  width={288}
                  height={192}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="flex justify-center items-center w-full h-40 bg-zinc-300">
                  <span className="text-xs text-zinc-600">
                    Bild nicht gefunden
                  </span>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{article.title}</h2>
                <div className="gap-2 mt-2">
                  {article.creation_time && (
                    <p className="text-sm text-gray-500">
                      Erstellt: {formatDate(article.creation_time)}
                    </p>
                  )}
                  {article.last_changed && (
                    <p className="text-sm text-gray-500">
                      Bearbeitet: {formatDate(article.last_changed)}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    Ersteller: {article.owner === 1 ? "Admin" : "User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Veröffentlicht: {article.published ? "Ja" : "Nein"}
                  </p>
                </div>
              </div>
            </Link>
            <MdDeleteOutline
              className="absolute top-2 right-2 text-red-500 cursor-pointer"
              size={24}
              onClick={() => openDeleteArticleModal(article.url)}
            />
          </li>
        ))}
    </ul>
  );
};

export default EditArticleList;
