import { useState } from "react";
import { useTransactions } from "../../context/TransactionContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { 
  ShoppingCart, 
  Car, 
  UtensilsCrossed, 
  Zap, 
  Smartphone, 
  Tv, 
  Heart, 
  Briefcase, 
  TrendingUp, 
  Gift,
  Plus
} from "lucide-react";

const CATEGORIES = {
  expense: [
    { id: "groceries", label: "Groceries", icon: ShoppingCart },
    { id: "transport", label: "Transport", icon: Car },
    { id: "food", label: "Food", icon: UtensilsCrossed },
    { id: "bills", label: "Bills", icon: Zap },
    { id: "entertainment", label: "Fun", icon: Smartphone },
    { id: "health", label: "Health", icon: Heart },
  ],
  income: [
    { id: "salary", label: "Salary", icon: Briefcase },
    { id: "investment", label: "Investment", icon: TrendingUp },
    { id: "gift", label: "Gift", icon: Gift },
    { id: "side-hustle", label: "Side Hustle", icon: Plus },
  ],
};

const AddEntryModal = ({ isOpen, onClose }) => {
  const { addTransaction } = useTransactions();
  const [activeTab, setActiveTab] = useState("expense");
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    note: "",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData({ ...formData, category: "" });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!formData.amount || !formData.category) return;

  const selectedCategory = CATEGORIES[activeTab].find(c => c.id === formData.category);

  addTransaction({
    name: formData.note || selectedCategory.label,
    category: selectedCategory.label,
    categoryId: formData.category,  // ✅ STORE ID INSTEAD OF ICON
    amount: activeTab === "expense" ? `-₦${formData.amount}` : `+₦${formData.amount}`,
    type: activeTab === "expense" ? "debit" : "credit",
  });

  setFormData({ amount: "", category: "", note: "" });
  onClose();
};

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Entry">
      {/* Tabs */}
      <div className="flex bg-ink-05 p-1 rounded-md mb-6">
        <button
          onClick={() => handleTabChange("expense")}
          className={`flex-1 py-2 text-sm font-semibold rounded-sm transition-all cursor-pointer ${
            activeTab === "expense"
              ? "bg-white text-expense shadow-sm"
              : "text-ink-40 hover:text-ink-60"
          }`}
        >
          Expense
        </button>
        <button
          onClick={() => handleTabChange("income")}
          className={`flex-1 py-2 text-sm font-semibold rounded-sm transition-all cursor-pointer ${
            activeTab === "income"
              ? "bg-white text-income shadow-sm"
              : "text-ink-40 hover:text-ink-60"
          }`}
        >
          Income
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Amount Input */}
        <div className="text-center mb-6">
          <label className="block text-[11px] font-semibold text-ink-40 tracking-widest uppercase mb-2">
            Amount (₦)
          </label>
          <div className="relative inline-block w-full">
            <input
              type="number"
              placeholder="0.00"
              className="w-full text-center font-display text-4xl text-ink bg-transparent outline-none border-b-2 border-ink-10 focus:border-primary transition-colors py-2"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              autoFocus
              required
            />
          </div>
        </div>

        {/* Category Picker */}
        <div>
          <label className="block text-[11px] font-semibold text-ink-40 tracking-widest uppercase mb-3">
            Select Category
          </label>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES[activeTab].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFormData({ ...formData, category: cat.id })}
                className={`
                  flex flex-col items-center gap-2 p-3 rounded-md border transition-all cursor-pointer
                  ${
                    formData.category === cat.id
                      ? "border-primary bg-primary-light text-primary"
                      : "border-ink-10 bg-white text-ink-60 hover:border-ink-20"
                  }
                `}
              >
                <cat.icon size={20} />
                <span className="text-[11px] font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Note Input */}
        <Input
          label="Note (Optional)"
          placeholder="e.g. Lunch with friends"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 text-base"
          variant={activeTab === "expense" ? "primary" : "secondary"}
        >
          Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </Button>
      </form>
    </Modal>
  );
};

export default AddEntryModal;
