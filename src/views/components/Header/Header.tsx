import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const menuItems = [
  { label: "Rezepte durchstöbern", path: "/rezepte/" },
  { label: "Was ist BLW?", path: "/was-ist-blw/" },
  { label: "Tipps für den Beikoststart", path: "/tipps-beikoststart/" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // TODO context!!!!
  const [isAuthenticated, setIsAuthenticated] = useState(true); // TODO context!!!!

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-cyan-100 text-white py-4 px-6 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo512.png" alt="Logo" className="h-8 w-8" />
          <nav className="ml-4 divide-x divide-cyan-600 hidden lg:block">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-cyan-950 text-lg xl:text-xl font-semibold hover:text-cyan-700 px-3"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden xxs:block">
          <SearchBar />
        </div>
        <div onClick={toggleMenu} className="text-cyan-950 cursor-pointer">
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
          <div className="block xxs:hidden pb-4">
            <SearchBar />
          </div>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={toggleMenu}
              className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
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
        <div className="mt-6 divide-y divide-cyan-600" onClick={toggleMenu}>
          {isAuthenticated ? (
            <Link
              to="/user/dashboard"
              className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
            >
              Meine Rezepte
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
              >
                Anmelden
              </Link>
              <Link
                to="/register"
                className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
              >
                Registrieren
              </Link>
            </>
          )}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin/dashboard"
              className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
            >
              Admin-Bereich
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/logout"
              className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
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
