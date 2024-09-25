"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { RiMailSendLine } from "react-icons/ri";
import { getCookie } from "@/utils/Utils";
import Captcha from "@/components/captcha/Captcha";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [sent, setSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [captchaKey, setCaptchaKey] = useState<string>("");
  const [captchaValue, setCaptchaValue] = useState<string>("");

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();

    const captcha = { key: captchaKey, value: captchaValue };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forgot_password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken") ?? "",
          },
          body: JSON.stringify({ email, captcha }),
        },
      );

      if (response.ok) {
        setSent(true);
      } else if (response.status === 406) {
        throw new Error("Bist du vielleicht doch ein Roboter?");
      } else {
        throw new Error("Fehler beim Senden der E-Mail.");
      }
    } catch (err: any) {
      setError(err.message);
      console.error(err.message);
    }
  };

  const setCaptchaResponse = (captchaData: { key: string; value: string }) => {
    setCaptchaValue(captchaData.value);
    setCaptchaKey(captchaData.key);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 my-28">
        <RiMailSendLine className="w-32 h-32 text-cyan-600" />
        <p className="text-lg text-gray-700 mt-4 text-center px-4">
          Prüfe deinen Posteingang! Wir haben dir eine E-Mail gesendet, mit der
          du dein Passwort zurücksetzen kannst.
        </p>
        <Link href="/">
          <a className="mt-8 inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg shadow">
            Zurück zur Startseite
          </a>
        </Link>
      </div>
    );
  } else {
    return (
      <>
      <div className="w-full md:w-2/3 lg:w-1/2 flex items-center justify-center px-2 xs:px-8">
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
            <Captcha onCaptchaChange={setCaptchaResponse} setLoadingParent={setLoading} />
          </div>
          <div className="min-h-10 h-10 max-h-10 flex justify-start items-center">
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
          >
            E-Mail senden
          </button>
        </form>
      </div>
      {loading && <div className="z-5 bg-white fixed w-full min-h-screen top-header flex items-center justify-center"> <LoadingAnimation /> </div>}
      </>
    );
  }
};

export default ForgotPassword;
