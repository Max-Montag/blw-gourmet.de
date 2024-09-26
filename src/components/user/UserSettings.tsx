import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  MdOutlineLockReset,
  MdOutlineMarkEmailRead,
  MdOutlineErrorOutline,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaDoorOpen, FaCheck } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import { getCookie } from "@/utils/Utils";

const CHECK_TEXT = "Ich möchte, dass mein Account gelöscht wird!";

const UserSettings: React.FC = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showingConfirmation, setShowingConfirmation] = useState(false);
  const [currentAction, setCurrentAction] = useState("");

  const popupRef = useRef<HTMLDivElement | null>(null);
  const { logout } = useAuth();


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const apiAction = async (keyword: string, data: Record<string, string>) => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/${keyword}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken") ?? "",
          },
          body: JSON.stringify(data),
          credentials: "include",
        },
      );

      if (response.ok) {
        setShowingConfirmation(true);
        setTimeout(() => {
          setShowingConfirmation(false);
        }, 3000);
        handleClose();
      } else {
        setSaveError("Fehler beim Speichern. Bitte versuche es erneut.");
      }
    } catch (error) {
      setSaveError("Fehler beim Speichern. Bitte versuche es erneut.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async (formData: FormData) => {
    const checkText = formData.get("checkText") as string;
    const password = formData.get("password") as string;

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

  const handlePasswordChange = async (formData: FormData) => {
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

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
    const password = formData.get("passwordForEmail") as string;

    if (newEmail !== confirmNewEmail) {
      setSaveError("Die E-Mail-Adressen stimmen nicht überein.");
    } else {
      await apiAction("change_email", { newEmail, confirmNewEmail, password });
    }
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    action: (formData: FormData) => void,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    action(formData);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSaveError("");
  };

  const renderPopupContent = () => {
    switch (currentAction) {
      case "change_password":
        return (
          <form onSubmit={(e) => handleSubmit(e, handlePasswordChange)}>
            <label>Aktuelles Passwort</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Aktuelles Passwort"
              className="border rounded p-2 mt-1.5 mb-2.5 w-full"
              required
            />
            <label>Neues Passwort</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Neues Passwort"
              className="border rounded p-2 w-full mt-1.5 mb-2.5"
              required
            />
            <label>Passwort bestätigen</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Neues Passwort"
              className="border rounded p-2 w-full mt-1.5 mb-2.5"
              required
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
            <input
              type="password"
              name="passwordForEmail"
              placeholder="Passwort"
              className="border rounded p-2 w-full mt-1.5 mb-2.5"
              required
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
            <input
              type="password"
              name="password"
              placeholder="Passwort"
              className="border rounded p-2 w-full my-2"
              required
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
      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg transition duration-200"
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
