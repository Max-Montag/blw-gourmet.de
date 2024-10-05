import React, { useState, forwardRef, Ref } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  passwordRef?: Ref<HTMLInputElement>;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ passwordRef, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputRef = passwordRef || ref;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">
        <input
          ref={inputRef}
          type={showPassword ? "text" : "password"}
          className={`${className} pr-10`}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 flex items-center"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <FaRegEyeSlash className="h-5 w-5 text-gray-400" />
          ) : (
            <FaRegEye className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
