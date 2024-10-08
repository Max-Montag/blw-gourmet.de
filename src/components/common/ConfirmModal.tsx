const standardText =
  "Bist du sicher, dass du diese Aktion durchführen möchtest?";
const standartButtonText = "Löschen";

interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text?: string;
  buttonText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  onClose,
  onConfirm,
  text,
  buttonText,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div role="dialog" className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Bestätigen</h2>
        <p className="mb-6">{text || standardText}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            {buttonText || standartButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
