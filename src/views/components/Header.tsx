import React, { useState } from "react";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const menuItems = [
  { label: "Rezepte durchstöbern", path: "/stoebern" },
  { label: "Was ist BLW?", path: "/was-ist-blw" },
  { label: "Tipps für den Beikoststart", path: "/tipps-beikoststart" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // TODO!!!!!
  const [isAuthenticated, setIsAuthenticated] = useState(true); // TODO!!!!!

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-cyan-100 text-white py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo512.png" alt="Logo" className="h-8 w-8" />
          <nav className="ml-4 divide-x divide-cyan-600 hidden lg:block">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-cyan-950 text-lg xl:text-xl font-semibold hover:text-white px-3"
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
        <div
          onClick={toggleMenu}
          className="text-cyan-950 cursor-pointer"
        >
          <CiMenuBurger className="block lg:hidden w-6 h-6" />
          <FaRegUserCircle className="hidden lg:block w-7 h-7" />
        </div>
      </div>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="mt-6 lg:hidden divide-y divide-cyan-600">
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
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
           isMenuOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="mt-6 divide-y divide-cyan-600">
         {isAuthenticated ? (
            <Link
              to="/profile"
              className="block text-cyan-950 hover:text-white pl-2 py-3"
            >
              Mein Profil
            </Link>
          ) : (
            <Link
              to="/login"
              className="block text-cyan-950 hover:text-white pl-2 py-3"
            >
              Anmelden
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="block text-cyan-950 hover:text-white pl-2 py-3"
            >
              Admin-Bereich
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/logout"
              className="block text-cyan-950 hover:text-white pl-2 py-3"
            >
              Abmelden
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
