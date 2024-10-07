import CategoryCard from "./CategoryCard";
import { categoryIcons } from "@/utils/categoryIcons";

interface CategoryListProps {
  categories?: string[];
  className?: string;
}

export default async function CategoryList({
  categories,
  className,
}: CategoryListProps) {
  const categoriesAvailable = categories || [];

  if (!categoriesAvailable) {
    return null;
  }

  return (
    <div
      className={`px-4 grid gap-6 ${className ? className : "grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}
    >
      {categoriesAvailable.map((cat) => (
        <CategoryCard
          key={cat}
          category={cat}
          icon={
            categoryIcons[
              cat
                .toLowerCase()
                .trim()
                .replace(/[^a-zA-Z^äöüß]/g, "")
            ] || undefined
          }
        />
      ))}
    </div>
  );
}
