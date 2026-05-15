import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={`relative w-full ${maxWidth} bg-white rounded-lg shadow-float animate-scale-up overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-10">
          <h3 className="font-display text-xl text-ink">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-ink-40 hover:text-ink-60 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
