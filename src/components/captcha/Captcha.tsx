import { useState, useEffect, useRef, KeyboardEvent, useCallback } from "react";
import Image from "next/image";
import { TbReload } from "react-icons/tb";
import { getCookie } from "@/utils/Utils";

interface CaptchaProps {
  onCaptchaChange: (captchaData: { key: string; value: string }) => void;
  setLoadingParent?: (loading: boolean) => void;
  // TODO submit parent form
}

const Captcha: React.FC<CaptchaProps> = ({
  onCaptchaChange,
  setLoadingParent = undefined,
}) => {
  const [captchaKey, setCaptchaKey] = useState<string>("");
  const [captchaImageUrl, setCaptchaImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchCaptcha = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/captcha/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken") ?? "",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Captcha konnte nicht geladen werden");
      }

      const data = await response.json();
      setCaptchaKey(data.key);
      const imgPath = process.env.NEXT_PUBLIC_BASE_URL + data.image_url;
      setCaptchaImageUrl(imgPath);

      setLoading(false);
    } catch (error) {
      console.error("Fehler beim Abrufen des Captchas:", error);
    }
  }, []);

  useEffect(() => {
    if (setLoadingParent && !loading) {
      setTimeout(() => setLoadingParent(false), 1000); // TODO !!!
    }
  }, [setLoadingParent, loading]);

  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // todo submit parent form
    }
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    fetchCaptcha();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    // TODO check if both are necessary
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div>
      <div>
        {captchaImageUrl && (
          <div className="relative">
            <div className="absolute rounded-full flex items-center justify-center p-2 bg-gray-100 bottom-2 right-2 z-10 opacity-60 hover:opacity-80 text-gray-800 font-semibold">
              <button onClick={handleReset}>
                <TbReload className="w-10 h-10" />
              </button>
            </div>
            <Image
              src={captchaImageUrl}
              width={300}
              height={100}
              className="rounded-2xl w-full z-1"
              alt="Captcha"
            />
          </div>
        )}
        <div className="flex items-center mt-4">
          <input
            ref={inputRef}
            type="text"
            id="captchaText"
            placeholder="Beweise, dass Du kein Roboter bist! 🤖"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) =>
              onCaptchaChange({ key: captchaKey, value: e.target.value })
            }
            onKeyUp={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default Captcha;
