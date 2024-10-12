import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import RecipeDisplay from "./RecipeDisplay";
import { RecipeData } from "@/types/recipeTypes";

jest.mock("next/font/google");

const mockRecipe: RecipeData = {
  name: "Baby-Freundliche Gemüsemuffins",
  url: "baby-gemuese-muffins",
  description: "Leckere und gesunde Gemüsemuffins für kleine Hände.",
  published: true,
  labels: ["schnell", "vegan"],
  ingredients: [
    { ingredient: "Karotte", amount: 1 },
    { ingredient: "Zucchini", amount: 0.5 },
    { ingredient: "Mehl", amount: 1.5, unit: "Tassen" },
  ],
  tools: ["Muffinform", "Reibe"],
  instructions: [
    {
      name: "Vorbereitung",
      instruction: "Karotten und Zucchini fein raspeln und Mehl hinzufügen.",
      ingredients: [
        { ingredient: "Karotte", amount: 1 },
        { ingredient: "Zucchini", amount: 0.5 },
      ],
      tools: [],
    },
    {
      name: "Just cook it",
      instruction: "Die Form befüllen und bei 180°C 20 Minuten backen.",
      ingredients: [],
      tools: ["Muffinform"],
    },
  ],
  dining_times: ["Frühstück", "Snack"],
  preparation_time: 15,
  rest_time: 0,
  optimized_image: null,
};

describe("RecipeDisplay Component", () => {
  it("renders the recipe name", () => {
    render(<RecipeDisplay recipe={mockRecipe} displaySocials={false} />);
    const recipeName = screen.getByText(/Baby-Freundliche Gemüsemuffins/i);
    expect(recipeName).toBeInTheDocument();
  });

  it("displays the recipe description", () => {
    render(<RecipeDisplay recipe={mockRecipe} displaySocials={false} />);
    const recipeDescription = screen.getByText(
      /Leckere und gesunde Gemüsemuffins für kleine Hände/i,
    );
    expect(recipeDescription).toBeInTheDocument();
  });

  it("displays a message when the recipe image is missing", () => {
    render(<RecipeDisplay recipe={mockRecipe} displaySocials={false} />);
    const missingImageMessage = screen.getByText(/Bild nicht gefunden/i);
    expect(missingImageMessage).toBeInTheDocument();
  });

  it("displays the labels correctly", () => {
    render(<RecipeDisplay recipe={mockRecipe} displaySocials={false} />);
    const label1 = screen.getByText(/schnell/i);
    const label2 = screen.getByText(/vegan/i);
    const diningLabel1 = screen.getByText(/Frühstück/i);
    const diningLabel2 = screen.getByText(/Snack/i);
    expect(label1).toBeInTheDocument();
    expect(label2).toBeInTheDocument();
    expect(diningLabel1).toBeInTheDocument();
    expect(diningLabel2).toBeInTheDocument();
  });

  it("shows the preparation and rest time", () => {
    render(<RecipeDisplay recipe={mockRecipe} displaySocials={false} />);
    const prepTime = screen.getByText(/15 Min/i);
    expect(prepTime).toBeInTheDocument();
    const restTime = screen.queryByText((content) => {
      return content === "0 Min";
    });
    expect(restTime).not.toBeInTheDocument();
  });

  it("displays the ingredients list correctly", () => {
    render(<RecipeDisplay recipe={mockRecipe} displaySocials={false} />);

    const lists = screen.getAllByRole("list");
    const amountList = lists[0];
    const ingredientList = lists[1];

    const amountItems = within(amountList).getAllByRole("listitem");
    const amountTexts = amountItems.map((item) => item.textContent);
    const expectedAmounts = ["1", "1/2", "1 1/2\u2009Tassen"];
    expect(amountTexts).toEqual(expectedAmounts);

    const ingredientItems = within(ingredientList).getAllByRole("listitem");
    const ingredientTexts = ingredientItems.map((item) => item.textContent);
    const expectedIngredients = ["Karotte", "Zucchini", "Mehl"];
    expect(ingredientTexts).toEqual(expectedIngredients);
  });

  it("displays the tools needed for the recipe", () => {
    render(<RecipeDisplay recipe={mockRecipe} displaySocials={false} />);
    const muffinformTools = screen.getAllByText(/Muffinform/i);
    const reibeTool = screen.getByText(/Reibe/i);
    expect(muffinformTools).toHaveLength(2);
    expect(reibeTool).toBeInTheDocument();
  });

  it("displays the instructions steps correctly", () => {
    render(<RecipeDisplay recipe={mockRecipe} displaySocials={false} />);
    const step1Title = screen.getByText(/Vorbereitung/i);
    const step1Instruction = screen.getByText(
      /Karotten und Zucchini fein raspeln und Mehl hinzufügen/i,
    );
    const step2Title = screen.getByText(/Just cook it/i);
    const step2Instruction = screen.getByText(
      /Die Form befüllen und bei 180°C 20 Minuten backen/i,
    );

    expect(step1Title).toBeInTheDocument();
    expect(step1Instruction).toBeInTheDocument();
    expect(step2Title).toBeInTheDocument();
    expect(step2Instruction).toBeInTheDocument();
  });
});
