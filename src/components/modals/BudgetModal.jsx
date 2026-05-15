import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../ui/Button";
import { useBudgets } from "../../context/BudgetContext";
import { useAppContext } from "../../context/AppContext";

const BudgetModal = ({ isOpen, onClose, budgetToEdit = null }) => {
  const { addBudget, editBudget } = useBudgets();
  const { currency } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    spent: 0,
    color: "#e05a6b",
  });

  useEffect(() => {
    if (budgetToEdit) {
      setFormData(budgetToEdit);
    } else {
      setFormData({ name: "", budget: "", spent: 0, color: "#e05a6b" });
    }
  }, [budgetToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.budget) return;

    const budgetData = {
      ...formData,
      id: budgetToEdit ? budgetToEdit.id : Date.now(),
      budget: parseFloat(formData.budget),
      spent: parseFloat(formData.spent || 0),
    };

    if (budgetToEdit) {
      editBudget(budgetData);
    } else {
      addBudget(budgetData);
    }
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
          <h3 className="font-display text-lg text-ink">
            {budgetToEdit ? "Edit Budget" : "Create New Budget"}
          </h3>
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
              Category Name
            </label>
            <input 
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Groceries"
              className="w-full h-11 px-4 rounded-sm border border-ink-10 bg-bg-body dark:bg-bg-card text-sm text-ink outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-ink-40">
              Monthly Limit ({currency})
            </label>
            <input 
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              placeholder="0.00"
              className="w-full h-11 px-4 rounded-sm border border-ink-10 bg-bg-body dark:bg-bg-card text-sm text-ink outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-ink-40">
              Theme Color
            </label>
            <div className="flex items-center gap-3">
              <input 
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className="w-11 h-11 p-1 rounded-sm border border-ink-10 cursor-pointer bg-white"
              />
              <span className="text-sm text-ink-60 font-mono uppercase">{formData.color}</span>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-[15px]">
            {budgetToEdit ? "Save Changes" : "Create Budget"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;
