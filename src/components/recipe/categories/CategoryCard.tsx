import Link from "next/link";

interface CategoryCardProps {
  category: string;
  icon: JSX.Element;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, icon }) => {
  return (
    <Link
      href={`/rezepte/${category.toLowerCase()}`}
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-50 flex bg-white bg-opacity-80 hover:bg-opacity-90 transition-all duration-200 flex-col items-center justify-center"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-base sm:text-lg lg:text-xl font-bold">
        {category}
      </div>
    </Link>
  );
};

export default CategoryCard;
