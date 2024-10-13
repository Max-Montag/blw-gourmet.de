"use client";

import React, { useState, useEffect } from "react";
import { RecipeComment } from "@/types/recipeTypes";
import { useAuth } from "@/context/AuthContext";
import { getCSRFToken } from "@/utils/cookieUtils";
import { formatDate } from "@/utils/dateUtils";
import WarningNotification from "@/components/common/WarningNotification";
import { useNotification } from "@/context/NotificationContext";
import Link from "next/link";

interface RecipeCommentsProps {
  url: string;
}

const RecipeComments: React.FC<RecipeCommentsProps> = ({ url }) => {
  const { isAuthenticated, username } = useAuth();
  const { showNotification } = useNotification();
  const [comments, setComments] = useState<RecipeComment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      if (!url || !showNotification) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/recipe/comments/${url}/`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Kommentare");
        }

        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        showNotification("Fehler beim Laden der Kommentare", "error", 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [url, showNotification]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const csrf_token = await getCSRFToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/recipe/comments/${url}/`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ content: newComment }),
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf_token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Fehler beim Hinzufügen des Kommentars");
      }

      const newCommentData = await response.json();
      setComments([newCommentData, ...comments]);
      setNewComment("");
    } catch (error) {
      showNotification("Fehler beim Hinzufügen des Kommentars", "error", 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setLoading(true);
    try {
      const csrf_token = await getCSRFToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/recipe/comments/delete/${commentId}/`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "X-CSRFToken": csrf_token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Fehler beim Löschen des Kommentars");
      }

      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      showNotification("Fehler beim Löschen des Kommentars", "error", 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="w-full mt-8">
      {loading ? (
        <h3 className="text-xl font-bold text-cyan-950 mb-4">
          Kommentare werden geladen
        </h3>
      ) : (
        <>
          <h3 className="text-xl font-bold text-cyan-950 mb-8">Kommentare</h3>
          {comments && Array.isArray(comments) && comments.length > 0 && (
            <ul className="space-y-4">
              {comments.map((comment, index) => (
                <li key={index} className="bg-cyan-50 p-4 rounded-lg shadow-md">
                  {comment &&
                    comment.author &&
                    comment.content &&
                    comment.created_at && (
                      <div className="">
                        <div className="flex flex-wrap items-center justify-between">
                          <p className="text-cyan-950 font-semibold">
                            {comment.author}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(comment.created_at)}
                          </p>
                        </div>
                        <p className="max-w-screen mt-4 break-all">
                          {comment.content}
                        </p>
                      </div>
                    )}
                  {isAuthenticated && comment.author === username && (
                    <button
                      className="mt-2 text-red-600 text-sm"
                      onClick={() => {
                        comment.id ? handleDeleteComment(comment.id) : null;
                      }}
                    >
                      Kommentar löschen
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          {isAuthenticated ? (
            <div className="mt-6">
              <textarea
                className="border border-gray-300 p-2 rounded-lg w-full min-h-[100px] resize-none"
                value={newComment}
                onChange={handleInputChange}
                placeholder="Hinterlasse einen Kommentar..."
              />
              {newComment.trim().length > 500 && (
                <WarningNotification message="Kommentare dürfen maximal 500 Zeichen lang sein" />
              )}
              <button
                className="mt-4 bg-cyan-100 text-cyan-950 font-semibold px-4 py-2 rounded-lg hover:transform hover:scale-105 transition duration-100"
                onClick={handleAddComment}
                disabled={loading}
              >
                Kommentar hinzufügen
              </button>
            </div>
          ) : (
            <p className="mt-6 text-cyan-950">
              <span>Bitte </span>
              <Link href="/login" className="text-cyan-600 hover:text-cyan-500">
                melde dich an
              </Link>
              <span>, um einen Kommentar zu hinterlassen.</span>
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeComments;
