import { RecipeData } from "@/types/recipeTypes";

export const ensureEmptyFields = (data: RecipeData): RecipeData => {
  return {
    ...data,
    labels:
      data.labels && data.labels[data.labels.length - 1] !== ""
        ? [...data.labels, ""]
        : data.labels || [""],
    ingredients: data.ingredients
      ? data.ingredients.length > 0
        ? data.ingredients[data.ingredients.length - 1]?.ingredient !== ""
          ? [...data.ingredients, { ingredient: "", amount: 0, unit: "" }]
          : data.ingredients || [{ ingredient: "", amount: 0, unit: "" }]
        : [{ ingredient: "", amount: 0, unit: "" }]
      : [{ ingredient: "", amount: 0, unit: "" }],
    tools:
      data.tools && data.tools[data.tools.length - 1] !== ""
        ? [...data.tools, ""]
        : data.tools || [""],
    instructions: data.instructions
      ? [
          ...data.instructions.map((instruction) => ({
            ...instruction,
            ingredients:
              instruction.ingredients && instruction.ingredients.length > 0
                ? instruction.ingredients[instruction.ingredients.length - 1]
                    ?.ingredient !== ""
                  ? [
                      ...instruction.ingredients,
                      { ingredient: "", amount: 0, unit: "" },
                    ]
                  : instruction.ingredients
                : [{ ingredient: "", amount: 0, unit: "" }],
            tools:
              instruction.tools && instruction.tools.length > 0
                ? instruction.tools[instruction.tools.length - 1] !== ""
                  ? [...instruction.tools, ""]
                  : instruction.tools
                : [""],
          })),
          ...(data.instructions.length === 0 ||
          data.instructions[data.instructions.length - 1]?.instruction !== ""
            ? [
                {
                  name: "",
                  ingredients: [{ ingredient: "", amount: 0, unit: "" }],
                  tools: [""],
                  instruction: "",
                },
              ]
            : []),
        ]
      : [
          {
            name: "",
            ingredients: [{ ingredient: "", amount: 0, unit: "" }],
            tools: [""],
            instruction: "",
          },
        ],
    dining_times:
      data.dining_times &&
      data.dining_times[data.dining_times.length - 1] !== ""
        ? [...data.dining_times, ""]
        : data.dining_times || [""],
  };
};
