"use client";

import React, { useContext, useState, useEffect } from "react";
import { CookieConsentContext } from "@/context/CookieConsentContext";
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
  } = useContext(CookieConsentContext);
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
      <div className="max-w-4xl mx-auto">
        <p className="text-cyan-900 mb-4">
          Wir verwenden Cookies, um unsere Website und unseren Service zu
          optimieren.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 space-y-4 md:space-y-0">
          <div className="flex items-center">
            <span className="text-cyan-900 mr-2">Notwendige Cookies</span>
            <NiceToggle enabled={necessary} setEnabled={setNecessary} />
          </div>
          <div className="flex items-center">
            <span className="text-cyan-900 mr-2">Optionale Cookies</span>
            <NiceToggle
              enabled={optional}
              setEnabled={setOptional}
              disabled={!necessary}
              onChange={() => !necessary && setOptional(false)}
            />
          </div>
          <div className="flex items-center">
            <span className="text-cyan-900 mr-2">Drittanbieter-Cookies</span>
            <NiceToggle
              enabled={thirdParty}
              setEnabled={setThirdParty}
              disabled={!necessary}
            />{" "}
            {/** TODO  */}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-cyan-700 text-white px-4 py-2 rounded"
            onClick={handleAcceptAll}
          >
            Alle akzeptieren
          </button>
          <button
            className="bg-cyan-50 text-cyan-700 px-4 py-2 ml-2 rounded"
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
