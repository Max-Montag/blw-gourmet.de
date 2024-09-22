"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiMenuBurger } from "react-icons/ci";
import { FaRegUserCircle, FaSpinner } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { label: "Rezepte durchstöbern", path: "/rezepte/" },
  { label: "Was ist BLW?", path: "/was-ist-blw/" },
  { label: "Tipps für den Beikoststart", path: "/artikel/" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, login, logout, loading } = useAuth();
  const [logInError, setLogInError] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
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
      <div className="lg:flex lg:items-end lg:justify-end" onClick={closeMenu}>
        <div className="bg-cyan-100 lg:w-fit lg:text-center">
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
              isMenuOpen ? "max-h-screen" : "max-h-0"
            }`}
            onClick={closeMenu}
          >
            <div className="mt-4 divide-y divide-cyan-600">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/user/meine-rezepte"
                    className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
                  >
                    Meine Rezepte
                  </Link>
                  <button
                    onClick={async () => {
                      logout();
                    }}
                    className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
                  >
                    Abmelden
                  </button>
                </>
              ) : (
                <>
                  <form
                    className="w-fit text-cyan-950 px-2 py-3 space-y-2"
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        if (!emailRef.current || !passwordRef.current) {
                          throw new Error("Fehler beim Anmelden");
                        }
                        await login(
                          emailRef.current.value,
                          passwordRef.current.value,
                        );
                        setLogInError("");
                      } catch (error) {
                        setLogInError("Fehler beim Anmelden");
                      }
                    }}
                  >
                    <input
                      key="email"
                      type="email"
                      ref={emailRef}
                      placeholder="E-Mail"
                      className="block bg-cyan-50 p-1 rounded-md outline-none focus:ring-2 focus:ring-cyan-500 hover:ring-2 hover:ring-cyan-500 transition-all"
                    />
                    <input
                      ref={passwordRef}
                      key="password"
                      type="password"
                      placeholder="Passwort"
                      className="block bg-cyan-50 p-1 rounded-md outline-none focus:ring-2 focus:ring-cyan-500 hover:ring-2 hover:ring-cyan-500 transition-all"
                    />
                    <button
                      className="w-full flex justify-center block p-1 bg-cyan-50 text-cyan-950 ring-cyan-500 ring-2 rounded-md hover:bg-cyan-100 transition-all"
                      type="submit"
                    >
                      {logInError ? (
                        logInError
                      ) : loading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Anmelden"
                      )}
                    </button>
                    {/* Eingabefelder und Button */}
                  </form>
                  <Link
                    href="/register"
                    className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
                  >
                    Registrieren
                  </Link>
                </>
              )}
              {/* {isAuthenticated && isAdmin && ( */}
              {
                <Link
                  href="/admin/dashboard"
                  className="block text-cyan-950 hover:text-cyan-700 pl-2 py-3"
                >
                  Admin-Bereich
                </Link>
              }
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
      </div>
    </header>
  );
};

export default Header;
