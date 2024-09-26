"use client";

import { useState, FormEvent, KeyboardEvent } from "react";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { RiMailSendLine } from "react-icons/ri";
import { getCookie } from "@/utils/Utils";
import Captcha from "@/components/captcha/Captcha";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [captchaKey, setCaptchaKey] = useState<string>("");
  const [captchaValue, setCaptchaValue] = useState<string>("");

  const handleForgotPassword = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (e) e.stopPropagation();

    const captcha = { key: captchaKey, value: captchaValue };

    try {
      setSending(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot_password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken") ?? "",
          },
          body: JSON.stringify({ email, captcha }),
        },
      );

      setSending(false);

      if (response.ok) {
        setSent(true);
      } else if (response.status === 406) {
        throw new Error("Bist du vielleicht doch ein Roboter?");
      } else {
        throw new Error("Fehler beim Senden der E-Mail.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
      } else {
        console.error("Unbekannter Fehler");
        setError("Unbekannter Fehler");
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const setCaptchaResponse = (captchaData: { key: string; value: string }) => {
    setCaptchaValue(captchaData.value);
    setCaptchaKey(captchaData.key);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 my-8">
        <RiMailSendLine className="w-32 h-32 text-cyan-600" />
        <p className="text-lg text-gray-700 mt-4 text-center px-4">
          Prüfe deinen Posteingang! Wir haben dir eine E-Mail gesendet, mit der
          du dein Passwort zurücksetzen kannst.
        </p>
        <Link href="/">
          <p className="mt-8 inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg shadow">
            Zurück zur Startseite
          </p>
        </Link>
      </div>
    );
  } else {
    return (
      <>
        <div
          className="w-full md:w-2/3 lg:w-1/2 flex items-center justify-center px-2 xs:px-8"
          onKeyDown={handleKeyPress}
        >
          <form
            className="w-full p-8 bg-white rounded-lg shadow-md"
            onSubmit={handleForgotPassword}
          >
            <h2 className="text-xl font-semibold mb-8 text-cyan-600">
              Passwort zurücksetzen
            </h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-cyan-600 mb-2">
                E-Mail-Adresse
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mb-2 px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="w-full my-6">
              <Captcha
                onCaptchaChange={setCaptchaResponse}
                setLoadingParent={setLoading}
                submitParentForm={handleForgotPassword}
              />
            </div>
            <div className="min-h-10 h-10 max-h-10 flex justify-start items-center">
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
            >
              {sending ? (
                <FaSpinner className="animate-spin w-6 h-6 mx-auto" />
              ) : (
                "Passwort zurücksetzen"
              )}
            </button>
          </form>
        </div>
        {loading && (
          <div className="z-20 bg-white top-0 fixed w-full min-h-screen flex items-center justify-center">
            {" "}
            <LoadingAnimation />{" "}
          </div>
        )}
      </>
    );
  }
};

export default ForgotPassword;
