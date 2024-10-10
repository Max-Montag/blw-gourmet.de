import { FaPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { AdminRecipePreview } from "@/types/recipeTypes";
import { formatDate } from "@/utils/dateUtils";

interface EditRecipeListProps {
  recipes: AdminRecipePreview[];
  apiUrl?: string;
  handleAddRecipe: () => void;
  openDeleteRecipeModal: (recipeUrl: string) => void;
  openPublishModal: (recipeUrl: string) => void;
  handleUnpublishRecipe: (recipeUrl: string) => void;
}

const EditRecipeList: React.FC<EditRecipeListProps> = ({
  recipes,
  apiUrl,
  handleAddRecipe,
  openDeleteRecipeModal,
  openPublishModal,
  handleUnpublishRecipe,
}) => {
  const { isAdmin } = useAuth();

  return (
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
      {recipes &&
        recipes.length > 0 &&
        recipes.map((recipe) => (
          <li
            key={recipe.url}
            className="bg-white shadow-md hover:shadow-xl rounded-md relative"
          >
            <Link
              href={`/mein-bereich/meine-rezepte/rezept-bearbeiten/${recipe.url}`}
            >
              {recipe.thumbnail ? (
                <Image
                  src={`${apiUrl}${recipe.thumbnail}`}
                  alt={recipe.name || "Rezeptbild"}
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
                  {isAdmin && (
                    <p className="text-sm text-gray-500">
                      Ersteller: {recipe.owner === 1 ? "Admin" : "User"}
                    </p>
                  )}
                </div>
              </div>
            </Link>
            <MdDeleteOutline
              className="absolute top-2 right-2 text-red-500 cursor-pointer"
              size={24}
              onClick={() => {
                recipe.url && openDeleteRecipeModal(recipe.url);
              }}
            />
            {recipe.published ? (
              <FaRegEye
                className="absolute top-2 left-2 text-emerald-500 cursor-pointer"
                size={24}
                onClick={() => {
                  recipe.url && handleUnpublishRecipe(recipe.url);
                }}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute top-2 left-2 text-gray-700 cursor-pointer"
                size={24}
                onClick={() => {
                  recipe.url && openPublishModal(recipe.url);
                }}
              />
            )}
          </li>
        ))}
    </ul>
  );
};

export default EditRecipeList;
