"use client";

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from "react";
import EditArticleDisplay from "@/components/article/EditArticleDisplay";
import axios from "axios";
import { FaSave } from "react-icons/fa";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import { ArticleData } from "@/types/articleTypes";
import ErrorMessage from "@/components/error/ErrorMessage";
import ArticleDisplay from "@/components/article/ArticleDisplay";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/common/ImageUpload";

interface PageProps {
  params: {
    article_url: string;
  };
}


const EditArticlePage: React.FC<PageProps> = ({ params }) => {
  const { article_url } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get<ArticleData>(
          `${apiUrl}/articles/article/${article_url}/`,
        );
        setArticleData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Fehler beim Laden des Artikels", error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [apiUrl, article_url]);

  const setImageUrl = (url: string) => {
    if (!articleData) {
      return;
    }
    setArticleData({ ...articleData, optimized_image: url });
  };

  const handleSave = async () => {
    try {
      const data = {
        title: articleData?.title || "",
        content: articleData?.content || [],
      };
      if (!articleData) {
        return;
      }
      await axios.put(
        `${apiUrl}/articles/article/update/${articleData.url}/`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      router.push("/admin/dashboard/");
    } catch (error) {
      console.error("Fehler beim Speichern des Artikels", error);
      alert(error);
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!articleData) {
    return <ErrorMessage message="Artikel nicht gefunden" />;
  }

  return (
    <div className="w-full flex flex-col lg:flex-row space-x-0 lg:space-x-4 p-1">
      <div className="w-full lg:w-1/2">
        <EditArticleDisplay
          articleData={articleData}
          onArticleChange={setArticleData}
        />
        <div className="flex justify-center space-x-4 my-4">
          <button onClick={handleSave}>
            <FaSave className="w-14 h-14 text-zinc-800 hover:text-zinc-500 cursor-pointer" />
          </button>
          <ImageUpload
            setImageUrl={setImageUrl}
            uploadUrl={`/articles/article/upload-image/${articleData.url}/`}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <ArticleDisplay article={articleData} />
      </div>
    </div>
  );
};

export default EditArticlePage;
