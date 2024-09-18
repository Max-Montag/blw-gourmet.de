"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { AdminRecipePreview } from "@/types/recipeTypes";
import { AdminArticlePreview } from "@/types/articleTypes";
import DeleteModal from "@/components/common/DeleteModal";
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesResponse, articlesResponse] = await Promise.all([
          axios.get<AdminRecipePreview[]>(`${apiUrl}/recipes/all-recipes/`),
          axios.get<AdminArticlePreview[]>(
            `${apiUrl}/articles/admin-all-articles/`,
          ),
        ]);
        setRecipes(recipesResponse.data);
        setArticles(articlesResponse.data);
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
      const response = await axios.post(
        `${apiUrl}/recipes/create/`,
        JSON.stringify({}),
      );

      if (response.status === 201) {
        router.push(`/admin/edit-recipe/${response.data.recipe_url}`);
      }
    } catch (error) {
      console.error("Fehler beim Anlegen!", error);
      alert("Fehler beim Anlegen!");
    }
  };

  const handleAddArticle = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/articles/create/`,
        JSON.stringify({}),
      );

      if (response.status === 201) {
        router.push(`/admin/edit-article/${response.data.article_url}`);
      }
    } catch (error) {
      console.error("Fehler beim Anlegen!", error);
      alert("Fehler beim Anlegen!");
    }
  };

  const handleDeleteRecipe = async () => {
    if (selectedRecipeUrl) {
      try {
        await axios.delete(
          `${apiUrl}/recipes/recipe/delete/${selectedRecipeUrl}/`,
        );
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
        await axios.delete(
          `${apiUrl}/articles/article/delete/${selectedArticleUrl}/`,
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
      <DeleteModal
        show={showDeleteRecipeModal}
        onClose={() => setShowDeleteRecipeModal(false)}
        onConfirm={handleDeleteRecipe}
      />
      <DeleteModal
        show={showDeleteArticleModal}
        onClose={() => setShowDeleteArticleModal(false)}
        onConfirm={handleDeleteArticle}
      />
    </div>
  );
};

export default AdminDashboard;
