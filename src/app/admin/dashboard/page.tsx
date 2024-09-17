"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { AdminRecipePreview } from "@/types/recipeTypes";
import { AdminArticlePreview } from "@/types/articleTypes";
import DeleteModal from "@/components/common/DeleteModal";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import ErrorMessage from "@/components/error/ErrorMessage";
import Link from "next/link";
import Image from "next/image";

// TODO extract to serpatate component, so that the recipe list can be reused for ordinary (logged in, editing) users

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
      <h2 className="text-2xl font-bold mb-4">Rezepte</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <li
          key={"add_recipe"}
          className="bg-zinc-100 hover:bg-zinc-200 shadow-md rounded-md p-4 cursor-pointer"
        >
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            onClick={handleAddRecipe}
          >
            <FaPlus className="w-32 h-32 text-gray-400 my-8" />
          </div>
        </li>
        {recipes.map((recipe) => (
          <li
            key={recipe.url}
            className="bg-white shadow-md hover:shadow-xl rounded-md relative"
          >
            <Link href={`/admin/edit-recipe/${recipe.url}`}>
              {recipe.thumbnail ? (
                <Image
                  src={`${apiUrl}${recipe.thumbnail}`}
                  alt={recipe.name || "Recipe Image"}
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
                <h2 className="text-lg font-bold mb-2">{recipe.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {recipe.description || "Keine Beschreibung verfügbar"}
                </p>
                <div className="gap-2 mt-2">
                  {recipe.creation_time && (
                    <p className="text-sm text-gray-500">
                      Erstellt: {formatDate(recipe.creation_time)}
                    </p>
                  )}
                  {recipe.last_changed && (
                    <p className="text-sm text-gray-500">
                      Bearbeitet: {formatDate(recipe.last_changed)}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    Ersteller: {recipe.owner === 1 ? "Admin" : "User"}
                  </p>
                </div>
              </div>
            </Link>
            <MdDeleteOutline
              className="absolute top-2 right-2 text-red-500 cursor-pointer"
              size={24}
              onClick={() => openDeleteRecipeModal(recipe.url)}
            />
          </li>
        ))}
      </ul>
      <hr className="my-8" />
      <h2 className="text-2xl font-bold mb-4">Artikel</h2>
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
        {articles.map((article) => (
          <li
            key={article.url}
            className="bg-white shadow-md hover:shadow-xl rounded-md relative"
          >
            <Link href={`/admin/edit-article/${article.url}`}>
              {article.thumbnail ? (
                <Image
                  src={`${apiUrl}${article.thumbnail}`}
                  alt={article.title || "Article Image"}
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
