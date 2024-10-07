"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCookieConsent } from "@/context/CookieConsentContext";
import NiceToggle from "@/components/common/NiceToggle";

const CookieBanner: React.FC = () => {
  const {
    necessary,
    optional,
    thirdParty,
    setNecessary,
    setOptional,
    setThirdParty,
    setCookie,
  } = useCookieConsent();
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    const storedConsent = document.cookie.match(
      /^(.*;)?\s*cookieConsent\s*=\s*[^;]+(.*)?$/,
    );
    if (!storedConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setNecessary(true);
    setOptional(true);
    setThirdParty(true);
    setCookie();
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    setShowBanner(false);
    setCookie();
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-cyan-100 p-4 z-50">
      <div className="max-w-4xl w-full flex flex-col items-center mx-auto">
        <p className="text-cyan-900 mb-4 md:text-start">
          <span>
            Wir verwenden Cookies, um unsere Website und unseren Service zu
            optimieren. Erfahre mehr in unserer{" "}
          </span>
          <Link
            href="/datenschutz"
            className="text-cyan-700 hover:text-cyan-600"
          >
            Datenschutzerklärung
          </Link>
          <span>.</span>
        </p>
        <div className="w-full flex items-center justify-center">
          <div className="w-2/3 md:w-full flex flex-col md:flex-row items-end justify-end md:justify-between mb-4 md:space-x-8 space-y-4 md:space-y-0">
            <div className="w-full flex justify-between items-center">
              <span className="text-cyan-900 mr-2">Notwendige Cookies</span>
              <NiceToggle enabled={necessary} setEnabled={setNecessary} />
            </div>
            <div className="w-full flex justify-between items-center">
              <span className="text-cyan-900 mr-2">Optionale Cookies</span>
              <NiceToggle
                enabled={optional}
                setEnabled={setOptional}
                disabled={!necessary}
                onChange={() =>
                  necessary === false ? setOptional(false) : null
                }
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <span className="text-cyan-900 mr-2">Drittanbieter-Cookies</span>
              <NiceToggle
                enabled={thirdParty}
                setEnabled={setThirdParty}
                disabled={!necessary}
                onChange={() =>
                  necessary === false ? setThirdParty(false) : null
                }
              />{" "}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-cyan-700 hover:bg-cyan-50 text-cyan-50 hover:text-cyan-700 px-4 py-2 rounded"
            onClick={handleAcceptAll}
          >
            Alle akzeptieren
          </button>
          <button
            className="bg-cyan-50 hover:bg-cyan-700 text-cyan-700 hover:text-cyan-50 px-4 py-2 ml-2 md:ml-4 rounded"
            onClick={handleSavePreferences}
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
