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
    <header className="bg-cyan-100 text-white py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo512.png" alt="Logo" className="h-8 w-8" />
          <nav className="ml-4 space-x-4 hidden md:block">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-cyan-950 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden xxs:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-cyan-50 text-white px-3 py-2 rounded-md focus:outline-cyan-500"
            />
            <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-950" />
          </div>
        </div>
        <div className="md:hidden">
          <CiMenuBurger
            className="text-cyan-950 w-6 h-6 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
      </div>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="mt-6 md:hidden divide-y divide-cyan-500">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block text-cyan-950 hover:text-white pl-2 py-3"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
