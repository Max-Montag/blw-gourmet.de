import React from "react";
import { render, screen } from "@testing-library/react";
import RecipeList from "@/components/recipe/RecipeList";
import { RecipePreview } from "@/types/recipeTypes";

// Mock RecipeListCard as it has its own tests
jest.mock("@/components/recipe/RecipeListCard");

describe("RecipeList Component", () => {
  const mockRecipes: RecipePreview[] = [
    {
      name: "Testrezept1",
      url: "/testrezept1",
      description: "Leckeres Testrezept 1",
      preparation_time: 30,
    },
    {
      name: "Testrezept2",
      url: "/testrezept2",
      description: "Leckeres Testrezept 2",
      preparation_time: 45,
    },
  ];

  it("renders NoRecipesAvailable text when no recipes are provided", () => {
    render(<RecipeList name="frühstück" recipes={[]} />);
    expect(
      screen.getByText("In dieser Kategorie sind noch keine Rezepte verfügbar.")
    ).toBeInTheDocument();
  });

  it("renders the category name with first letter capitalized", () => {
    render(<RecipeList name="frühstück" recipes={mockRecipes} />);
    const headingElement = screen.getByText("Kategorie: Frühstück");
    expect(headingElement).toBeInTheDocument();
  });

  it("renders a list of RecipeListCard components when recipes are provided", () => {
    render(<RecipeList name="mittagessen" recipes={mockRecipes} />);
    const recipeCards = screen.getAllByTestId("recipe-card");
    expect(recipeCards).toHaveLength(mockRecipes.length);
    expect(recipeCards[0]).toHaveTextContent("Testrezept1");
    expect(recipeCards[1]).toHaveTextContent("Testrezept2");
  });
});
