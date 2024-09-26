import React from "react";
import Image from "next/image";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="relative flex flex-col items-center">
        <div className="flex flex-col items-center">
          <Image
            src="/logo/logo-sad.svg"
            alt="Chef Hat"
            width={200}
            height={200}
          />
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
