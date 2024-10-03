"use client";

import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaSpinner } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { getCSRFToken } from "@/utils/cookieUtils";

interface RecipeLikesProps {
  className?: string;
  url: string;
}

const RecipeLikes: React.FC<RecipeLikesProps> = ({ className, url }) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/recipe/likes/${url}/`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Likes");
        }

        const data = await response.json();
        setLikes(data.total_likes);

        if (isAuthenticated && data.is_liked !== undefined) {
          setLiked(data.is_liked);
        } else {
          setLiked(checkIfLikedByLocalStorage());
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Likes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [url, isAuthenticated]);

  const checkIfLikedByLocalStorage = () => {
    return localStorage.getItem(`liked_${url}`) === "true";
  };

  const handleLike = async () => {
    try {
      const newLikedStatus = !liked;
      setLiked(newLikedStatus);
      setLikes(newLikedStatus ? likes + 1 : likes - 1);

      if (isAuthenticated) {
        await sendLikeToServer(newLikedStatus);
      } else {
        localStorage.setItem(`liked_${url}`, newLikedStatus.toString()); // TODO
        await sendLikeToServer(newLikedStatus);
      }
    } catch (error) {
      console.error("Fehler beim Setzen des Likes:", error);
    }
  };

  const sendLikeToServer = async (newLikedStatus: boolean) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/recipes/recipe/likes/${url}/`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          liked: newLikedStatus,
        }),
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
      },
    );

    if (!response.ok) {
      throw new Error("Fehler beim Senden des Likes");
    }
  };

  return (
    <div className="flex justify-center items-center cursor-pointer space-x-1.5 group">
      <button
        onClick={handleLike}
        className={`focus:outline-none flex items-center space-x-1 rounded-full px-2 py-1 ${className}`}
      >
        {liked ? (
          <FaHeart className="text-red-600 w-6 h-6 group-hover:scale-110" />
        ) : (
          <FaRegHeart className="text-red-600 w-6 h-6 group-hover:scale-110" />
        )}
        {loading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <span className="text-cyan-950 text-lg font-bold">{likes}</span>
        )}
      </button>
    </div>
  );
};

export default RecipeLikes;
