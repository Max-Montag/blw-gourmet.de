import React, { useState, useEffect, useRef } from "react";
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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMenuOpen) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      ref={headerRef}
      className={`fixed h-16 w-full top-0 left-0 bg-cyan-100 py-4 z-10 shadow-sm transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-cyan-950 cursor-pointer"
          >
            <img src="/logo512.png" alt="Logo" className="h-8 w-8" />
          </Link>
          <nav className="ml-4 divide-x divide-cyan-600 hidden lg:block">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className="text-cyan-950 text-lg xl:text-xl font-semibold hover:text-cyan-700 px-3"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden xxs:block">
          <SearchBar closeMenu={closeMenu} />
        </div>
        <div onClick={toggleMenu} className="text-cyan-950 cursor-pointer">
          <CiMenuBurger className="block lg:hidden w-6 h-6" />
          <FaRegUserCircle className="hidden lg:block w-7 h-7" />
        </div>
      </div>
      <div className="bg-cyan-100">
        <div
          className={`bg-cyan-100 transition-max-height duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-56" : "max-h-0"
          }`}
        >
          <div className="mt-6 lg:hidden divide-y divide-cyan-600">
            <div className="xxs:hidden pb-4">
              <SearchBar closeMenu={closeMenu} />
            </div>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          className={`bg-cyan-100 transition-max-height duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-48" : "max-h-0"
          }`}
          onClick={closeMenu}
        >
          <div className="mt-6 divide-y divide-cyan-600">
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
      </div>
    </header>
  );
};

export default Header;
