import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FaPlus } from "react-icons/fa";
import { AdminRecipePreview } from "../../types/recipeTypes";

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd.MM.yyyy, HH:mm");
};

interface AdminRecipeListProps {
  recipes: AdminRecipePreview[];
}

const AdminRecipeList: React.FC<AdminRecipeListProps> = ({ recipes }) => {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <li
            key={recipe.url_identifier}
            className="bg-white shadow-md rounded-md p-4"
          >
            <Link to={`/recipe/${recipe.url_identifier}`}>
              <img
                src={
                  recipe.thumbnail ||
                  `${process.env.REACT_APP_API_URL}/media/recipe_images/thumbs/default_thumb.jpg`
                }
                alt={recipe.name || "Recipe Image"}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
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
            </Link>
          </li>
        ))}
        <li key={"add"} className="bg-zinc-100 shadow-md rounded-md p-4">
          <Link to={`/admin/add-recipe/`}>
            <div className="w-full h-full flex flex-col items-center justify-center">
              <FaPlus className="w-32 h-32 text-gray-400" />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminRecipeList;
