"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { RecipePreview } from "../../../types/recipeTypes";

type SearchBarProps = {
  closeMenu: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ closeMenu }) => {
  const [searchQuery, setsearchQuery] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("Rezepte durchsuchen");
  const [suggestions, setSuggestions] = useState<RecipePreview[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchSuggestions = useCallback(async () => {
    if (searchQuery) {
      try {
        const response = await axios.get(`${apiUrl}/recipes/recipe/search/`, {
          params: { query: searchQuery },
        });
        setSuggestions(response.data);
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

  const handleLinkClick = (suggestionName: string) => {
    closeMenu();
    setsearchQuery("");
    setPlaceholder(suggestionName);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full px-1">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setsearchQuery(e.target.value)}
        placeholder={placeholder}
        className="bg-cyan-50 text-black pl-3 pr-8 py-2 rounded-md w-full outline-none focus:ring-2 focus:ring-cyan-500 hover:ring-2 hover:ring-cyan-500 transition-all"
      />
      <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-950 cursor-pointer" />

      {suggestions.length > 0 && (
        <div className="absolute bg-cyan-50 shadow-lg rounded-md mt-2 max-h-[400px] overflow-y-auto w-full">
          {suggestions.map((suggestion) => (
            <Link
              href={`/rezept/${suggestion.url}`}
              onClick={() => handleLinkClick(suggestion.name)}
              key={suggestion.url}
              className="flex items-center p-2 hover:bg-cyan-100 transition-all"
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
