"use client";

import React, { useState } from "react";
import { FaSpinner, FaImage } from "react-icons/fa";
import { getCSRFToken } from "@/utils/cookieUtils";

interface ImageUploadProps {
  setImageUrl: (url: string) => void;
  uploadUrl: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  setImageUrl,
  uploadUrl,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const csrf_token = await getCSRFToken();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${uploadUrl}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
          headers: {
            "X-CSRFToken": csrf_token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.optimized_image_url;
        setImageUrl(imageUrl);
        setUploading(false);
      } else {
        throw new Error("Hochladen fehlgeschlagen");
      }
    } catch (error) {
      console.error("Fehler beim Upload des Bildes:", error);
      setError("Fehler beim Upload des Bildes");
      setUploading(false);
    }
  };

  return (
    <div>
      <label htmlFor="image-upload">
        {!uploading && (
          <FaImage className="w-10 h-10 md:w-14 md:h-14 text-zinc-800 hover:text-zinc-500 cursor-pointer" />
        )}
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={uploading}
        className="hidden"
      />
      {uploading && (
        <FaSpinner className="w-10 h-10 md:w-14 md:h-14 animate-spin" />
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ImageUpload;
