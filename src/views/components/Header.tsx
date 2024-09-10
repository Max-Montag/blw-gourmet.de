import React, { useState } from "react";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "Stöbern", path: "/stoebern" },
  { label: "Was ist BLW?", path: "/was-ist-blw" },
  { label: "Tipps für den Beikoststart", path: "/tipps-beikoststart" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo512.png" alt="Logo" className="h-8 w-8" />
          <nav className="ml-4 space-x-4 hidden md:block">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center">
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-white px-3 py-2 rounded-md"
            />
            <CiSearch className="text-gray-300 ml-2" />
          </div>
          <div className="md:hidden">
            <CiMenuBurger
              className="text-gray-300 cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block text-gray-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
