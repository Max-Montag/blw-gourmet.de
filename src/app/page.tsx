import CategoryList from "@/components/recipe/categories/CategoryList";

const Home = () => {
  return (
    <div className="flex flex-col justify-center text-center py-6">
      <section className="px-4">
        <h1 className="text-3xl lg:text-6xl font-bold mb-6">
          Willkommen bei BLW-Gourmet.de!
        </h1>
        <p className="text-lg lg:text-2xl text-gray-600 mb-6">
          Entdecke leckere Rezepte für euer Baby-led Weaning Abenteuer!
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <CategoryList />
      </section>
    </div>
  );
};

export default Home;
