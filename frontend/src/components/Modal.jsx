import { X } from "lucide-react";
import React from "react";

const Modal = ({ isOpen, onClose, children, tittle }) => {
  if (!isOpen) return null;

  // prevent clicks inside modal from closing it
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose} // close on backdrop click
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={handleContentClick}
        className="relative p-4 w-full max-w-2xl max-h-[90vh]"
      >
        {/* Modal box */}
        <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 rounded-t-xl">
            <h3 className="text-xl font-semibold text-gray-800">{tittle}</h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 rounded-lg p-2 transition-colors"
            >
              <X className="w-4 h-4" size={15} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 md:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
