import Link from "next/link";
import Image from "next/image";
import { lato } from "@/styles/fonts";
import IconText from "@/components/common/IconText";
import { RecipePreview } from "@/types/recipeTypes";

interface RecipeListCardProps {
  recipe: RecipePreview;
}

const RecipeListCard: React.FC<RecipeListCardProps> = ({ recipe }) => {
  const combinedLabels = [...recipe.dining_times, ...recipe.labels];
  return (
    <Link
      href={`/rezept/${recipe.url}`}
      key={recipe.name}
      className="flex flex-col h-full justify-between bg-white shadow-sm md:hover:shadow-md rounded-md group overflow-hidden cursor-pointer"
    >
      <div>
        {recipe.thumbnail ? (
          <div className="relative w-full h-[160px] overflow-hidden bg-cyan-50">
            <Image
              key={recipe.url + "thumbnail"}
              src={`${process.env.NEXT_PUBLIC_API_URL}${recipe.thumbnail}`}
              alt={recipe.name}
              fill
              sizes="280px"
              className="w-full h-auto object-cover group-hover:scale-105 overflow-hidden transition-transform duration-50"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-50"></div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-40 bg-zinc-300">
            <span className="text-xs text-zinc-600">Bild nicht gefunden</span>
          </div>
        )}
        <div className="text-start px-2 pb-4">
          <h1
            className={`text-lg xl:text-xl font-bold text-cyan-900 group-hover:text-cyan-700 my-2 min-h-[3.5rem] line-clamp-2 ${lato.className}`}
          >
            {recipe.name}
          </h1>
          <p className="text-gray-600 text-sm xl:text-base line-clamp-3">
            {recipe.description || "Keine Beschreibung verfügbar..."}
          </p>
        </div>
      </div>
      <div>
        {combinedLabels.length > 0 && (
          <div className="flex flex-wrap-reverse -m-1 pb-4 px-2">
            {combinedLabels.map((label, index) => (
              <div
                key={index}
                className="bg-cyan-50 text-cyan-700 text-xs font-semibold m-0.5 px-1.5 py-0.5 rounded-xl border border-cyan-700"
              >
                <IconText text={label} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default RecipeListCard;
