import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Ingredient, Instruction, RecipeData } from "@/types/recipeTypes";
import { RecipeError } from "@/types/errorTypes";
import WarningNotification from "../common/WarningNotification";

interface EditRecipeProps {
  recipe: RecipeData;
  onRecipeChange: (recipe: RecipeData) => void;
  validateData: (newRecipe: RecipeData) => void;
  errors: RecipeError;
}

const EditRecipeDisplay: React.FC<EditRecipeProps> = ({
  recipe,
  onRecipeChange,
  validateData,
  errors,
}) => {
  const handleValidate = async () => {
    validateData(recipe);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const newRecipe = {
      ...recipe,
      [name]: value === "" ? null : value,
    };
    onRecipeChange(newRecipe);
    if (errors[name as keyof RecipeError]) {
      validateData(newRecipe);
    }
  };

  const handleLabelChange = (index: number, value: string) => {
    const newLabels = [...recipe.labels];
    newLabels[index] = value;
    if (index === recipe.labels.length - 1 && value !== "") {
      newLabels.push("");
    }
    onRecipeChange({ ...recipe, labels: newLabels });
  };

  const handleRemoveLabel = (index: number) => {
    const newLabels = recipe.labels.filter((_, i) => i !== index);
    const newRecipe = {
      ...recipe,
      labels: newLabels.length > 0 ? newLabels : [""],
    };
    onRecipeChange(newRecipe);
    validateData(newRecipe);
  };

  const handleDiningTimeChange = (index: number, value: string) => {
    const newDiningTimes = [...recipe.dining_times];
    newDiningTimes[index] = value;
    if (index === recipe.dining_times.length - 1 && value !== "") {
      newDiningTimes.push("");
    }
    const newRecipe = { ...recipe, dining_times: newDiningTimes };
    onRecipeChange(newRecipe);
    validateData(newRecipe);
  };

  const handleRemoveDiningTime = (index: number) => {
    const newDiningTimes = recipe.dining_times.filter((_, i) => i !== index);
    const newRecipe = {
      ...recipe,
      dining_times: newDiningTimes.length > 0 ? newDiningTimes : [""],
    };
    onRecipeChange(newRecipe);
    validateData(newRecipe);
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number,
  ) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    if (index === recipe.ingredients.length - 1 && value !== "") {
      newIngredients.push({ ingredient: "", amount: 0, unit: "" });
    }
    onRecipeChange({ ...recipe, ingredients: newIngredients });
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    const newRecipe = {
      ...recipe,
      ingredients:
        newIngredients.length > 0
          ? newIngredients
          : [{ ingredient: "", amount: 0, unit: "" }],
    };
    onRecipeChange(newRecipe);
    validateData(newRecipe);
  };

  const handleToolChange = (index: number, value: string) => {
    const newTools = [...recipe.tools];
    newTools[index] = value;
    if (index === recipe.tools.length - 1 && value !== "") {
      newTools.push("");
    }
    onRecipeChange({ ...recipe, tools: newTools });
  };

  const handleRemoveTool = (index: number) => {
    const newTools = recipe.tools.filter((_, i) => i !== index);
    const newRecipe = {
      ...recipe,
      tools: newTools.length > 0 ? newTools : [""],
    };
    onRecipeChange(newRecipe);
    validateData(newRecipe);
  };

  const handleInstructionChange = (
    index: number,
    field: keyof Instruction,
    value: string,
  ) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = { ...newInstructions[index], [field]: value };
    if (index === recipe.instructions.length - 1 && value !== "") {
      newInstructions.push({
        name: "",
        ingredients: [{ ingredient: "", amount: 0, unit: "" }],
        tools: [""],
        instruction: "",
      });
    }
    onRecipeChange({ ...recipe, instructions: newInstructions });
  };

  const handleRemoveInstruction = (index: number) => {
    const newInstructions = recipe.instructions.filter((_, i) => i !== index);
    const newRecipe = {
      ...recipe,
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
    };
    onRecipeChange(newRecipe);
    validateData(newRecipe);
  };

  const handleInstructionIngredientChange = (
    instructionIndex: number,
    ingredientIndex: number,
    field: keyof Ingredient,
    value: string | number,
  ) => {
    const newInstructions = [...recipe.instructions];
    const newIngredients = [...newInstructions[instructionIndex].ingredients];
    newIngredients[ingredientIndex] = {
      ...newIngredients[ingredientIndex],
      [field]: value,
    };
    if (ingredientIndex === newIngredients.length - 1 && value !== "") {
      newIngredients.push({ ingredient: "", amount: 0, unit: "" });
    }
    newInstructions[instructionIndex] = {
      ...newInstructions[instructionIndex],
      ingredients: newIngredients,
    };
    onRecipeChange({ ...recipe, instructions: newInstructions });
  };

  const handleRemoveInstructionIngredient = (
    instructionIndex: number,
    ingredientIndex: number,
  ) => {
    const newInstructions = [...recipe.instructions];
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
    const newRecipe = { ...recipe, instructions: newInstructions };
    onRecipeChange(newRecipe);
    validateData(newRecipe);
  };

  const handleInstructionToolChange = (
    instructionIndex: number,
    toolIndex: number,
    value: string,
  ) => {
    const newInstructions = [...recipe.instructions];
    const newTools = [...newInstructions[instructionIndex].tools];
    newTools[toolIndex] = value;
    if (toolIndex === newTools.length - 1 && value !== "") {
      newTools.push("");
    }
    newInstructions[instructionIndex] = {
      ...newInstructions[instructionIndex],
      tools: newTools,
    };
    onRecipeChange({ ...recipe, instructions: newInstructions });
  };

  const handleRemoveInstructionTool = (
    instructionIndex: number,
    toolIndex: number,
  ) => {
    const newInstructions = [...recipe.instructions];
    const newTools = newInstructions[instructionIndex].tools.filter(
      (_, i) => i !== toolIndex,
    );
    newInstructions[instructionIndex] = {
      ...newInstructions[instructionIndex],
      tools: newTools.length > 0 ? newTools : [""],
    };
    const newRecipe = { ...recipe, instructions: newInstructions };
    onRecipeChange(newRecipe);
    validateData(newRecipe);
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-md" role="form">
      <div className="space-y-4">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={recipe.name ?? ""}
            onChange={handleInputChange}
            onBlur={handleValidate}
            className={`mt-1 block w-full border ${
              errors.name ? "border--500" : "border-gray-300"
            } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.name && typeof errors.name === "string" && (
            <WarningNotification message={errors.name} />
          )}
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Beschreibung:
          </label>
          <textarea
            name="description"
            value={recipe.description ?? ""}
            onChange={handleInputChange}
            onBlur={handleValidate}
            className={`mt-1 h-48 block w-full border ${
              errors.description ? "border--500" : "border-gray-300"
            } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.description && typeof errors.description === "string" && (
            <WarningNotification message={errors.description} />
          )}
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Labels:
          </label>
          {recipe.labels.map((label, index) => (
            <>
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={label}
                  onChange={(e) => handleLabelChange(index, e.target.value)}
                  onBlur={handleValidate}
                  className={`block w-full border ${
                    errors.labels &&
                    typeof errors.labels === "string" &&
                    errors.labels[index]
                      ? "border-amber-500 border-2"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
                />
                <button
                  onClick={() => handleRemoveLabel(index)}
                  className="text-red-500"
                >
                  <MdDeleteOutline className="w-5 h-5" />
                </button>
              </div>
              {errors.labels &&
                errors.labels[index] &&
                typeof errors.labels[index] === "string" && (
                  <WarningNotification message={errors.labels[index]} />
                )}
            </>
          ))}
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Geeignet für:
          </label>
          {recipe.dining_times.map((time, index) => (
            <>
              <div key={index} className="flex space-x-2 mb-2">
                <select
                  name={`dining_time_${index}`}
                  value={time ?? ""}
                  onChange={(e) =>
                    handleDiningTimeChange(index, e.target.value)
                  }
                  onBlur={handleValidate}
                  className={`mt-1 block w-full border ${
                    errors.dining_times && errors.dining_times[index]
                      ? "border-amber-500 border-2"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
                >
                  <option value="">Bitte auswählen</option>
                  <option value="Snack">Snack</option>
                  <option value="Frühstück">Frühstück</option>
                  <option value="Mittagessen">Mittagessen</option>
                  <option value="Abendessen">Abendessen</option>
                </select>
                <button
                  onClick={() => handleRemoveDiningTime(index)}
                  className="text-red-500"
                >
                  <MdDeleteOutline className="w-5 h-5" />
                </button>
              </div>
            </>
          ))}
          {errors.dining_times && typeof errors.dining_times === "string" && (
            <WarningNotification message={errors.dining_times} />
          )}
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Zubereitungszeit:
          </label>
          <input
            type="number"
            name="preparation_time"
            value={recipe.preparation_time ?? 0}
            onChange={handleInputChange}
            onBlur={handleValidate}
            className={`mt-1 block w-full border ${
              errors.preparation_time
                ? "border-amber-500 border-2"
                : "border-gray-300"
            } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.preparation_time && (
            <WarningNotification message={errors.preparation_time} />
          )}
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Warte- bzw. Backzeit:
          </label>
          <input
            type="number"
            name="rest_time"
            value={recipe.rest_time ?? 0}
            onChange={handleInputChange}
            onBlur={handleValidate}
            className={`mt-1 block w-full border ${
              errors.rest_time ? "border-amber-500 border-2" : "border-gray-300"
            } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.rest_time && (
            <WarningNotification message={errors.rest_time} />
          )}
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Zutaten:
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Ingredient"
                  value={ingredient.ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, "ingredient", e.target.value)
                  }
                  onBlur={handleValidate}
                  className={`block w-1/3 border ${
                    errors.ingredients &&
                    errors.ingredients[index] &&
                    errors.ingredients[index].ingredient
                      ? "border-amber-500 border-2"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={ingredient.amount}
                  onChange={(e) =>
                    handleIngredientChange(
                      index,
                      "amount",
                      parseFloat(e.target.value),
                    )
                  }
                  onBlur={handleValidate}
                  className={`block w-1/3 border ${
                    errors.ingredients &&
                    errors.ingredients[index] &&
                    errors.ingredients[index].amount
                      ? "border-amber-500 border-2"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
                  }
                  onBlur={handleValidate}
                  className={`block w-1/3 border ${
                    errors.ingredients &&
                    errors.ingredients[index] &&
                    errors.ingredients[index].unit
                      ? "border-amber-500 border-2"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
                />
                <button
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-red-500"
                >
                  <MdDeleteOutline className="w-5 h-5" />
                </button>
              </div>
              {errors.ingredients &&
                errors.ingredients[index] &&
                errors.ingredients[index].ingredient && (
                  <WarningNotification
                    message={errors.ingredients[index].ingredient}
                  />
                )}
              {errors.ingredients &&
                errors.ingredients[index] &&
                errors.ingredients[index].amount && (
                  <WarningNotification
                    message={errors.ingredients[index].amount}
                  />
                )}
              {errors.ingredients &&
                errors.ingredients[index] &&
                errors.ingredients[index].unit && (
                  <WarningNotification
                    message={errors.ingredients[index].unit}
                  />
                )}
            </div>
          ))}
          {errors.ingredients && typeof errors.ingredients === "string" && (
            <WarningNotification message={errors.ingredients} />
          )}
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Utensilien:
          </label>
          {recipe.tools.map((tool, index) => (
            <>
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={tool}
                  onChange={(e) => handleToolChange(index, e.target.value)}
                  onBlur={handleValidate}
                  className={`block w-full border ${
                    errors.tools && errors.tools[index]
                      ? "border-amber-500 border-2"
                      : "border-gray-300"
                  } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
                />
                <button
                  onClick={() => handleRemoveTool(index)}
                  className="text-red-500"
                >
                  <MdDeleteOutline className="w-5 h-5" />
                </button>
              </div>
              {errors.tools && errors.tools[index] && (
                <WarningNotification message={errors.tools[index]} />
              )}
            </>
          ))}
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Arbeitsschritte:
          </label>
          {recipe.instructions.map((instruction, index) => (
            <div
              key={index}
              className="space-y-2 mb-4 p-4 border border-gray-300 rounded-md shadow-sm"
            >
              <>
                <div className="flex mb-6">
                  <h3 className="text-3xl font-semibold w-1/3 mr-2">
                    Schritt {index + 1}
                  </h3>
                  <input
                    type="text"
                    placeholder="Instruction Name"
                    value={instruction.name}
                    onChange={(e) =>
                      handleInstructionChange(index, "name", e.target.value)
                    }
                    onBlur={handleValidate}
                    className={`block w-full border ${
                      errors.instructions &&
                      errors.instructions[index] &&
                      errors.instructions[index].name
                        ? "border-amber-500 border-2"
                        : "border-gray-300"
                    } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                </div>
                {errors.instructions &&
                  errors.instructions[index] &&
                  errors.instructions[index].name && (
                    <WarningNotification
                      message={errors.instructions[index].name}
                    />
                  )}
              </>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  Zutaten für diesen Arbeitsschritt:
                </label>
                {instruction.ingredients.map((ingredient, ingIndex) => (
                  <>
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
                        onBlur={handleValidate}
                        className={`block w-1/3 border ${
                          errors.instructions &&
                          errors.instructions[index] &&
                          errors.instructions[index].ingredients &&
                          errors.instructions[index].ingredients[ingIndex] &&
                          errors.instructions[index].ingredients[ingIndex]
                            .ingredient
                            ? "border-amber-500 border-2"
                            : "border-gray-300"
                        } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
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
                            parseFloat(e.target.value),
                          )
                        }
                        onBlur={handleValidate}
                        className={`block w-1/3 border ${
                          errors.instructions &&
                          errors.instructions[index] &&
                          errors.instructions[index].ingredients &&
                          errors.instructions[index].ingredients[ingIndex] &&
                          errors.instructions[index].ingredients[ingIndex]
                            .amount
                            ? "border-amber-500 border-2"
                            : "border-gray-300"
                        } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
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
                        onBlur={handleValidate}
                        className={`block w-1/3 border ${
                          errors.instructions &&
                          errors.instructions[index] &&
                          errors.instructions[index].ingredients &&
                          errors.instructions[index].ingredients[ingIndex] &&
                          errors.instructions[index].ingredients[ingIndex].unit
                            ? "border-amber-500 border-2"
                            : "border-gray-300"
                        } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      <button
                        onClick={() =>
                          handleRemoveInstructionIngredient(index, ingIndex)
                        }
                        className="text-red-500"
                      >
                        <MdDeleteOutline className="w-5 h-5" />
                      </button>
                    </div>
                    {errors.instructions &&
                      errors.instructions[index] &&
                      errors.instructions[index].ingredients &&
                      errors.instructions[index].ingredients[ingIndex] &&
                      errors.instructions[index].ingredients[ingIndex]
                        .ingredient && (
                        <WarningNotification
                          message={
                            errors.instructions[index].ingredients[ingIndex]
                              .ingredient
                          }
                        />
                      )}
                    {errors.instructions &&
                      errors.instructions[index] &&
                      errors.instructions[index].ingredients &&
                      errors.instructions[index].ingredients[ingIndex] &&
                      errors.instructions[index].ingredients[ingIndex]
                        .amount && (
                        <WarningNotification
                          message={
                            errors.instructions[index].ingredients[ingIndex]
                              .amount
                          }
                        />
                      )}
                    {errors.instructions &&
                      errors.instructions[index] &&
                      errors.instructions[index].ingredients &&
                      errors.instructions[index].ingredients[ingIndex] &&
                      errors.instructions[index].ingredients[ingIndex].unit && (
                        <WarningNotification
                          message={
                            errors.instructions[index].ingredients[ingIndex]
                              .unit
                          }
                        />
                      )}
                  </>
                ))}
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">
                  Utensilien für diesen Arbeitsschritt:
                </label>
                {instruction.tools.map((tool, toolIndex) => (
                  <>
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
                        onBlur={handleValidate}
                        className={`block w-full border ${
                          errors.instructions &&
                          errors.instructions[index] &&
                          errors.instructions[index].tools &&
                          errors.instructions[index].tools[toolIndex]
                            ? "border-amber-500 border-2"
                            : "border-gray-300"
                        } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      <button
                        onClick={() =>
                          handleRemoveInstructionTool(index, toolIndex)
                        }
                        className="text-red-500"
                      >
                        <MdDeleteOutline className="w-5 h-5" />
                      </button>
                    </div>
                    <>
                      {errors.instructions &&
                        errors.instructions[index] &&
                        errors.instructions[index].tools &&
                        errors.instructions[index].tools[toolIndex] && (
                          <WarningNotification
                            message={
                              errors.instructions[index].tools[toolIndex]
                            }
                          />
                        )}
                    </>
                  </>
                ))}
              </div>
              <label className="block text-base font-medium text-gray-700">
                Anleitung:
              </label>
              <textarea
                placeholder="Instruction Details"
                value={instruction.instruction}
                onChange={(e) =>
                  handleInstructionChange(index, "instruction", e.target.value)
                }
                onBlur={handleValidate}
                className={`block w-full min-h-36 border ${
                  errors.instructions &&
                  errors.instructions[index] &&
                  errors.instructions[index].instruction
                    ? "border-amber-500 border-2"
                    : "border-gray-300"
                } rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.instructions &&
                errors.instructions[index] &&
                errors.instructions[index].instruction && (
                  <WarningNotification
                    message={errors.instructions[index].instruction}
                  />
                )}
              <button
                onClick={() => handleRemoveInstruction(index)}
                className="text-red-500"
              >
                Arbeitsschritt entfernen
              </button>
              {errors.instructions &&
                typeof errors.instructions !== "string" &&
                errors.instructions[index] &&
                typeof errors.instructions[index] === "string" && (
                  <WarningNotification message={errors.instructions[index]} />
                )}
            </div>
          ))}
          {errors.instructions && typeof errors.instructions === "string" && (
            <WarningNotification message={errors.instructions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditRecipeDisplay;
