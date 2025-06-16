import { ModalProps } from "@/interfaces/Challenge/ChallengeModalProps";
import React from "react";

const Modal: React.FC<ModalProps> = ({ isOpen, message, title = "Notice", onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-7 rounded-lg shadow-xl max-w-xl w-1/2 sm:max-w-full">
        <h2 className="text-2xl mb-3">
          <b>{title}</b>
        </h2>
        <p className="text-lg mb-4">{message}</p>
        <div className="flex flex-col items-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-theme-color-primary text-white rounded-lg hover:bg-theme-color-primary-dark"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
