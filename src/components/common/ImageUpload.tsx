import axios from "axios";
import React, { useState } from "react";
import { FaSpinner, FaImage } from "react-icons/fa";

interface ImageUploadProps {
  setImageUrl: (url: string) => void;
  uploadUrl: string;
}

const imageUpload: React.FC<ImageUploadProps> = ({
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

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${uploadUrl}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        const imageUrl = response.data.optimized_image_url;
        setImageUrl(imageUrl);
        setUploading(false);
      }
    } catch (error) {
      console.error("Fehler beim Upload des Bildes", error);
      setError("Fehler beim Upload des Bildes");
      setUploading(false);
    }
  };

  return (
    <div>
      <label htmlFor="image-upload">
        {!uploading && (
          <FaImage className="w-14 h-14 text-zinc-800 hover:text-zinc-500 cursor-pointer" />
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
      {uploading && <FaSpinner className="w-14 h-14 animate-spin" />}
      {error && <p>{error}</p>}
    </div>
  );
};

export default imageUpload;
