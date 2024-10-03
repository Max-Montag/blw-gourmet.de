"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaXTwitter, FaWhatsapp, FaShareFromSquare } from "react-icons/fa6";
import { IoCloseOutline, IoMailOutline } from "react-icons/io5";

interface SharePopUpProps {
  className?: string;
  url: string;
  shareText: string;
  socialText?: string;
}

const SharePopUp: React.FC<SharePopUpProps> = ({
  url,
  shareText = "Teilen",
  socialText = "Schau dir das mal an: ",
  className = "",
}) => {
  url = process.env.NEXT_PUBLIC_BASE_URL + "/" + url;
  const [isOpen, setIsOpen] = useState(false);

  const toggleShareMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`flex justify-center items-center rounded-full p-1 text-cyan-950 cursor-pointer group ${className}`}
      >
        <FaShareFromSquare
          className="w-6 h-6 group-hover:scale-110"
          onClick={toggleShareMenu}
        />
      </div>

      {isOpen && (
        <div className="fixed -inset-10 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative mr-5 w-9/12 sm:w-5/12 md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={toggleShareMenu}
            >
              <IoCloseOutline />
            </button>
            <h3 className="mt-4 mb-2 text-lg font-semibold">{shareText} </h3>
            <input
              type="text"
              value={url}
              className="w-full mb-4 p-2 bg-zinc-100 rounded-md"
              onClick={(e) => e.currentTarget.select()}
            />
            <div className="w-full flex justify-center space-x-4">
              <Link
                href={`mailto:?subject=${encodeURIComponent(socialText)}&body=${encodeURIComponent(url)}`}
              >
                <IoMailOutline className="cursor-pointer text-xl sm:w-8 sm:h-8" />
              </Link>
              <Link
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(socialText + " " + url)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="cursor-pointer text-xl sm:w-8 sm:h-8" />
              </Link>
              <Link
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(socialText)}&url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="cursor-pointer text-xl sm:w-8 sm:h-8" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SharePopUp;
