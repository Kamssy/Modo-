import { useState } from "react";
import { X, CreditCard, Landmark } from "lucide-react";
import Button from "../ui/Button";
import { useCards } from "../../context/CardContext";

const CardModal = ({ isOpen, onClose }) => {
  const { addCard } = useCards();
  
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholder: "",
    expires: "",
    cvv: "",
    type: "debit"
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cardNumber || !formData.cardholder || !formData.expires) return;

    // Simulate linking a card
    const newCard = {
      id: Date.now(),
      balance: 0,
      income: 0,
      expense: 0,
      cardNumber: formData.cardNumber.slice(-4), // Only store last 4 digits
      status: "Active",
      cardholder: formData.cardholder,
      billing: "User Address",
      expires: formData.expires
    };

    addCard(newCard);
    
    // Reset and close
    setFormData({
      cardNumber: "",
      cardholder: "",
      expires: "",
      cvv: "",
      type: "debit"
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
      <div 
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-bg-card rounded-t-2xl sm:rounded-2xl shadow-float overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-05">
          <div className="flex items-center gap-2">
            <Landmark size={20} className="text-primary" />
            <h3 className="font-display text-lg text-ink">Link New Card</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-ink-05 text-ink-60 hover:text-ink hover:bg-ink-10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-ink-40">
              Cardholder Name
            </label>
            <input 
              type="text"
              required
              value={formData.cardholder}
              onChange={(e) => setFormData({...formData, cardholder: e.target.value})}
              placeholder="e.g. John Doe"
              className="w-full h-11 px-4 rounded-sm border border-ink-10 bg-bg-body dark:bg-bg-card text-sm text-ink outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-ink-40">
              Card Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-40">
                <CreditCard size={18} />
              </div>
              <input 
                type="text"
                required
                maxLength="16"
                value={formData.cardNumber}
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                placeholder="0000 0000 0000 0000"
                className="w-full h-11 pl-10 pr-4 rounded-sm border border-ink-10 bg-bg-body dark:bg-bg-card text-sm text-ink outline-none focus:border-primary focus:bg-white transition-colors font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-ink-40">
                Expiry Date
              </label>
              <input 
                type="text"
                required
                maxLength="5"
                value={formData.expires}
                onChange={(e) => setFormData({...formData, expires: e.target.value})}
                placeholder="MM/YY"
                className="w-full h-11 px-4 rounded-sm border border-ink-10 bg-bg-body dark:bg-bg-card text-sm text-ink outline-none focus:border-primary focus:bg-white transition-colors font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-ink-40">
                CVV
              </label>
              <input 
                type="password"
                required
                maxLength="4"
                value={formData.cvv}
                onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                placeholder="123"
                className="w-full h-11 px-4 rounded-sm border border-ink-10 bg-bg-body dark:bg-bg-card text-sm text-ink outline-none focus:border-primary focus:bg-white transition-colors font-mono"
              />
            </div>
          </div>
          
          <div className="p-3 bg-secondary-light/30 rounded-sm border border-secondary-light">
            <p className="text-[11px] text-ink-60 leading-relaxed text-center">
              Your card details are securely encrypted and handled by a PCI-DSS certified payment processor. Modo does not store your full card number.
            </p>
          </div>

          <Button type="submit" className="w-full h-12 text-[15px]">
            Link Card Securely
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CardModal;
