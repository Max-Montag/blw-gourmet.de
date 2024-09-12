import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { AdminRecipePreview } from "../../types/recipeTypes";
import DeleteModal from "../components/DeleteModal";
import LoadingAnimation from "../components/loadingAnimation/LoadingAnimation";
import ErrorMessage from "../components/error/ErrorMessage";

const AdminDashboard: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [recipes, setRecipes] = useState<AdminRecipePreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedRecipeUrl, setSelectedRecipeUrl] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<AdminRecipePreview[]>(
          `${apiUrl}/recipes/`,
        );
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Fehler beim Laden der Rezepte.");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [apiUrl]);

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/recipe/create/`,
        JSON.stringify({}),
      );

      if (response.status === 201) {
        navigate(`/admin/edit-recipe/${response.data.recipe_url}`);
      }
    } catch (error) {
      console.error("Fehler beim anlegen!", error);
      alert("Fehler beim anlegen!");
    }
  };

  const handleDelete = async () => {
    if (selectedRecipeUrl) {
      try {
        await axios.delete(`${apiUrl}/recipe/delete/${selectedRecipeUrl}/`);
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.url !== selectedRecipeUrl),
        );
        setShowDeleteModal(false);
        setSelectedRecipeUrl(null);
      } catch (err) {
        setError("Fehler beim Löschen.");
        setShowDeleteModal(false);
        setSelectedRecipeUrl(null);
      }
    }
  };

  const openDeleteModal = (recipeUrl: string) => {
    setSelectedRecipeUrl(recipeUrl);
    setShowDeleteModal(true);
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
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <li
            key={recipe.url}
            className="bg-white shadow-md hover:shadow-xl rounded-md relative"
          >
            <Link to={`/admin/edit-recipe/${recipe.url}`}>
              <img
                src={`${process.env.REACT_APP_API_URL}${recipe.thumbnail}`}
                alt={recipe.name || "Recipe Image"}
                className="w-full h-40 object-cover"
              />
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
              onClick={() => openDeleteModal(recipe.url)}
            />
          </li>
        ))}
        <li
          key={"add"}
          className="bg-zinc-100 shadow-md rounded-md p-4 cursor-pointer"
        >
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            onClick={handleAdd}
          >
            <FaPlus className="w-32 h-32 text-gray-400 my-8" />
          </div>
        </li>
      </ul>
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminDashboard;
