"use effect";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  MdOutlineLockReset,
  MdOutlineMarkEmailRead,
  MdOutlineErrorOutline,
  MdVerifiedUser,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaDoorOpen, FaCheck } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import PasswordInput from "../common/PasswordInput";
import { useAuth } from "@/context/AuthContext";
import { getCSRFToken } from "@/utils/cookieUtils";

const CHECK_TEXT = "Ich möchte, dass mein Account gelöscht wird!";

const UserSettings: React.FC = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<string | null>(null);
  const [saveError, setSaveError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showingConfirmation, setShowingConfirmation] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const popupRef = useRef<HTMLDivElement | null>(null);
  const usernamePasswordRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const emailPasswordRef = useRef<HTMLInputElement>(null);
  const deletePasswordRef = useRef<HTMLInputElement>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const checkUsernameAvailability = async (username: string) => {
    if (!username) {
      setUsernameAvailable(null);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check_username/?username=${username}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.available) {
          setUsernameAvailable("available");
        } else {
          setUsernameAvailable("unavailable");
        }
      } else {
        setUsernameAvailable("error");
      }
    } catch (error) {
      console.error("Error checking username availability:", error);
      setUsernameAvailable("error");
    }
  };

  const apiAction = async (keyword: string, data: Record<string, string>) => {
    try {
      setIsSaving(true);

      const csrf_token = await getCSRFToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/${keyword}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf_token,
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        setShowingConfirmation(true);
        setTimeout(() => {
          setShowingConfirmation(false);
        }, 3000);
        handleClose();
      } else {
        throw new Error("Serverfehler");
      }
    } catch (error) {
      setSaveError("Fehler beim Speichern. Bitte versuche es erneut.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async (formData: FormData) => {
    const checkText = formData.get("checkText") as string;
    const password = deletePasswordRef.current?.value as string;

    if (checkText !== CHECK_TEXT) {
      setSaveError("Der eingegebene Text ist nicht korrekt!");
    } else if (password.length < 8) {
      setSaveError("Das Passwort muss mindestens 8 Zeichen lang sein.");
    } else {
      await apiAction("deactivate_account", { password });
      logout();
      router.push("/");
    }
  };

  const handlePasswordChange = async () => {
    const oldPassword = oldPasswordRef.current?.value as string;
    const newPassword = newPasswordRef.current?.value as string;
    const confirmPassword = confirmPasswordRef.current?.value as string;

    if (newPassword !== confirmPassword) {
      setSaveError("Die neuen Passwörter stimmen nicht überein.");
    } else {
      await apiAction("change_password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
    }
  };

  const handleEmailChange = async (formData: FormData) => {
    const newEmail = formData.get("newEmail") as string;
    const confirmNewEmail = formData.get("confirmNewEmail") as string;
    const password = emailPasswordRef.current?.value as string;

    if (newEmail !== confirmNewEmail) {
      setSaveError("Die E-Mail-Adressen stimmen nicht überein.");
    } else {
      await apiAction("change_email", { newEmail, confirmNewEmail, password });
    }
  };
  
  const handleUsernameChange = async (formData: FormData) => {
    const newUsername = formData.get("newUsername") as string;
    const password = usernamePasswordRef.current?.value as string;

    await checkUsernameAvailability(newUsername);

    if (usernameAvailable === "available") {
      await apiAction("change_username", { newUsername, password });
    } else {
      setSaveError("Der Nutzername ist bereits vergeben.");
    }
  }

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    action: (formData: FormData) => void,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    action(formData);
  };

  const handleUsernameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    await checkUsernameAvailability(e.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSaveError("");
  };

  const renderPopupContent = () => {
    switch (currentAction) {
      case "change_username":
        return (
          <form onSubmit={(e) => handleSubmit(e, handleUsernameChange)}>
            <label>Neuer Benutzername</label>
            <div className="mt-1 mb-2.5">
            <input
              type="text"
              name="newUsername"
              placeholder="Neuer Benutzername"
              className="border rounded p-2 w-full"
              required
              onBlur={handleUsernameBlur}
            />
            <div className="min-h-3 h-3 max-h-3 pt-1 flex flex-col justify-center">
            {usernameAvailable === "available" && (
                <div className="text-green-500 text-xs">
                  Nutzername verfügbar.
                  <FaCheck className="inline-block ml-1.5 w-2.5 h-2.5" />
                </div>
              )}
              {usernameAvailable === "unavailable" && (
                <div className="text-red-500 text-xs">
                  Nutzername bereits vergeben.
                </div>
              )}
              {usernameAvailable === "error" && (
                <div className="text-red-500 text-xs">
                  Fehler beim Überprüfen des Nutzernamens.
                </div>
              )}
              </div>
            </div>
            <label>Passwort</label>
            <PasswordInput
              passwordRef={usernamePasswordRef}
              key="passwordForUsername"
              placeholder="Passwort"
              className="border rounded p-2 w-full mt-2.5 mb-2.5"
            />
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 h-12 text-white flex justify-center items-center mt-4 py-2 px-4 rounded-lg w-full"
            >
              {" "}
              {isSaving ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <p>Benutzernamen ändern</p>
              )}
            </button>
          </form>
        );
      case "change_password":
        return (
          <form onSubmit={(e) => handleSubmit(e, handlePasswordChange)}>
            <label>Aktuelles Passwort</label>
            <PasswordInput
              passwordRef={oldPasswordRef}
              key="oldPassword"
              placeholder="Aktuelles Passwort"
              className="border rounded p-2 w-full mt-1.5 mb-2.5"
            />
            <label>Neues Passwort</label>
            <PasswordInput
              passwordRef={newPasswordRef}
              key="newPassword"
              placeholder="Neues Passwort"
              className="border rounded p-2 w-full mt-1.5 mb-2.5"
            />
            <label>Passwort bestätigen</label>
            <PasswordInput
              passwordRef={confirmPasswordRef}
              key="confirmPassword"
              placeholder="Passwort bestätigen"
              className="border rounded p-2 w-full mt-1.5 mb-2.5"
            />
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 h-12 text-white flex justify-center items-center mt-4 py-2 px-4 rounded-lg w-full"
            >
              {" "}
              {isSaving ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <p>Passwort ändern</p>
              )}
            </button>
          </form>
        );
      case "change_email":
        return (
          <form onSubmit={(e) => handleSubmit(e, handleEmailChange)}>
            <label>Neue E-Mail-Adresse</label>
            <input
              type="email"
              name="newEmail"
              placeholder="Neue E-Mail-Adresse"
              className="border rounded p-2 mt-1.5 mb-2.5 w-full"
              required
            />
            <label>E-Mail-Adresse bestätigen</label>
            <input
              type="email"
              name="confirmNewEmail"
              placeholder="Neue E-Mail-Adresse"
              className="border rounded p-2 w-full mt-1.5 mb-2.5"
              required
            />
            <label>Passwort</label>
            <PasswordInput
              passwordRef={emailPasswordRef}
              key="passwordForEmail"
              placeholder="Passwort"
              className="border rounded p-2 w-full mt-1.5 mb-2.5"
            />
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 h-12 text-white flex justify-center items-center mt-4 py-2 px-4 rounded-lg w-full"
            >
              {" "}
              {isSaving ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <p>E-mail-Adrese ändern</p>
              )}
            </button>
          </form>
        );
      case "deactivate_account":
        return (
          <form onSubmit={(e) => handleSubmit(e, handleDeleteAccount)}>
            <p className="mb-2 text-cyan-950">
              Um deinen Account und damit all deine Rezepte dauerhaft zu
              löschen, gib bitte den Text „{CHECK_TEXT}” ein und bestätige mit
              deinem Passwort.
            </p>
            <input
              type="text"
              name="checkText"
              placeholder={CHECK_TEXT}
              className="border rounded p-2 w-full my-2"
              required
            />
            <PasswordInput
              passwordRef={deletePasswordRef}
              key="password"
              placeholder="Passwort"
              className="border rounded p-2 w-full"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 h-12 text-white flex justify-center items-center mt-4 py-2 px-4 rounded-lg w-full"
            >
              {" "}
              {isSaving ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <p>Account und Rezepte löschen</p>
              )}
            </button>
          </form>
        );
      default:
        return <p>Etwas ist schiefgelaufen. Bitte versuche es erneut.</p>;
    }
  };

  const ActionButton = ({
    text,
    keyword,
    Icon,
  }: {
    text: string;
    keyword: string;
    Icon: React.ElementType;
  }) => (
    <button
      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg transition duration-50"
      onClick={() => {
        setIsOpen(true);
        setCurrentAction(keyword);
      }}
      disabled={isSaving}
    >
      {isSaving ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        <div className="flex items-center justify-center">
          <Icon className="w-6 h-6 mr-2" />
          {text}
        </div>
      )}
    </button>
  );

  return (
    <div className="w-full bg-white text-lg shadow-md rounded px-8 pt-6 pb-8 max-w-md mx-auto relative">
      <div className="space-y-4">
        <h1 className="xs:text-lg md:text-2xl mb-2">Kontoeinstellungen</h1>
        <ActionButton
          text="Benutzernamen ändern"
          keyword="change_username"
          Icon={MdVerifiedUser}
        />
        <ActionButton
          text="Passwort ändern"
          keyword="change_password"
          Icon={MdOutlineLockReset}
        />
        <ActionButton
          text="E-Mail-Adresse ändern"
          keyword="change_email"
          Icon={MdOutlineMarkEmailRead}
        />
        <ActionButton
          text="Account und Rezepte löschen"
          keyword="deactivate_account"
          Icon={FaDoorOpen}
        />
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div
            ref={popupRef}
            className="bg-white p-10 rounded-lg shadow-2xl max-w-md w-full relative"
          >
            <IoCloseOutline
              className="w-7 h-7 text-gray-800 absolute top-4 right-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            {renderPopupContent()}
            {saveError && (
              <div className="h-4 text-red-500 text-xs mx-1 mt-2">
                <MdOutlineErrorOutline className="inline-block mr-2" />
                {saveError}
              </div>
            )}
          </div>
        </div>
      )}
      {showingConfirmation && (
        <div className="absolute top-24 left-0 right-0 ml-auto mr-auto w-32 h-32 text-cyan-600 animate-ping">
          <FaCheck className="w-32 h-32" />
        </div>
      )}
    </div>
  );
};

export default UserSettings;
