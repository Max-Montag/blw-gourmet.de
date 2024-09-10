import React from 'react';
import { CiSearch } from 'react-icons/ci';

const SearchBar: React.FC = () => {
  return (
    <div className="relative">
    <input
      type="text"
      placeholder="Search"
      className="bg-cyan-50 text-white px-3 py-2 rounded-md focus:outline-cyan-500"
    />
    <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-950" />
  </div>
  );
};

export default SearchBar;