import { RecipePreview } from "@/types/recipeTypes";
import NoRecipesAvailable from "@/components/error/NoRecipesAvailable";
import RecipeListCard from "@/components/recipe/RecipeListCard";

interface RecipeListProps {
  name: string;
  recipes: RecipePreview[];
}

const RecipeList: React.FC<RecipeListProps> = ({ name, recipes }) => {
  return (
    <div className="max-w-4xl w-full xs:w-fit mx-auto px-4 py-4">
      {recipes && recipes.length > 0 ? (
        <>
          <h1 className="text-1.5xl text-zinc-700 font-semibold text-start mb-4 pl-2 md:pl-0">
            Kategorie: {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 scroll-smooth">
            {recipes.map((recipe) => (
              <RecipeListCard key={recipe.name} recipe={recipe} />
            ))}
          </div>
        </>
      ) : (
        <NoRecipesAvailable />
      )}
    </div>
  );
};

export default RecipeList;
