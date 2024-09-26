import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { TbReload } from "react-icons/tb";
import { getCookie } from "@/utils/Utils";

interface CaptchaProps {
  onCaptchaChange: (captchaData: { key: string; value: string }) => void;
  setLoadingParent?: (loading: boolean) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onCaptchaChange, setLoadingParent = undefined }) => {
  const [captchaKey, setCaptchaKey] = useState<string>("");
  const [captchaImageUrl, setCaptchaImageUrl] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  const fetchCaptcha = async () => {
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

      if (setLoadingParent) {
        setTimeout(() => setLoadingParent(false), 1000);
      }

    } catch (error) {
      console.error("Fehler beim Abrufen des Captchas:", error);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleReset = () => {
    fetchCaptcha();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

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
              <img
                src={captchaImageUrl}
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
