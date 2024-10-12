import CategoryCard from "./CategoryCard";
import { getIconForCategory } from "@/components/common/IconText";

interface CategoryListProps {
  categories?: string[];
  className?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories = [],
  className,
}: CategoryListProps) => {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div
      className={`px-4 grid gap-6 ${className ? className : "grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}
    >
      {categories.map((cat) => (
        <CategoryCard key={cat} category={cat} icon={getIconForCategory(cat)} />
      ))}
    </div>
  );
};

export default CategoryList;
