"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import set from "lodash/set";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { TbWorldUp, TbWorldOff } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { RecipeData } from "@/types/recipeTypes";
import { RecipeError } from "@/types/errorTypes";
import EditRecipeDisplay from "@/components/recipe/EditRecipeDisplay";
import RecipeDisplay from "@/components/recipe/RecipeDisplay";
import { ensureEmptyFields } from "@/utils/recipeUtils";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import ErrorMessage from "@/components/error/ErrorMessage";
import ImageUpload from "@/components/common/ImageUpload";
import ConfirmModal from "@/components/common/ConfirmModal";
import { recipeValidationSchema } from "@/utils/validationSchemas/recipeValidationSchema";

interface EditRecipeProps {
  params: {
    url: string;
  };
}

const EditRecipe: React.FC<EditRecipeProps> = ({ params }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { url } = params;
  const router = useRouter();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [validData, setValidData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [savingPrivate, setSavingPrivate] = useState<boolean>(false);
  const [savingPublic, setSavingPublic] = useState<boolean>(false);
  const saving = () => {
    return savingPrivate || savingPublic;
  };
  const [error, setError] = useState<string | null>(null);
  const [recipeErrors, setRecipeErrors] = useState<RecipeError>({});
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleValidate = useCallback(async (newRecipe: RecipeData) => {
    try {
      await recipeValidationSchema.validate(newRecipe, {
        abortEarly: false,
      });
      setRecipeErrors({});
      setValidData(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages: RecipeError = {};
        err.inner.forEach((error: Yup.ValidationError) => {
          if (error.path) {
            set(errorMessages, error.path, error.message);
          }
        });
        setRecipeErrors(errorMessages);
        setValidData(false);
      }
    }
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<RecipeData>(
          `${apiUrl}/recipes/recipe/recipe-detail/${url}/`,
        );
        const loadedRecipe = ensureEmptyFields(response.data);
        setRecipe(loadedRecipe);
        handleValidate(loadedRecipe);
        setLoading(false);
      } catch (err) {
        setError("Fehler beim Abrufen vom Server.");
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [url, apiUrl, handleValidate]);

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const publish = e.currentTarget.getAttribute("data-action") === "publish";

    if (!recipe || saving() === true) {
      return;
    }

    if (publish) {
      await handleValidate(recipe);

      if (!validData) {
        return;
      }
      setSavingPublic(true);
    } else {
      setSavingPrivate(true);
    }

    try {
      const validDiningTimes = [
        "Frühstück",
        "Mittagessen",
        "Abendessen",
        "Snack",
      ];
      const filteredData = {
        ...recipe,
        dining_times: recipe.dining_times.filter((time) =>
          validDiningTimes.includes(time),
        ),
        published: publish,
        labels: recipe.labels.filter((label) => label !== ""),
        ingredients: recipe.ingredients.filter(
          (ingredient) =>
            ingredient.ingredient !== "" ||
            ingredient.amount !== 0 ||
            ingredient.unit !== "",
        ),
        tools: recipe.tools.filter((tool) => tool !== ""),
        instructions: recipe.instructions.map((instruction) => ({
          ...instruction,
          ingredients: instruction.ingredients.filter(
            (ingredient) =>
              ingredient.ingredient !== "" ||
              ingredient.amount !== 0 ||
              ingredient.unit !== "",
          ),
          tools: instruction.tools.filter((tool) => tool !== ""),
        })),
      };

      const response = await axios.put(
        `${apiUrl}/recipes/recipe/update/${url}/`,
        JSON.stringify(filteredData),
      );

      if (response.status === 200) {
        router.push(`/admin/dashboard/`);
      }
    } catch (error) {
      console.error("Es ist ein Fehler aufgetreten:", error);
      alert("Fehler beim Speichern!");
    } finally {
      setSavingPublic(false);
      setSavingPrivate(false);
    }
  };

  const setImageUrl = (url: string) => {
    if (!recipe) {
      return;
    }
    setRecipe({ ...recipe, optimized_image: url });
  };

  const handleDeleteRecipe = async () => {
    if (!recipe) {
      return;
    }

    try {
      await axios.delete(`${apiUrl}/recipes/recipe/delete/${url}/`);
      router.push("/admin/dashboard/");
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
      alert("Fehler beim Löschen!");
    }
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const updatedRecipe = ensureEmptyFields(JSON.parse(e.target.value));
      const imageUrl = recipe?.optimized_image;
      if (imageUrl) {
        updatedRecipe.optimized_image = imageUrl;
      }
      setRecipe(updatedRecipe);
      handleValidate(updatedRecipe);
    } catch (error) {
      console.error("Ungültiges JSON-Format", error);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.select();
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <LoadingAnimation />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!recipe) {
    return <ErrorMessage message="Rezept nicht gefunden!" />;
  }

  const navButtons = (
    <div className="flex justify-evenly my-8 space-x-4">
      <button onClick={() => router.push("/admin/dashboard/")}>
        <IoArrowBack className="w-14 h-14 text-zinc-800 hover:text-zinc-500 cursor-pointer" />
      </button>
      <button data-action="unpublish" onClick={handleUpload}>
        {savingPrivate ? (
          <FaSpinner className="w-14 h-14 text-zinc-800 animate-spin" />
        ) : (
          <TbWorldOff className="w-14 h-14 text-zinc-800 hover:text-zinc-500 cursor-pointer" />
        )}
      </button>
      <button
        data-action="publish"
        onClick={handleUpload}
        disabled={saving() === true || !validData}
      >
        {savingPublic ? (
          <FaSpinner className="w-14 h-14 text-zinc-800 animate-spin" />
        ) : validData ? (
          <TbWorldUp className="w-14 h-14 text-zinc-800 hover:text-zinc-500 cursor-pointer" />
        ) : (
          <TbWorldUp className="w-14 h-14 text-zinc-300 cursor-not-allowed" />
        )}
      </button>
      <button>
        <ImageUpload
          setImageUrl={setImageUrl}
          uploadUrl={`/recipes/recipe/upload-image/${url}/`}
        />
      </button>
      <button onClick={() => setShowDeleteModal(true)}>
        <MdDelete className="w-14 h-14 text-zinc-800 hover:text-zinc-500 cursor-pointer" />
      </button>
    </div>
  );

  return (
    <div className="relative w-full mx-auto lg:p-6 bg-white shadow-md rounded-md">
      <div className="w-full flex flex-col lg:flex-row space-x-0 lg:space-x-4">
        <div className="w-full lg:w-1/2">
          {navButtons}
          <EditRecipeDisplay
            recipe={recipe}
            onRecipeChange={setRecipe}
            validateData={() => handleValidate(recipe)}
            errors={recipeErrors}
          />
          {navButtons}
        </div>
        <div className="w-full lg:w-1/2 flex flex-col flex-grow">
          <div className="min-h-48">
            <RecipeDisplay recipe={recipe} />
          </div>
          <div className="flex-grow mt-4">
            <textarea
              value={JSON.stringify(recipe, null, 2)}
              onChange={handleJsonChange}
              onFocus={handleFocus}
              className="w-full h-full min-h-[600px] p-2 bg-zinc-50 rounded-md text-sm"
            />
          </div>
        </div>
      </div>
      <ConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteRecipe}
        text="Bist du sicher, dass du dieses Rezept löschen möchtest?"
      />
    </div>
  );
};

export default EditRecipe;
