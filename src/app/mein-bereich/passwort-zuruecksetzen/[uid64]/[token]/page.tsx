"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "@/utils/Utils";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uidb64 = searchParams.get("uidb64");
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Die Passwörter stimmen nicht überein.");
      return;
    }

    const csrftoken = getCookie("csrftoken") ?? "";

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset_password/${uidb64}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({ password }),
          credentials: "include",
        },
      );

      if (response.ok) {
        setMessage("Dein Passwort wurde erfolgreich zurückgesetzt.");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        throw new Error("Fehler beim Zurücksetzen des Passworts.");
      }
    } catch (err: any) {
      console.error(err.message);
      setMessage(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center my-28 px-8">
      <form
        className="w-full md:w-1/2 p-8 bg-white rounded-lg shadow-md"
        onSubmit={handleResetPassword}
      >
        <h2 className="text-xl font-bold mb-8 text-cyan-700">
          Passwort zurücksetzen
        </h2>
        <div className="mb-4">
          <label htmlFor="password" className="block text-cyan-700 mb-2">
            Neues Passwort
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-2 px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-cyan-700 mb-2">
            Passwort bestätigen
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="min-h-10 h-10 max-h-10 flex justify-start items-center">
          {message && <p className="text-gray-600">{message}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg"
        >
          Passwort zurücksetzen
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
