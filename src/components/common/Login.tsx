"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import PasswordInput from "./PasswordInput";

interface LoginProps {
  clickHandler?: () => void;
}

const Login: React.FC<LoginProps> = ({ clickHandler = () => {} }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [logInError, setLogInError] = useState<string>("");
  const { login, loading, loggingIn } = useAuth();

  return (
    <form
      className="w-fit text-cyan-950 px-4 py-4 space-y-2"
      onClick={(e) => e.stopPropagation()}
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          if (!emailRef.current || !passwordRef.current) {
            throw new Error("Fehler beim Anmelden");
          }
          await login(emailRef.current.value, passwordRef.current.value);
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
          onClick={clickHandler}
          className="text-cyan-950 text-start text-xs font-light px-1 mt-1.5 mb-2"
        >
          Passwort vergessen? Hier klicken!
        </Link>
      </div>
      <button
        className="w-full flex items-center justify-center bg-cyan-50 hover:bg-cyan-800 text-cyan-950 hover:text-cyan-50 font-semibold px-4 py-3 h-10 rounded-md cursor-pointer"
        type="submit"
        disabled={loading}
      >
        {loggingIn ? <FaSpinner className="animate-spin" /> : "Anmelden"}
      </button>
      <Link
        href="/registrieren"
        onClick={clickHandler}
        className="w-full flex items-center justify-center bg-cyan-50 hover:bg-cyan-800 text-cyan-950 hover:text-cyan-50 font-semibold px-4 py-3 h-10 rounded-md cursor-pointer"
      >
        Registrieren
      </Link>
      {logInError && (
        <p className="text-red-500 text-sm text-start">{logInError}</p>
      )}
    </form>
  );
};

export default Login;
