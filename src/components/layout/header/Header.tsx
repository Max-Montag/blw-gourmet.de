"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiMenuBurger } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import SearchBar from "./SearchBar";

const menuItems = [
  { label: "Rezepte durchstöbern", path: "/rezepte/" },
  { label: "Was ist BLW?", path: "/was-ist-blw/" },
  { label: "Tipps für den Beikoststart", path: "/artikel/" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = true; // TODO context!!!!
  const isAuthenticated = true; // TODO context!!!!
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMenuOpen) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY, isMenuOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleClickOutside, handleScroll]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed h-header w-full top-0 left-0 bg-cyan-100 py-4 z-10 shadow-sm transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-cyan-950 cursor-pointer"
          >
            <Image width={32} height={32} src="/logo512.png" alt="Logo" />
          </Link>
          <nav className="ml-4 divide-x divide-cyan-600 hidden lg:block">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
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
                href={item.path}
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
                href="/user/dashboard"
                className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
              >
                Meine Rezepte
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
                >
                  Anmelden
                </Link>
                <Link
                  href="/register"
                  className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
                >
                  Registrieren
                </Link>
              </>
            )}
            {isAuthenticated && isAdmin && (
              <Link
                href="/admin/dashboard"
                className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
              >
                Admin-Bereich
              </Link>
            )}
            {isAuthenticated && (
              <Link
                href="/logout"
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
