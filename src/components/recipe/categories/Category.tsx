import Link from "next/link";
import Image from "next/image";
import IconText from "@/components/common/IconText";
import { RecipePreview } from "@/types/recipeTypes";
import NoRecipesAvailable from "@/components/error/NoRecipesAvailable";

interface CategoryProps {
  name: string;
  recipes: RecipePreview[];
}

const Category: React.FC<CategoryProps> = ({ name, recipes }) => {
  return (
    <div className="max-w-4xl mx-auto py-4">
      {recipes.length > 0 ? (
        <>
          <h1 className="text-1.5xl text-zinc-700 font-semibold text-start mb-4">
            Kategorie: {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 scroll-smooth">
            {recipes.map((recipe) => {
              const combinedLabels = [...recipe.dining_times, ...recipe.labels];
              return (
                <Link
                  href={`/rezept/${recipe.url}`}
                  key={recipe.name}
                  className="flex flex-col justify-between bg-white shadow-sm hover:shadow-md sm:rounded-md cursor-pointer"
                >
                  <div className="group">
                    {recipe.thumbnail ? (
                      <div className="relative overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}${recipe.thumbnail}`}
                          alt={recipe.name}
                          width={240}
                          height={160}
                          className="w-full h-40 object-cover sm:rounded-t-md group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black sm:rounded-t-md opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center w-full h-40 bg-zinc-300">
                        <span className="text-xs text-zinc-600">
                          Bild nicht gefunden
                        </span>
                      </div>
                    )}
                    <div className="px-2 pb-4">
                      <h2 className="text-md+ font-bold my-2">{recipe.name}</h2>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {recipe.description || "Keine Beschreibung verfügbar"}
                      </p>
                    </div>
                  </div>
                  <div>
                    {combinedLabels.length > 0 && (
                      <div className="flex flex-wrap-reverse -m-1 pb-4 px-2">
                        {combinedLabels.map((label, index) => (
                          <div
                            key={index}
                            className="bg-cyan-50 text-cyan-700 text-xs md:text-sm font-semibold m-0.5 px-1.5 py-0.5 rounded-xl border border-cyan-700"
                          >
                            <IconText text={label} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <NoRecipesAvailable />
      )}
    </div>
  );
};

export default Category;
