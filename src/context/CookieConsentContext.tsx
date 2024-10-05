"use client";

import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface CookieConsentContextProps {
  necessary: boolean;
  optional: boolean;
  thirdParty: boolean;
  setNecessary: (value: boolean) => void;
  setOptional: (value: boolean) => void;
  setThirdParty: (value: boolean) => void;
  setCookie: () => void;
}

export const CookieConsentContext = createContext<CookieConsentContextProps>({
  necessary: true,
  optional: true,
  thirdParty: true,
  setNecessary: () => {},
  setOptional: () => {},
  setThirdParty: () => {},
  setCookie: () => {},
});

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [necessary, setNecessary] = useState<boolean>(true);
  const [optional, setOptional] = useState<boolean>(true);
  const [thirdParty, setThirdParty] = useState<boolean>(true);

  useEffect(() => {
    const storedConsent = Cookies.get("cookieConsent");
    if (storedConsent) {
      const consent = JSON.parse(storedConsent);
      setNecessary(consent.necessary);
      setOptional(consent.optional);
      setThirdParty(consent.thirdParty);
    }
  }, []);

  const setCookie = () => {
    if (necessary) {
      Cookies.set(
        "cookieConsent",
        JSON.stringify({ necessary, optional, thirdParty }),
        { expires: 365 },
      );
    }
  };

  return (
    <CookieConsentContext.Provider
      value={{
        necessary,
        optional,
        thirdParty,
        setNecessary,
        setOptional,
        setThirdParty,
        setCookie,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};
