import React from "react";
import { TfiFaceSad } from "react-icons/tfi";
import { PiChefHat } from "react-icons/pi";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="w-full flex justify-center mt-44">
      <div className="relative flex flex-col items-center">
        <div className="flex flex-col items-center">
          <PiChefHat size={75} className="text-cyan-200 -mb-4" />
          <TfiFaceSad size={85} className="text-cyan-500" />
        </div>
        <p className="text-cyan-300 text-xl mt-4 text-center">
          Der Inhalt konnte leider nicht geladen werden.
        </p>
        <p className="text-cyan-500 text-sm mt-4 text-center">
          Fehler: {message}
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage;
