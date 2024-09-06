import React, { useState, useEffect } from "react";
import { Ingredient, Instruction, RecipeData } from "../../types/recipeTypes";
import RecipeDisplay from "../recipe/RecipeDisplay";

interface EditRecipeProps {
  initialRecipe?: RecipeData;
  onRecipeChange: (recipe: RecipeData) => void;
}

const EditRecipeDisplay: React.FC<EditRecipeProps> = ({
  initialRecipe,
  onRecipeChange,
}) => {
  const [jsonInput, setJsonInput] = useState("");
  const [recipeData, setRecipeData] = useState<RecipeData>(
    initialRecipe || {
      name: "",
      description: "",
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
      preparation_time: 0,
      rest_time: 0,
    },
  );

  useEffect(() => {
    const cleanedData = removeEmptyFields(recipeData);
    onRecipeChange(cleanedData);
    setJsonInput(JSON.stringify(cleanedData, null, 2));
  }, [recipeData, onRecipeChange]);

  const removeEmptyFields = (data: RecipeData): RecipeData => {
    return {
      ...data,
      labels: data.labels.filter((label) => label !== ""),
      ingredients: data.ingredients.filter(
        (ingredient) => ingredient.ingredient !== "",
      ),
      tools: data.tools.filter((tool) => tool !== ""),
      instructions: data.instructions.filter(
        (instruction) =>
          instruction.name !== "" ||
          instruction.instruction !== "" ||
          instruction.ingredients.some(
            (ingredient) => ingredient.ingredient !== "",
          ) ||
          instruction.tools.some((tool) => tool !== ""),
      ),
      dining_times: data.dining_times.filter((time) => time !== ""),
    };
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value === "" ? null : value,
    }));
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJsonInput = e.target.value;
    setJsonInput(newJsonInput);

    try {
      const parsedData = JSON.parse(newJsonInput);
      setRecipeData(parsedData);
    } catch (error) {
      alert(error);
    }
  };

  const handleLabelChange = (index: number, value: string) => {
    const newLabels = [...recipeData.labels];
    newLabels[index] = value;
    if (index === recipeData.labels.length - 1 && value !== "") {
      newLabels.push("");
    }
    setRecipeData((prevData) => ({ ...prevData, labels: newLabels }));
  };

  const handleRemoveLabel = (index: number) => {
    const newLabels = recipeData.labels.filter((_, i) => i !== index);
    setRecipeData((prevData) => ({
      ...prevData,
      labels: newLabels.length > 0 ? newLabels : [""],
    }));
  };

  const handleDiningTimeChange = (index: number, value: string) => {
    const newDiningTimes = [...recipeData.dining_times];
    newDiningTimes[index] = value;
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
    setRecipeData((prevData) => ({
      ...prevData,
      dining_times: newDiningTimes.length > 0 ? newDiningTimes : [""],
    }));
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number,
  ) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    if (index === recipeData.ingredients.length - 1 && value !== "") {
      newIngredients.push({ ingredient: "", amount: 0, unit: "" });
    }
    setRecipeData((prevData) => ({ ...prevData, ingredients: newIngredients }));
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
    const newTools = [...recipeData.tools];
    newTools[index] = value;
    if (index === recipeData.tools.length - 1 && value !== "") {
      newTools.push("");
    }
    setRecipeData((prevData) => ({ ...prevData, tools: newTools }));
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
    const newInstructions = [...recipeData.instructions];
    newInstructions[index] = { ...newInstructions[index], [field]: value };
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
    const newInstructions = [...recipeData.instructions];
    const newIngredients = [...newInstructions[instructionIndex].ingredients];
    newIngredients[ingredientIndex] = {
      ...newIngredients[ingredientIndex],
      [field]: value,
    };
    newInstructions[instructionIndex] = {
      ...newInstructions[instructionIndex],
      ingredients: newIngredients,
    };
    if (ingredientIndex === newIngredients.length - 1 && value !== "") {
      newIngredients.push({ ingredient: "", amount: 0, unit: "" });
    }
    setRecipeData((prevData) => ({
      ...prevData,
      instructions: newInstructions,
    }));
  };

  const handleRemoveInstructionIngredient = (
    instructionIndex: number,
    ingredientIndex: number,
  ) => {
    const newInstructions = [...recipeData.instructions];
    const newIngredients = newInstructions[instructionIndex].ingredients.filter(
      (_, i) => i !== ingredientIndex,
    );
    newInstructions[instructionIndex] = {
      ...newInstructions[instructionIndex],
      ingredients:
        newIngredients.length > 0
          ? newIngredients
          : [{ ingredient: "", amount: 0, unit: "" }],
    };
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
    const newInstructions = [...recipeData.instructions];
    const newTools = [...newInstructions[instructionIndex].tools];
    newTools[toolIndex] = value;
    newInstructions[instructionIndex] = {
      ...newInstructions[instructionIndex],
      tools: newTools,
    };
    if (toolIndex === newTools.length - 1 && value !== "") {
      newTools.push("");
    }
    setRecipeData((prevData) => ({
      ...prevData,
      instructions: newInstructions,
    }));
  };

  const handleRemoveInstructionTool = (
    instructionIndex: number,
    toolIndex: number,
  ) => {
    const newInstructions = [...recipeData.instructions];
    const newTools = newInstructions[instructionIndex].tools.filter(
      (_, i) => i !== toolIndex,
    );
    newInstructions[instructionIndex] = {
      ...newInstructions[instructionIndex],
      tools: newTools.length > 0 ? newTools : [""],
    };
    setRecipeData((prevData) => ({
      ...prevData,
      instructions: newInstructions,
    }));
  };

  return (
    <div className="flex space-x-4 w-full">
      <div className="w-1/2 mx-auto p-6 bg-white shadow-md rounded-md">
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
              Description:
            </label>
            <textarea
              name="description"
              value={recipeData.description ?? ""}
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
                  onChange={(e) =>
                    handleDiningTimeChange(index, e.target.value)
                  }
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
              value={recipeData.preparation_time ?? 0}
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
              value={recipeData.rest_time ?? 0}
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
                    handleInstructionChange(
                      index,
                      "instruction",
                      e.target.value,
                    )
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
      </div>
      <div className="w-1/2">
        <RecipeDisplay recipe={recipeData} />
      </div>
    </div>
  );
};

export default EditRecipeDisplay;
