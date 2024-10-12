import React from "react";
import { RecipePreview } from "@/types/recipeTypes";

const MockRecipeListCard: React.FC<{ recipe: RecipePreview }> = ({
  recipe,
}) => <div data-testid="recipe-card">{recipe.name}</div>;

MockRecipeListCard.displayName = "MockRecipeListCard";

export default MockRecipeListCard;
