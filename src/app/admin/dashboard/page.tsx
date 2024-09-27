"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { AdminRecipePreview } from "@/types/recipeTypes";
import { AdminArticlePreview } from "@/types/articleTypes";
import Confirmodal from "@/components/common/ConfirmModal";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import ErrorMessage from "@/components/error/ErrorMessage";
import EditRecipeList from "@/components/recipe/EditRecipeList";
import EditArticleList from "@/components/article/EditArticleList";

const AdminDashboard: React.FC = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [recipes, setRecipes] = useState<AdminRecipePreview[]>([]);
  const [articles, setArticles] = useState<AdminArticlePreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showDeleteRecipeModal, setShowDeleteRecipeModal] =
    useState<boolean>(false);
  const [showDeleteArticleModal, setShowDeleteArticleModal] =
    useState<boolean>(false);
  const [selectedRecipeUrl, setSelectedRecipeUrl] = useState<string | null>(
    null,
  );
  const [selectedArticleUrl, setSelectedArticleUrl] = useState<string | null>(
    null,
  );

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesResponse, articlesResponse] = await Promise.all([
          fetch(`${apiUrl}/recipes/all-recipes/`).then((res) => res.json()),
          fetch(`${apiUrl}/articles/admin-all-articles/`).then((res) =>
            res.json(),
          ),
        ]);
        setRecipes(recipesResponse);
        setArticles(articlesResponse);
        setLoading(false);
      } catch (err) {
        setError("Fehler beim Laden der Daten.");
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handleAddRecipe = async () => {
    try {
      const response = await fetch(`${apiUrl}/recipes/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.status === 201) {
        const data = await response.json();
        router.push(`/admin/edit-recipe/${data.recipe_url}`);
      }
    } catch (error) {
      console.error("Fehler beim Anlegen!", error);
      alert("Fehler beim Anlegen!");
    }
  };

  const handleAddArticle = async () => {
    try {
      const response = await fetch(`${apiUrl}/articles/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.status === 201) {
        const data = await response.json();
        router.push(`/admin/edit-article/${data.article_url}`);
      }
    } catch (error) {
      console.error("Fehler beim Anlegen!", error);
      alert("Fehler beim Anlegen!");
    }
  };

  const handleDeleteRecipe = async () => {
    if (selectedRecipeUrl) {
      try {
        await fetch(`${apiUrl}/recipes/recipe/delete/${selectedRecipeUrl}/`, {
          method: "DELETE",
        });
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.url !== selectedRecipeUrl),
        );
        setShowDeleteRecipeModal(false);
        setSelectedRecipeUrl(null);
      } catch (err) {
        setError("Fehler beim Löschen.");
        setShowDeleteRecipeModal(false);
        setSelectedRecipeUrl(null);
      }
    }
  };

  const handleDeleteArticle = async () => {
    if (selectedArticleUrl) {
      try {
        await fetch(
          `${apiUrl}/articles/article/delete/${selectedArticleUrl}/`,
          {
            method: "DELETE",
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

  const openDeleteRecipeModal = (recipeUrl: string) => {
    setSelectedRecipeUrl(recipeUrl);
    setShowDeleteRecipeModal(true);
  };

  const openDeleteArticleModal = (articleUrl: string) => {
    setSelectedArticleUrl(articleUrl);
    setShowDeleteArticleModal(true);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd.MM.yyyy, HH:mm");
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4 pl-2 md:pl-0">Rezepte</h2>
      <EditRecipeList
        recipes={recipes}
        apiUrl={apiUrl}
        handleAddRecipe={handleAddRecipe}
        openDeleteRecipeModal={openDeleteRecipeModal}
        formatDate={formatDate}
      />
      <hr className="my-8" />
      <h2 className="text-2xl font-bold mb-4 pl-2 md:pl-0">Artikel</h2>
      <EditArticleList
        articles={articles}
        apiUrl={apiUrl}
        handleAddArticle={handleAddArticle}
        openDeleteArticleModal={openDeleteArticleModal}
        formatDate={formatDate}
      />
      <Confirmodal
        show={showDeleteRecipeModal}
        onClose={() => setShowDeleteRecipeModal(false)}
        onConfirm={handleDeleteRecipe}
        text="Bist du sicher, dass du dieses Rezept löschen möchtest?"
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

export default AdminDashboard;
