import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { Link } from "react-router-dom";
import { RecipePreview } from "../../../types/recipeTypes";

const SearchBar: React.FC = () => {
  const [searchQuery, setsearchQuery] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("Rezepte durchsuchen");
  const [suggestions, setSuggestions] = useState<RecipePreview[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery) {
        try {
          const response = await axios.get(`${apiUrl}/recipe/search/`, {
            params: { query: searchQuery },
          });
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceSearch = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [searchQuery]);

  const handleLinkClick = (suggestionName: string) => {
    setsearchQuery("");
    setPlaceholder(suggestionName);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setsearchQuery(e.target.value)}
        placeholder={placeholder}
        className="bg-cyan-50 text-black pl-3 pr-8 py-2 rounded-md w-full focus:outline-cyan-500"
      />
      <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-950 cursor-pointer" />

      {suggestions.length > 0 && (
        <div className="absolute z-10 bg-white shadow-lg rounded-md w-full mt-2 max-h-64 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <Link
              to={`/recipe/${suggestion.url}`}
              onClick={() => handleLinkClick(suggestion.name)}
              key={suggestion.url}
              className="flex items-center p-2 hover:bg-cyan-100 transition-all"
            >
              {suggestion.thumbnail ? (
                <img
                  src={apiUrl + suggestion.thumbnail}
                  alt={suggestion.name}
                  className="w-12 h-12 rounded-md object-cover mr-3"
                />
              ) : (
                <div className="w-12 h-12 rounded-md bg-gray-200 mr-3" />
              )}
              <div className="flex flex-col">
                <span className="font-bold text-black">{suggestion.name}</span>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {suggestion.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
