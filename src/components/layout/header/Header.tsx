"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { FaRegUserCircle, FaSpinner } from "react-icons/fa";
import SearchBar from "./SearchBar";
import PasswordInput from "@/components/common/PasswordInput";
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
  const [miniSearchBarOpen, setMiniSearchBarOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
      setMiniSearchBarOpen(false);
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
      className={`w-full flex items-center justify-center fixed min-h-[var(--header-height)] max-h-[var(--header-height)] top-0 left-0 bg-cyan-100 py-4 z-30 shadow-md transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="w-full h-full flex items-center justify-between px-6">
        <div className="flex items-center">
          {!miniSearchBarOpen && (
            <Link
              href="/"
              className="text-2xl font-bold text-cyan-950 cursor-pointer"
            >
              <div className="relative flex flex-col items-center group">
                <div className="absolute group-hover:-translate-y-[6px] transition-all duration-150 text-cyan-200">
                  <Image
                    src="/logo/animation-hat.svg"
                    alt=""
                    width={44}
                    height={44}
                  />
                </div>
                <Image
                  src="/logo/animation-baby.svg"
                  alt=""
                  width={44}
                  height={44}
                />
              </div>
            </Link>
          )}
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
        <div className="xxs:hidden">
          {miniSearchBarOpen ? (
            <SearchBar closeMenu={closeMenu} />
          ) : (
            <button
              onClick={() => setMiniSearchBarOpen(true)}
              className="text-gray-700 bg-gray-100 bg-opacity-40 hover:bg-opacity-30 rounded-full py-1.5 px-5 group"
            >
              <CiSearch className="w-6 h-6 group-h" />
            </button>
          )}
        </div>
        <div className="text-cyan-950 cursor-pointer">
          {!miniSearchBarOpen && (
            <CiMenuBurger
              className="block lg:hidden w-6 h-6"
              onClick={toggleMenu}
            />
          )}
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
      <div
        className="absolute z-30 right-0 top-[var(--header-height)] -mt-0.5 bg-cyan-100 w-full lg:w-fit lg:text-center"
        style={{ boxShadow: "0px 5px 5px -5px rgba(0, 0, 0, 0.2)" }}
      >
        <div
          className={`bg-cyan-100 transition-max-height duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="lg:hidden divide-y divide-cyan-600">
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
        <hr
          className={`lg:hidden border-0 bg-cyan-600 transition-height duration-500 ease-in-out  ${isMenuOpen ? "h-0.5" : "h-0"}`}
        />
        <div
          className={`bg-cyan-100 transition-max-height duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-screen" : "max-h-0"
          }`}
          onClick={closeMenu}
        >
          {isAuthenticated && username && (
            <div className="block xl:hidden pt-3">
              <p className="text-center px-2 font-semibold">Eingeloggt als</p>
              <Link
                href="/konoteinstellungen"
                className="block xl:hidden text-cyan-800 text-center hover:text-cyan-700 px-2 font-semibold"
              >
                {username}
              </Link>
              <hr
                className={`hidden lg:block mt-3 border-0 bg-cyan-600 transition-height duration-500 ease-in-out ${isMenuOpen ? "h-0.5" : "h-0"}`}
              />
            </div>
          )}
          <div className="divide-y divide-cyan-600">
            {isAuthenticated ? (
              <>
                <Link
                  href="/mein-bereich/meine-rezepte"
                  className="block text-cyan-950 hover:text-cyan-700 px-4 py-3"
                >
                  Meine Rezepte
                </Link>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center">
                  <form
                    className="w-fit text-cyan-950 px-4 py-4 space-y-2"
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
                      className="w-full block bg-cyan-50 px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-cyan-500 hover:ring-2 hover:ring-cyan-500 transition-all"
                    />
                    <div className="flex flex-col">
                      <PasswordInput
                        passwordRef={passwordRef}
                        key="password"
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
                      className="w-full flex items-center justify-center bg-cyan-50 hover:bg-cyan-800 text-cyan-950 shadow-sm hover:text-cyan-50 hover:text-lg font-semibold hover:font-normal px-4 py-3 h-10 rounded-md transition-all duration-100 cursor-pointer"
                      type="submit"
                      disabled={loading}
                    >
                      {loggingIn ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Anmelden"
                      )}
                    </button>
                    <Link
                      href="/registrieren"
                      onClick={closeMenu}
                      className="w-full flex items-center justify-center bg-cyan-50 hover:bg-cyan-800 text-cyan-950 shadow-sm hover:text-cyan-50 hover:text-lg font-semibold hover:font-normal px-4 py-3 h-10 rounded-md transition-all duration-100 cursor-pointer"
                    >
                      Registrieren
                    </Link>
                    {logInError && (
                      <p className="text-red-500 text-sm text-start">
                        {logInError}
                      </p>
                    )}
                  </form>
                </div>
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
    </header>
  );
};

export default Header;
