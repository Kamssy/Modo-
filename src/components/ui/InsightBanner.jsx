import { useState } from "react";
import { Lightbulb, X } from "lucide-react";

const InsightBanner = ({ message, onDismiss }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div className="bg-gradient-to-r from-secondary-light to-white border border-secondary-deep border-l-4 rounded-md px-4 py-3.5 flex items-center gap-3.5 mb-5 animate-fade-up">
      <div className="shrink-0 text-secondary-deep">
        <Lightbulb size={22} />
      </div>
      <div className="text-[13px] text-ink-60 leading-relaxed flex-1">
        {message}
      </div>
      <button
        onClick={handleDismiss}
        className="shrink-0 text-ink-40 hover:text-ink-60 transition-colors cursor-pointer"
        aria-label="Dismiss insight"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default InsightBanner;
