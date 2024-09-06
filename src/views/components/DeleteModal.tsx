interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Löschen</h2>
        <p className="mb-6">
          Bist du sicher, dass du dieses Objekt löschen möchtest? Diese Aktion
          kann nicht rückgängig gemacht werden.
        </p>
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
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
