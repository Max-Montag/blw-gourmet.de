"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCSRFToken } from "@/utils/cookieUtils";
import Confirmodal from "@/components/common/ConfirmModal";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import ErrorMessage from "@/components/error/ErrorMessage";
import EditRecipeList from "@/components/recipe/EditRecipeList";
import { AdminRecipePreview } from "@/types/recipeTypes";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";

const MyRecipesPage: React.FC = () => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [recipes, setRecipes] = useState<AdminRecipePreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [showDeleteRecipeModal, setShowDeleteRecipeModal] =
    useState<boolean>(false);
  const [selectedRecipeUrl, setSelectedRecipeUrl] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await fetch(`${apiUrl}/recipes/accessible-recipes/`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Fehler beim Laden deiner Rezepte.");
        }

        const data = await response.json();
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError("Fehler beim Laden deiner Rezepte.");
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchMyRecipes();
    }
  }, [apiUrl, isAuthenticated]);

  const handleAddRecipe = async () => {
    try {
      const csrf_token = await getCSRFToken();

      const response = await fetch(`${apiUrl}/recipes/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf_token,
        },
        credentials: "include",
        body: JSON.stringify({}),
      });

      if (response.status === 201) {
        const data = await response.json();
        router.push(
          `/mein-bereich/meine-rezepte/rezept-bearbeiten/${data.recipe_url}`,
        );
      }
    } catch (error) {
      console.error("Fehler beim Anlegen!", error);
      showNotification("Fehler beim Anlegen!", "error");
    }
  };

  const handleDeleteRecipe = async () => {
    if (selectedRecipeUrl) {
      try {
        const csrf_token = await getCSRFToken();

        await fetch(`${apiUrl}/recipes/recipe/delete/${selectedRecipeUrl}/`, {
          method: "DELETE",
          headers: {
            "X-CSRFToken": csrf_token,
          },
          credentials: "include",
        });
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.url !== selectedRecipeUrl),
        );
        setShowDeleteRecipeModal(false);
        setSelectedRecipeUrl(null);
      } catch (err) {
        console.error("Fehler beim Löschen!", error);
        showNotification("Fehler beim Löschen!", "error");
        setShowDeleteRecipeModal(false);
        setSelectedRecipeUrl(null);
      }
    }
  };

  const handlePublishRecipe = async (
    newStatus: boolean,
    recipeUrl?: string | null,
  ) => {
    recipeUrl = recipeUrl || selectedRecipeUrl;
    setShowPublishModal(false);
    if (recipeUrl) {
      try {
        const csrf_token = await getCSRFToken();

        const response = await fetch(
          `${apiUrl}/recipes/recipe/publish/${recipeUrl}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrf_token,
            },
            body: JSON.stringify({ is_published: newStatus }),
            credentials: "include",
          },
        );
        alert(response.status);
        if (response.status === 400) {
          throw new Error(
            "Bitte behebe vor der Veröffentlichung die Fehler im Rezept.",
          );
        } else if (response.status !== 200) {
          throw new Error("Fehler beim Veröffentlichen.");
        }

        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.url === recipeUrl
              ? { ...recipe, published: newStatus }
              : recipe,
          ),
        );
      } catch (err) {
        console.error(err);
        showNotification(
          err instanceof Error ? err.message : "Fehler beim Veröffentlichen.",
          "error",
        );
      }
    }

    if (selectedRecipeUrl) {
      setSelectedRecipeUrl(null);
    }
  };

  const openDeleteRecipeModal = (recipeUrl: string) => {
    setSelectedRecipeUrl(recipeUrl);
    setShowDeleteRecipeModal(true);
  };

  const openPublishModal = (recipeUrl: string) => {
    setSelectedRecipeUrl(recipeUrl);
    setShowPublishModal(true);
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <LoadingAnimation />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <ErrorMessage message="Fehlende Berechtigung. Bitte meld dich an." />
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4 pl-2 md:pl-0">Meine Rezepte</h2>
      <EditRecipeList
        recipes={recipes}
        apiUrl={apiUrl}
        handleAddRecipe={handleAddRecipe}
        openDeleteRecipeModal={openDeleteRecipeModal}
        openPublishModal={openPublishModal}
        handleUnpublishRecipe={(url) => {
          handlePublishRecipe(false, url);
        }}
      />
      <Confirmodal
        show={showDeleteRecipeModal}
        onClose={() => setShowDeleteRecipeModal(false)}
        onConfirm={handleDeleteRecipe}
        text="Bist du sicher, dass du dieses Rezept löschen möchtest?"
      />
      <Confirmodal
        show={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onConfirm={() => {
          handlePublishRecipe(true);
        }}
        text="Bist du sicher, dass du dieses Rezept veröffentlichen möchtest?"
        buttonText="Veröffentlichen"
      />
    </div>
  );
};

export default MyRecipesPage;
