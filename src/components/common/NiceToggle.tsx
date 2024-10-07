import React, { useCallback, useEffect } from "react";

interface NiceToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  disabled?: boolean;
}

const NiceToggle: React.FC<NiceToggleProps> = ({
  enabled,
  setEnabled,
  disabled = false,
}) => {
  const handleChange = useCallback(() => {
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  useEffect(() => {
    if (disabled) {
      setEnabled(false);
    }
  }, [disabled, setEnabled]);

  return (
    <div>
      <div>
        <label className="relative inline-block w-[64px] h-[32px]">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0"
            checked={enabled}
            onChange={handleChange}
            disabled={disabled}
          />
          <span
            className={`${
              disabled
                ? "bg-slate-200"
                : enabled
                  ? "bg-cyan-700"
                  : "ring-1 ring-cyan-700"
            } absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-colors rounded-full`}
          >
            <span
              className={`${
                disabled
                  ? "translate-x-[4px] bg-slate-400"
                  : enabled
                    ? "translate-x-[36px] bg-cyan-100"
                    : "translate-x-[4px] bg-cyan-700"
              } translate-y-1 inline-block w-6 h-6 transform bg-secondary rounded-full transition-transform`}
            />
          </span>
        </label>
      </div>
    </div>
  );
};

export default NiceToggle;
