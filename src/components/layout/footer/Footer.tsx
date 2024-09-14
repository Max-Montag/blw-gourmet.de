"use client";

import React from "react";
import Link from "next/link";

const footerLinks = [
  { label: "Impressum", path: "/impressum" },
  { label: "Datenschutz", path: "/datenschutz" },
  { label: "Nutzungsbedingungen", path: "/nutzungsbedingungen" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyan-100 text-cyan-950 py-4 px-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} BLW-Gourmet.de. Alle Rechte
          vorbehalten.
        </p>
        <nav className="flex flex-wrap justify-center gap-4">
          {footerLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-cyan-950 hover:text-cyan-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
