import React, { useState, useEffect } from "react";
import axios from "axios";

interface Ingredient {
  ingredient: string;
  amount: number;
  unit: string;
}

interface Instruction {
  name: string;
  ingredients: Ingredient[];
  tools: string[];
  instruction: string;
}

interface RecipeData {
  name: string | null;
  labels: string[];
  ingredients: Ingredient[];
  tools: string[];
  instructions: Instruction[];
  dining_times: string[];
  preparation_time: number | null;
  rest_time: number | null;
}

const AddRecipe: React.FC = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [recipeData, setRecipeData] = useState<RecipeData>({
    name: null,
    labels: [""],
    ingredients: [{ ingredient: "", amount: 0, unit: "" }],
    tools: [""],
    instructions: [
      {
        name: "",
        ingredients: [{ ingredient: "", amount: 0, unit: "" }],
        tools: [""],
        instruction: "",
      },
    ],
    dining_times: [""],
    preparation_time: null,
    rest_time: null,
  });

  const [jsonInput, setJsonInput] = useState("");

  useEffect(() => {
    setJsonInput(JSON.stringify(recipeData, null, 2));
  }, [recipeData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]:
        name === "dining_time" ||
        name === "preparation_time" ||
        name === "rest_time"
          ? value === ""
            ? null
            : value
          : value,
    }));
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJsonInput = e.target.value;
    setJsonInput(newJsonInput);

    try {
      const parsedData = JSON.parse(newJsonInput);
      setRecipeData(parsedData);
    } catch (error) {
      // JSON not valid
    }
  };

  const handleLabelChange = (index: number, value: string) => {
    const newLabels = recipeData.labels.map((label, i) =>
      i === index ? value : label,
    );

    if (index === recipeData.labels.length - 1 && value !== "") {
      newLabels.push("");
    }

    setRecipeData((prevData) => ({
      ...prevData,
      labels: newLabels,
    }));
  };

  const handleRemoveLabel = (index: number) => {
    const newLabels = recipeData.labels.filter((_, i) => i !== index);

    if (newLabels.length === 0) {
      newLabels.push("");
    }

    setRecipeData((prevData) => ({
      ...prevData,
      labels: newLabels,
    }));
  };

  const handleDiningTimeChange = (index: number, value: string) => {
    const newDiningTimes = recipeData.dining_times.map((time, i) =>
      i === index ? value : time,
    );

    if (index === recipeData.dining_times.length - 1 && value !== "") {
      newDiningTimes.push("");
    }

    setRecipeData((prevData) => ({
      ...prevData,
      dining_times: newDiningTimes,
    }));
  };

  const handleRemoveDiningTime = (index: number) => {
    const newDiningTimes = recipeData.dining_times.filter(
      (_, i) => i !== index,
    );

    if (newDiningTimes.length === 0) {
      newDiningTimes.push("");
    }

    setRecipeData((prevData) => ({
      ...prevData,
      dining_times: newDiningTimes,
    }));
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number,
  ) => {
    const newIngredients = recipeData.ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient,
    );

    if (index === recipeData.ingredients.length - 1 && value !== "") {
      newIngredients.push({ ingredient: "", amount: 0, unit: "" });
    }

    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: newIngredients,
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = recipeData.ingredients.filter((_, i) => i !== index);
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients:
        newIngredients.length > 0
          ? newIngredients
          : [{ ingredient: "", amount: 0, unit: "" }],
    }));
  };

  const handleToolChange = (index: number, value: string) => {
    const newTools = recipeData.tools.map((tool, i) =>
      i === index ? value : tool,
    );

    if (index === recipeData.tools.length - 1 && value !== "") {
      newTools.push("");
    }

    setRecipeData((prevData) => ({
      ...prevData,
      tools: newTools,
    }));
  };

  const handleRemoveTool = (index: number) => {
    const newTools = recipeData.tools.filter((_, i) => i !== index);
    setRecipeData((prevData) => ({
      ...prevData,
      tools: newTools.length > 0 ? newTools : [""],
    }));
  };

  const handleInstructionChange = (
    index: number,
    field: keyof Instruction,
    value: string,
  ) => {
    const newInstructions = recipeData.instructions.map((instruction, i) =>
      i === index ? { ...instruction, [field]: value } : instruction,
    );

    if (index === recipeData.instructions.length - 1 && value !== "") {
      newInstructions.push({
        name: "",
        ingredients: [{ ingredient: "", amount: 0, unit: "" }],
        tools: [""],
        instruction: "",
      });
    }

    setRecipeData((prevData) => ({
      ...prevData,
      instructions: newInstructions,
    }));
  };

  const handleRemoveInstruction = (index: number) => {
    const newInstructions = recipeData.instructions.filter(
      (_, i) => i !== index,
    );
    setRecipeData((prevData) => ({
      ...prevData,
      instructions:
        newInstructions.length > 0
          ? newInstructions
          : [
              {
                name: "",
                ingredients: [{ ingredient: "", amount: 0, unit: "" }],
                tools: [""],
                instruction: "",
              },
            ],
    }));
  };

  const handleInstructionIngredientChange = (
    instructionIndex: number,
    ingredientIndex: number,
    field: keyof Ingredient,
    value: string | number,
  ) => {
    const newInstructions = recipeData.instructions.map((instruction, i) => {
      if (i === instructionIndex) {
        const newIngredients = instruction.ingredients.map((ingredient, j) =>
          j === ingredientIndex
            ? { ...ingredient, [field]: value }
            : ingredient,
        );

        if (
          ingredientIndex === instruction.ingredients.length - 1 &&
          value !== ""
        ) {
          newIngredients.push({ ingredient: "", amount: 0, unit: "" });
        }

        return { ...instruction, ingredients: newIngredients };
      }
      return instruction;
    });

    setRecipeData((prevData) => ({
      ...prevData,
      instructions: newInstructions,
    }));
  };

  const handleRemoveInstructionIngredient = (
    instructionIndex: number,
    ingredientIndex: number,
  ) => {
    const newInstructions = recipeData.instructions.map((instruction, i) => {
      if (i === instructionIndex) {
        const newIngredients = instruction.ingredients.filter(
          (_, j) => j !== ingredientIndex,
        );
        return {
          ...instruction,
          ingredients:
            newIngredients.length > 0
              ? newIngredients
              : [{ ingredient: "", amount: 0, unit: "" }],
        };
      }
      return instruction;
    });

    setRecipeData((prevData) => ({
      ...prevData,
      instructions: newInstructions,
    }));
  };

  const handleInstructionToolChange = (
    instructionIndex: number,
    toolIndex: number,
    value: string,
  ) => {
    const newInstructions = recipeData.instructions.map((instruction, i) => {
      if (i === instructionIndex) {
        const newTools = instruction.tools.map((tool, j) =>
          j === toolIndex ? value : tool,
        );

        if (toolIndex === instruction.tools.length - 1 && value !== "") {
          newTools.push("");
        }

        return { ...instruction, tools: newTools };
      }
      return instruction;
    });

    setRecipeData((prevData) => ({
      ...prevData,
      instructions: newInstructions,
    }));
  };

  const handleRemoveInstructionTool = (
    instructionIndex: number,
    toolIndex: number,
  ) => {
    const newInstructions = recipeData.instructions.map((instruction, i) => {
      if (i === instructionIndex) {
        const newTools = instruction.tools.filter((_, j) => j !== toolIndex);
        return { ...instruction, tools: newTools.length > 0 ? newTools : [""] };
      }
      return instruction;
    });

    setRecipeData((prevData) => ({
      ...prevData,
      instructions: newInstructions,
    }));
  };

  const handleSubmit = async () => {
    try {
      const validDiningTimes = ["lunch", "snack", "breakfast", "dinner"];
      const filteredData = {
        ...recipeData,
        dining_times: recipeData.dining_times.filter((time) =>
          validDiningTimes.includes(time),
        ),
        labels: recipeData.labels.filter((label) => label !== ""),
        ingredients: recipeData.ingredients.filter(
          (ingredient) =>
            ingredient.ingredient !== "" ||
            ingredient.amount !== 0 ||
            ingredient.unit !== "",
        ),
        tools: recipeData.tools.filter((tool) => tool !== ""),
        instructions: recipeData.instructions
          .map((instruction) => ({
            ...instruction,
            ingredients: instruction.ingredients.filter(
              (ingredient) =>
                ingredient.ingredient !== "" ||
                ingredient.amount !== 0 ||
                ingredient.unit !== "",
            ),
            tools: instruction.tools.filter((tool) => tool !== ""),
          }))
          .filter(
            (instruction) =>
              instruction.name !== "" ||
              instruction.instruction !== "" ||
              instruction.ingredients.length > 0 ||
              instruction.tools.length > 0,
          ),
      };

      const dataToSend = JSON.stringify(filteredData);

      const response = await axios.post(`${apiUrl}/recipe/create/`, dataToSend);
      if (response.status === 201) {
        handleClear();
      }
    } catch (error) {
      console.error("There was an error creating the recipe!", error);
      alert("Failed to create recipe");
    }
  };

  const handleClear = () => {
    setRecipeData({
      name: null,
      labels: [""],
      ingredients: [{ ingredient: "", amount: 0, unit: "" }],
      tools: [""],
      instructions: [
        {
          name: "",
          ingredients: [{ ingredient: "", amount: 0, unit: "" }],
          tools: [""],
          instruction: "",
        },
      ],
      dining_times: [""],
      preparation_time: null,
      rest_time: null,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Recipe</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={recipeData.name ?? ""}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Labels:
          </label>
          {recipeData.labels.map((label, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={label}
                onChange={(e) => handleLabelChange(index, e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={() => handleRemoveLabel(index)}
                className="text-red-500"
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dining Times:
          </label>
          {recipeData.dining_times.map((time, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <select
                name={`dining_time_${index}`}
                value={time ?? ""}
                onChange={(e) => handleDiningTimeChange(index, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a dining time</option>
                <option value="snack">Snack</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
              <button
                onClick={() => handleRemoveDiningTime(index)}
                className="text-red-500"
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preparation Time:
          </label>
          <input
            type="number"
            name="preparation_time"
            value={recipeData.preparation_time ?? ""}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rest Time:
          </label>
          <input
            type="number"
            name="rest_time"
            value={recipeData.rest_time ?? ""}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ingredients:
          </label>
          {recipeData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Ingredient"
                value={ingredient.ingredient}
                onChange={(e) =>
                  handleIngredientChange(index, "ingredient", e.target.value)
                }
                className="block w-1/3 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="number"
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(e) =>
                  handleIngredientChange(
                    index,
                    "amount",
                    parseInt(e.target.value),
                  )
                }
                className="block w-1/3 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                placeholder="Unit"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
                className="block w-1/3 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={() => handleRemoveIngredient(index)}
                className="text-red-500"
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tools:
          </label>
          {recipeData.tools.map((tool, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={tool}
                onChange={(e) => handleToolChange(index, e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={() => handleRemoveTool(index)}
                className="text-red-500"
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Instructions:
          </label>
          {recipeData.instructions.map((instruction, index) => (
            <div
              key={index}
              className="space-y-2 mb-4 p-4 border border-gray-300 rounded-md shadow-sm"
            >
              <input
                type="text"
                placeholder="Instruction Name"
                value={instruction.name}
                onChange={(e) =>
                  handleInstructionChange(index, "name", e.target.value)
                }
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Instruction Ingredients:
                </label>
                {instruction.ingredients.map((ingredient, ingIndex) => (
                  <div key={ingIndex} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="Ingredient"
                      value={ingredient.ingredient}
                      onChange={(e) =>
                        handleInstructionIngredientChange(
                          index,
                          ingIndex,
                          "ingredient",
                          e.target.value,
                        )
                      }
                      className="block w-1/3 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      value={ingredient.amount}
                      onChange={(e) =>
                        handleInstructionIngredientChange(
                          index,
                          ingIndex,
                          "amount",
                          parseInt(e.target.value),
                        )
                      }
                      className="block w-1/3 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Unit"
                      value={ingredient.unit}
                      onChange={(e) =>
                        handleInstructionIngredientChange(
                          index,
                          ingIndex,
                          "unit",
                          e.target.value,
                        )
                      }
                      className="block w-1/3 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      onClick={() =>
                        handleRemoveInstructionIngredient(index, ingIndex)
                      }
                      className="text-red-500"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Instruction Tools:
                </label>
                {instruction.tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={tool}
                      onChange={(e) =>
                        handleInstructionToolChange(
                          index,
                          toolIndex,
                          e.target.value,
                        )
                      }
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      onClick={() =>
                        handleRemoveInstructionTool(index, toolIndex)
                      }
                      className="text-red-500"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <textarea
                placeholder="Instruction Details"
                value={instruction.instruction}
                onChange={(e) =>
                  handleInstructionChange(index, "instruction", e.target.value)
                }
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={() => handleRemoveInstruction(index)}
                className="text-red-500"
              >
                Remove Instruction
              </button>
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Recipe JSON:
          </label>
          <textarea
            rows={10}
            value={jsonInput}
            onChange={handleJsonChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Recipe
      </button>
      <button
        onClick={handleClear}
        className="mt-2 w-full bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Clear Recipe
      </button>
    </div>
  );
};

export default AddRecipe;
