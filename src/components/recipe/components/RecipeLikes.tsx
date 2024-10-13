"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { getCSRFToken } from "@/utils/cookieUtils";

interface RecipeLikesProps {
  className?: string;
  url: string;
}

const RecipeLikes: React.FC<RecipeLikesProps> = ({ className, url }) => {
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const { optional } = useCookieConsent();
  const [loading, setLoading] = useState<boolean>(true);
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  const checkIfLikedByLocalStorage = useCallback(() => {
    return localStorage.getItem(`liked_${url}`) === "true";
  }, [url]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (
        !url ||
        isAuthenticated === undefined ||
        checkIfLikedByLocalStorage === undefined
      )
        return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/recipe/likes/${url}/`,
          {
            method: "GET",
            credentials: "include",
          }
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
        setLikes(0);
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [url, isAuthenticated, checkIfLikedByLocalStorage]);

  const handleLike = async () => {
    try {
      const changeLikeStatus = async () => {
        const newLikedStatus = !liked;
        setLiked(newLikedStatus);
        setLikes(newLikedStatus ? likes + 1 : likes - 1);
        return newLikedStatus;
      };

      if (isAuthenticated) {
        const newLikedStatus = await changeLikeStatus();
        await sendLikeToServer(newLikedStatus);
      } else if (optional) {
        const newLikedStatus = await changeLikeStatus();
        if (newLikedStatus) {
          showNotification(
            "Da du nicht angemeldet bist, speichern wir deine Lieblingsrezepte in deinem Browser. Denke darüber nach, dich zu anzumelden oder zu registrieren, um sie auch auf anderen Geräten zu sehen.",
            "info",
            8000
          );
        }
        localStorage.setItem(`liked_${url}`, newLikedStatus.toString());
        await sendLikeToServer(newLikedStatus);
      } else {
        showNotification(
          "Bitte melde dich an, um deine Lieblingsrezepte geräteübergreifend zu speichern oder akzeptiere optionale Cookies, um sie in deinem Browser zu speichern.",
          "error",
          8000
        );
      }
    } catch (error) {
      console.error("Fehler beim Setzen des Likes:", error);
    }
  };

  const sendLikeToServer = async (newLikedStatus: boolean) => {
    const csrf_token = await getCSRFToken();

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
          "X-CSRFToken": csrf_token,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Fehler beim Senden des Likes");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center cursor-pointer group">
        <button
          onClick={handleLike}
          className={`focus:outline-none w-fit flex justify-center items-center space-x-2.5 rounded-full px-2 py-1 ${className}`}
        >
          {liked ? (
            <FaHeart className="text-red-600 w-6 h-6 group-hover:scale-110" />
          ) : (
            <FaRegHeart className="text-red-600 w-6 h-6 group-hover:scale-110" />
          )}
          {!loading && (
            <span className="text-cyan-950 text-lg font-bold">{likes}</span>
          )}
        </button>
      </div>
    </>
  );
};

export default RecipeLikes;
