import RecipeList from "@/components/recipe/RecipeList";

const BrowseRecipes: React.FC = () => {
  return (
    <div className="w-full flx-grow flex flex-col justify-center items-center p-8">
      <section className="my-12">
        <RecipeList />
      </section>
    </div>
  );
};

export default BrowseRecipes;
