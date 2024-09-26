"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdMarkEmailRead } from "react-icons/md";
import { LuMailX } from "react-icons/lu";
import LoadingAnimation from "@/components/common/loadingAnimation/LoadingAnimation";
import { getCookie } from "@/utils/Utils";

interface ActivateAccountProps {
  params: { uid64: string; token: string };
}

const ActivateNewEmail: React.FC<ActivateAccountProps> = ({ params }) => {
  const router = useRouter();
  const { uid64, token } = params;
  const [success, setSuccess] = useState<boolean | null | undefined>(null);

  useEffect(() => {
    if (success === null && uid64 && token) {
      alert("success + " + success + "uid64: " + uid64 + " token: " + token);
      setSuccess(undefined);
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/activate_new_email/${uid64}/${token}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken") ?? "",
          },
        },
      )
        .then((response) => {
          if (response.ok) {
            setSuccess(true);
            setTimeout(() => router.push("/"), 5000);
          } else {
            setSuccess(false);
            console.error("Aktivierung fehlgeschlagen");
          }
        })
        .catch((error) => {
          console.error("Fehler bei der Aktivierung:", error);
          setSuccess(false);
        });
    }
  }, [uid64, token, router, success]);

  if (success === true) {
    return (
      <div className="flex flex-col items-center justify-center my-8 px-4">
        <MdMarkEmailRead className="w-32 h-32 text-cyan-600" />
        <h1 className="text-4xl font-bold text-cyan-600 text-center mt-8">
          Deine neue E-Mail-Adresse wurde erfolgreich aktiviert!
        </h1>
        <p className="text-lg text-cyan-950 mt-4 text-center">
          Vielen Dank für die Bestätigung deiner neuen E-Mail-Adresse. Du wirst
          gleich weitergeleitet.
        </p>
      </div>
    );
  } else if (success === false) {
    return (
      <div className="flex flex-col items-center justify-center my-8 px-4">
        <LuMailX className="w-32 h-32 text-red-500" />
        <h1 className="text-4xl font-bold text-red-600 text-center mt-8">
          Leider konnten wir deine neue E-Mail-Adresse nicht verifizieren.
        </h1>
        <p className="text-lg text-cyan-950 mt-4 text-center">
          Möglicherweise ist der Link abgelaufen oder unser System hat eine
          ungewöhnliche Aktivität festgestellt. Bitte schreibe eine E-Mail an
          info@blw-gourmet.de, falls das Problem weiterhin auftritt.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-8 inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-lg shadow"
        >
          Zurück zur Startseite
        </button>
      </div>
    );
  } else {
    return <LoadingAnimation />;
  }
};

export default ActivateNewEmail;
