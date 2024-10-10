"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import { RecipePreview } from "../../../types/recipeTypes";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  closeMenu: () => void;
  setFocus?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
  closeMenu,
  setFocus = false,
}) => {
  const [searchQuery, setsearchQuery] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("Rezepte durchsuchen");
  const [suggestions, setSuggestions] = useState<RecipePreview[]>([]);
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const fetchSuggestions = useCallback(async () => {
    if (searchQuery) {
      try {
        const response = await fetch(
          `${apiUrl}/recipes/recipe/search/?query=${searchQuery}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  }, [apiUrl, searchQuery]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [fetchSuggestions]);

  useEffect(() => {
    setSelectedItem(-1);
  }, [suggestions]);

  useEffect(() => {
    if (setFocus && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, setFocus]);

  const handleLinkClick = (suggestionName: string) => {
    closeMenu();
    setsearchQuery("");
    setPlaceholder(suggestionName);
    setSuggestions([]);
    setSelectedItem(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedItem((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedItem((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      if (selectedItem >= 0 && suggestions[selectedItem]) {
        e.preventDefault();
        handleLinkClick(suggestions[selectedItem].name);
        router.push(`/rezept/${suggestions[selectedItem].url}`);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full px-1">
      <input
        type="text"
        ref={inputRef}
        value={searchQuery}
        onChange={(e) => setsearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="bg-cyan-50 text-black pl-3 pr-8 py-2 rounded-md w-full outline-none focus:ring-2 focus:ring-cyan-500 hover:ring-2 hover:ring-cyan-500 transition-all"
      />
      <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-950 cursor-pointer" />

      {suggestions.length > 0 && (
        <div className="absolute bg-cyan-50 shadow-lg rounded-md mt-2 max-h-[400px] overflow-y-auto w-full z-50">
          {suggestions.map((suggestion, index) => (
            <Link
              href={`/rezept/${suggestion.url}`}
              onClick={() => handleLinkClick(suggestion.name)}
              key={suggestion.url}
              className={`flex items-center p-2 transition-all ${
                selectedItem === index ? "bg-cyan-100" : "hover:bg-cyan-100"
              }`}
            >
              {suggestion.thumbnail ? (
                <Image
                  src={apiUrl + suggestion.thumbnail}
                  alt={suggestion.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-md object-cover mr-3"
                />
              ) : (
                <div className="w-12 h-12 rounded-md bg-gray-200 mr-3" />
              )}
              <div className="flex flex-col">
                <span className="font-bold text-black">{suggestion.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
