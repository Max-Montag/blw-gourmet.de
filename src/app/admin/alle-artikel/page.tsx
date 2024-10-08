"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminArticlePreview } from "@/types/articleTypes";
import Confirmodal from "@/components/common/ConfirmModal";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import ErrorMessage from "@/components/error/ErrorMessage";
import EditArticleList from "@/components/article/EditArticleList";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { getCSRFToken } from "@/utils/cookieUtils";

const ArticleOverview: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [articles, setArticles] = useState<AdminArticlePreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();
  const { showNotification } = useNotification();

  const [showDeleteArticleModal, setShowDeleteArticleModal] =
    useState<boolean>(false);

  const [selectedArticleUrl, setSelectedArticleUrl] = useState<string | null>(
    null,
  );

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/articles/all-articles/`, {
          method: "GET",
          credentials: "include",
        }).then((res) => res.json());

        setArticles(response);
        setLoading(false);
      } catch (err) {
        setError("Fehler beim Laden der Daten.");
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchData();
    }
  }, [apiUrl, isAdmin]);

  const handleAddArticle = async () => {
    try {
      const csrf_token = await getCSRFToken();

      const response = await fetch(`${apiUrl}/articles/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf_token,
        },
        credentials: "include",
        body: JSON.stringify({}),
      });

      if (response.status === 201) {
        const data = await response.json();
        router.push(
          `/admin/alle-artikel/artikel-bearbeiten/${data.article_url}`,
        );
      }
    } catch (error) {
      showNotification("Fehler beim Anlegen!", "error");
    }
  };

  const handleDeleteArticle = async () => {
    if (selectedArticleUrl) {
      try {
        const csrf_token = await getCSRFToken();

        await fetch(
          `${apiUrl}/articles/article/delete/${selectedArticleUrl}/`,
          {
            method: "DELETE",
            headers: {
              "X-CSRFToken": csrf_token,
            },
            credentials: "include",
          },
        );
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.url !== selectedArticleUrl),
        );
        setShowDeleteArticleModal(false);
        setSelectedArticleUrl(null);
      } catch (err) {
        setError("Fehler beim Löschen.");
        setShowDeleteArticleModal(false);
        setSelectedArticleUrl(null);
      }
    }
  };

  const openDeleteArticleModal = (articleUrl: string) => {
    setSelectedArticleUrl(articleUrl);
    setShowDeleteArticleModal(true);
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <LoadingAnimation />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <ErrorMessage message="Fehlende Berechtigung. Bitte meld dich an." />
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4 pl-2 md:pl-0">Artikel</h2>
      <EditArticleList
        articles={articles}
        apiUrl={apiUrl}
        handleAddArticle={handleAddArticle}
        openDeleteArticleModal={openDeleteArticleModal}
      />
      <Confirmodal
        show={showDeleteArticleModal}
        onClose={() => setShowDeleteArticleModal(false)}
        onConfirm={handleDeleteArticle}
        text="Bist du sicher, dass du diesen Artikel löschen möchtest?"
      />
    </div>
  );
};

export default ArticleOverview;
