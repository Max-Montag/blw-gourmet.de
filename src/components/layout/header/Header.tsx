"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import SearchBar from "./SearchBar";
import Login from "@/components/common/Login";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { label: "Rezepte durchstöbern", path: "/rezepte/" },
  { label: "Was ist BLW?", path: "/was-ist-blw/" },
  { label: "Tipps für den Beikoststart", path: "/artikel/" },
];

const Header: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout, username } = useAuth();

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
    } else if (upScolls >= 30 || currentScrollY < 200 || isMenuOpen) {
      setIsVisible(true);
    } else {
      setUpScrolls((prev) => prev + 1);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY, isMenuOpen, upScolls]);

  useEffect(() => {
    if (miniSearchBarOpen) {
      setIsMenuOpen(false);
    }
  }, [miniSearchBarOpen]);

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
      className={`w-full flex items-center justify-center fixed min-h-[var(--header-height)] max-h-[var(--header-height)] top-0 left-0 bg-cyan-100 py-4 z-30 shadow-sm transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="w-full h-full flex items-center justify-between px-6">
        <div className="flex items-center">
          {!miniSearchBarOpen && (
            <Link
              href="/"
              className="text-2xl font-bold text-cyan-950 cursor-pointer"
              onClick={closeMenu}
            >
              <div className="relative flex flex-col items-center group">
                <div className="absolute lg:group-hover:-translate-y-[6px] lg:transition-all lg:duration-150 text-cyan-200">
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
          <nav className="ml-4 hidden lg:block">
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
        <div
          className={`xxs:hidden transition-all duration-300 ease-in-out ${miniSearchBarOpen ? "w-full" : "w-0"}`}
        >
          {miniSearchBarOpen ? (
            <SearchBar closeMenu={closeMenu} setFocus={true} />
          ) : (
            <div className="w-full flex justify-center">
              <button
                onClick={() => setMiniSearchBarOpen(true)}
                className="text-gray-700 bg-cyan-50 rounded-full py-1.5 px-5 -ml-2.5 group"
              >
                <CiSearch className="w-6 h-6 group-h" />
              </button>
            </div>
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
        className="max-h-screen absolute z-30 right-0 top-[var(--header-height)] -mt-0.5 bg-cyan-100 w-full lg:w-fit lg:text-center"
        style={{ boxShadow: "0px 5px 5px -5px rgba(0, 0, 0, 0.2)" }}
      >
        <div
          className={`bg-cyan-100 transition-max-height duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="lg:hidden">
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
          className={`bg-cyan-100 text-center transition-max-height duration-500 ease-in-out overflow-hidden ${
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
            </div>
          )}
          <div>
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
                  <Login clickHandler={closeMenu} />
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
                  className="w-full text-center block text-cyan-950 hover:text-cyan-700 px-4 py-3"
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
