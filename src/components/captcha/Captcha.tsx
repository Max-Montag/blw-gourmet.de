import { useState, useEffect, KeyboardEvent } from 'react';
import { TbReload } from 'react-icons/tb';
import { getCookie } from '@/utils/Utils';

interface CaptchaProps {
  onCaptchaChange: (captchaData: { key: string; value: string }) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onCaptchaChange }) => {
  const [captchaKey, setCaptchaKey] = useState<string>('');
  const [captchaImageUrl, setCaptchaImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const fetchCaptcha = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/captcha/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') ?? '',
        },
      });

      if (!response.ok) {
        throw new Error('Captcha konnte nicht geladen werden');
      }

      const data = await response.json();
      setCaptchaKey(data.key);
      const imgPath = 'http://192.168.1.151' + data.image_url; // TODO https://blw-gourmet.de oder nach env
      setCaptchaImageUrl(imgPath);
      setLoading(false);
    } catch (error) {
      console.error('Fehler beim Abrufen des Captchas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div>
      {loading ? (
        <p>Lade Captcha...</p>
      ) : (
        <div>
          {captchaImageUrl && (
            <div className="relative">
              <div className="absolute rounded-full p-1 bg-gray-100 bottom-1 right-3 z-10 opacity-60 text-gray-800 font-semibold">
                <button onClick={fetchCaptcha}>
                  <TbReload className="w-6 h-6 -mb-1" />
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
              type="text"
              id="captchaText"
              placeholder="Beweise, dass Du kein Roboter bist! 🤖"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => onCaptchaChange({ key: captchaKey, value: e.target.value })}
              onKeyUp={handleKeyPress}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Captcha;
