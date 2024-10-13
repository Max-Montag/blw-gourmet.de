import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import RecipeSlider from "@/components/recipe/RecipeSlider";
import { RecipePreview } from "@/types/recipeTypes";

// Mock RecipeListCard as it has its own tests
jest.mock("@/components/recipe/RecipeListCard");

describe("RecipeSlider Component", () => {
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

  it("render Keine Rezepte gefunden message when no recipes are provided", () => {
    render(<RecipeSlider recipes={[]} />);
    expect(screen.getByText("Keine Rezepte gefunden.")).toBeInTheDocument();
  });

  it("renders the name as a link when the name prop is provided", () => {
    render(<RecipeSlider recipes={mockRecipes} name="frühstück" />);
    const linkElement = screen.getByRole("link", { name: "Frühstück" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/rezepte/frühstück");
  });

  it("does not render the name link when the name prop is not provided", () => {
    render(<RecipeSlider recipes={mockRecipes} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
