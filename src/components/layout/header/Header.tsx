"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isAuthenticated,
    isAdmin,
    login,
    logout,
    loading,
    loggingIn,
    username,
  } = useAuth();
  const [logInError, setLogInError] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [upScolls, setUpScrolls] = useState(0);
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
      setUpScrolls(0);
    } else if (upScolls >= 30 || currentScrollY < 100 || isMenuOpen) {
      setIsVisible(true);
    } else {
      setUpScrolls((prev) => prev + 1);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY, isMenuOpen, upScolls]);

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
      className={`fixed h-header w-full top-0 left-0 bg-cyan-100 py-4 z-30 shadow-sm transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-cyan-950 cursor-pointer"
          >
            <div className="relative flex flex-col items-center group">
              <div className="absolute group-hover:-translate-y-[6px] transition-all duration-150 text-cyan-200">
                <Image
                  src="/logo/animation-hat.svg"
                  alt="Chef Hat"
                  width={44}
                  height={44}
                />
              </div>
              <Image
                src="/logo/animation-baby.svg"
                alt="Baby"
                width={44}
                height={44}
              />
            </div>
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
        <div className="text-cyan-950 cursor-pointer">
          <CiMenuBurger
            className="block lg:hidden w-6 h-6"
            onClick={toggleMenu}
          />
          <div className="hidden lg:flex items-center">
            {username && (
              <Link
                href="/mein-bereich/kontoeinstellungen"
                className="hidden xl:flex text-cyan-950 hover:text-cyan-700 px-3 py-3 font-semibold"
              >
                {username}
              </Link>
            )}
            <FaRegUserCircle className="w-7 h-7" onClick={toggleMenu} />
          </div>
        </div>
      </div>
      <div className="lg:flex lg:items-end lg:justify-end" onClick={closeMenu}>
        <div className="bg-cyan-100 lg:w-fit lg:text-center shadow-xl">
          <div
            className={`bg-cyan-100 transition-max-height duration-500 ease-in-out overflow-hidden ${
              isMenuOpen ? "max-h-screen" : "max-h-0"
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
                  className="block text-cyan-950 hover:text-cyan-700 font-semibold px-4 py-3"
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
                  {username && (
                    <div className="py-1 space-y-1">
                      <p className="block xl:hidden text-center px-2 font-semibold">
                        Eingeloggt als
                      </p>
                      <Link
                        href="/konoteinstellungen"
                        className="block xl:hidden text-cyan-800 text-center hover:text-cyan-700 px-2 font-semibold"
                      >
                        {username}
                      </Link>
                    </div>
                  )}
                  <Link
                    href="/mein-bereich/meine-rezepte"
                    className="block text-cyan-950 hover:text-cyan-700 px-4 py-3"
                  >
                    Meine Rezepte
                  </Link>
                </>
              ) : (
                <>
                  <form
                    className="w-fit text-cyan-950 px-4 py-3 space-y-2"
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
                      className="block bg-cyan-50 px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-cyan-500 hover:ring-2 hover:ring-cyan-500 transition-all"
                    />
                    <div className="flex flex-col">
                      <input
                        ref={passwordRef}
                        key="password"
                        type="password"
                        placeholder="Passwort"
                        className="block bg-cyan-50 px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-cyan-500 hover:ring-2 hover:ring-cyan-500 transition-all"
                      />
                      <Link
                        href="/passwort-vergessen"
                        onClick={closeMenu}
                        className="text-cyan-950 text-start text-xs font-light px-1 mt-1.5 mb-2"
                      >
                        Passwort vergessen? Hier klicken!
                      </Link>
                    </div>
                    <button
                      className="w-full flex justify-center items-center block p-1 bg-cyan-50 h-10 text-cyan-950 ring-cyan-500 ring-2 rounded-md hover:bg-cyan-100 transition-all cursor-pointer"
                      type="submit"
                      disabled={loading}
                    >
                      {loggingIn ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Anmelden"
                      )}
                    </button>
                    {logInError && (
                      <p className="text-red-500 text-sm text-start">
                        {logInError}
                      </p>
                    )}
                  </form>
                  <Link
                    href="/registrieren"
                    className="block text-cyan-950 hover:text-cyan-700 px-4 py-3"
                  >
                    Registrieren
                  </Link>
                </>
              )}
              {isAuthenticated && isAdmin && (
                <Link
                  href="/admin/alle-artikel/"
                  className="block text-cyan-950 hover:text-cyan-700 px-4 py-3"
                >
                  Artikelübersicht
                </Link>
              )}
              {isAuthenticated && (
                <>
                  <Link
                    href="/mein-bereich/kontoeinstellungen"
                    className="block text-cyan-950 hover:text-cyan-700 px-4 py-3"
                  >
                    Kontoeinstellungen
                  </Link>
                  <button
                    onClick={async () => {
                      logout();
                      router.push("/");
                    }}
                    className="w-full text-start lg:text-center block text-cyan-950 hover:text-cyan-700 px-4 py-3"
                  >
                    Abmelden
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
