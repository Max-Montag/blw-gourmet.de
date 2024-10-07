import CategoryList from "@/components/recipe/categories/CategoryList";
import RecipeSlider from "@/components/recipe/RecipeSlider";
import { getRecipesByCategory } from "@/utils/apiUtils";

async function getCategories(): Promise<string[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/categories/`,
    {
      cache: "no-cache",
    },
    // TODO uncomment
    // {
    //   next: { revalidate: 86400 },
    // },
  );
  if (!res.ok) {
    return [];
  }
  return await res.json();
}

const BrowseRecipes: React.FC = async () => {
  const categories = (await getCategories()) || [
    "Frühstück",
    "Mittagessen",
    "Abendessen",
    "Snack",
  ];

  const category = await Promise.all(
    categories.map(async (category) => {
      return await getRecipesByCategory(category);
    }),
  );

  return (
    <div className="w-full flx-grow flex flex-col justify-center items-center p-8">
      <section>
        <CategoryList categories={categories} />
      </section>

      {category && category.length > 0 && (
        <section className="w-full flex justify-center">
          <div className="w-svw text-center">
            {category.map(
              (recipes, index) =>
                recipes &&
                recipes.length > 0 && (
                  <div className="mt-8 md:mt-12" key={categories[index]}>
                    <RecipeSlider name={categories[index]} recipes={recipes} />
                  </div>
                ),
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default BrowseRecipes;
