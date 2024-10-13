import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import RecipeListCard from "./RecipeListCard";
import { RecipePreview } from "@/types/recipeTypes";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

jest.mock("next/font/google");

describe("RecipeListCard", () => {
  const mockRecipe: RecipePreview = {
    name: "Test Rezept",
    url: "test-rezept",
    description: "Dies ist eine Testbeschreibung",
    preparation_time: 30,
    rest_time: 10,
    dining_times: ["Mittagessen", "Abendessen"],
    labels: ["Vegetarisch", "Glutenfrei"],
  };

  it("renders the recipe name and description correctly", () => {
    render(<RecipeListCard recipe={mockRecipe} />, {
      wrapper: MemoryRouterProvider,
    });

    const nameElement = screen.getByText("Test Rezept");
    const descriptionElement = screen.getByText(
      "Dies ist eine Testbeschreibung"
    );

    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it("displays the correct labels and dining times", () => {
    render(<RecipeListCard recipe={mockRecipe} />, {
      wrapper: MemoryRouterProvider,
    });

    const vegetarianLabel = screen.getByText("Vegetarisch");
    const glutenFreeLabel = screen.getByText("Glutenfrei");
    const lunchLabel = screen.getByText("Mittagessen");
    const dinnerLabel = screen.getByText("Abendessen");

    expect(vegetarianLabel).toBeInTheDocument();
    expect(glutenFreeLabel).toBeInTheDocument();
    expect(lunchLabel).toBeInTheDocument();
    expect(dinnerLabel).toBeInTheDocument();
  });

  it("displays fallback text if thumbnail is not provided", () => {
    render(<RecipeListCard recipe={mockRecipe} />, {
      wrapper: MemoryRouterProvider,
    });

    const fallbackText = screen.getByText("Bild nicht gefunden");
    expect(fallbackText).toBeInTheDocument();
  });

  it("renders default text if description is not available", () => {
    const recipeWithoutDescription: RecipePreview = {
      ...mockRecipe,
      description: undefined,
    };

    render(<RecipeListCard recipe={recipeWithoutDescription} />, {
      wrapper: MemoryRouterProvider,
    });

    const defaultDescription = screen.getByText(
      "Keine Beschreibung verfügbar..."
    );
    expect(defaultDescription).toBeInTheDocument();
  });
});
