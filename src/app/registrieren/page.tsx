"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/Utils";
import { RiMailSendLine } from "react-icons/ri";

const Register: React.FC = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [showingConfirmation, setShowingConfirmation] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Ungültige E-Mail-Adresse.")
        .required("E-Mail ist erforderlich."),
      username: Yup.string()
        .min(5, "Nutzername muss mindestens 5 Zeichen lang sein.")
        .required("Nutzername ist erforderlich."),
      password: Yup.string()
        .required("Passwort ist erforderlich.")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{8,128}$/,
          "Passwort muss zwischen 8 und 128 Zeichen lang sein und mindestens eine Zahl, einen Buchstaben und ein Sonderzeichen enthalten.",
        ),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), undefined],
          "Passwörter stimmen nicht überein.",
        )
        .required("Passwort wiederholen ist erforderlich."),
    }),
    onSubmit: async (values) => {
      setIsSaving(true);
      setSaveError("");

      const csrftoken = getCookie("csrftoken") ?? "";

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify(values),
            credentials: "include",
          },
        );

        if (response.ok) {
          setShowingConfirmation(true);
        } else {
          throw new Error("Fehler beim Registrieren!");
        }
      } catch (error: any) {
        setSaveError(error.message);
      } finally {
        setIsSaving(false);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center px-8">
      {showingConfirmation === false ? (
        <form
          className="w-full md:w-1/2 p-8 bg-white rounded-lg shadow-md"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="text-xl font-bold mb-8 text-cyan-700">Registrieren</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-cyan-700 mb-2">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs mt-2">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-cyan-700 mb-2">
              Nutzername
            </label>
            <input
              type="text"
              id="username"
              {...formik.getFieldProps("username")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-xs mt-2">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-cyan-700 mb-2">
              Passwort
            </label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs mt-2">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-cyan-700 mb-2"
            >
              Passwort wiederholen
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-xs mt-2">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          <div className="w-full flex justify-center mt-8">
            <button
              type="submit"
              className="bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-cyan-800 transition duration-200 ease-in-out"
              disabled={isSaving}
            >
              {isSaving ? "Registrieren..." : "Registrieren"}
            </button>
          </div>
          {saveError && (
            <div className="text-red-500 text-xs mt-4 text-center">
              {saveError}
            </div>
          )}
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg shadow-md w-full md:w-1/2">
          <RiMailSendLine className="w-32 h-32 text-cyan-700" />
          <h1 className="text-4xl font-bold text-cyan-700 text-center mt-6">
            E-Mail-Adresse bestätigen
          </h1>
          <p className="text-lg text-gray-700 mt-4 text-center px-4">
            Deine Registrierung war erfolgreich! Wir haben dir eine E-Mail
            gesendet. Bitte bestätige deine E-Mail-Adresse, um dein Konto zu
            aktivieren.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-8 inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-6 rounded-lg shadow"
          >
            Zurück zur Startseite
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;
