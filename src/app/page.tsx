import CategoryList from '@/components/categories/CategoryList';

const Home = () => {
  return (
    <main className="p-6 text-center">
      <section className="my-12">
        <h1 className="text-3xl lg:text-6xl font-bold mb-6">Willkommen bei BLW Gourmet!</h1>
        <p className="text-lg lg:text-2xl text-gray-600">Entdecke leckere Rezepte für dein Baby-led Weaning Abenteuer!</p>
      </section>
      
      <section className="max-w-4xl mx-auto">
        <CategoryList />
      </section>
    </main>
  );
};

export default Home;
