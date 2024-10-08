import Link from "next/link";

interface CategoryCardProps {
  category: string;
  icon: JSX.Element;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, icon }) => {
  return (
    <Link
      href={`/rezepte/${category.toLowerCase()}`}
      className="border rounded-lg p-4 shadow-sm hover:shadow-md flex bg-white bg-opacity-80 hover:bg-opacity-90 flex-col items-center justify-center"
    >
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-base sm:text-lg lg:text-xl font-bold text-center">
        {category}
      </div>
    </Link>
  );
};

export default CategoryCard;
