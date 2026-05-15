import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../ui/Button";
import { useGoals } from "../../context/GoalContext";
import { useAppContext } from "../../context/AppContext";

const GoalModal = ({ isOpen, onClose, goalToEdit = null }) => {
  const { addGoal, editGoal } = useGoals();
  const { currency } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: "",
    target: "",
    saved: "",
  });

  useEffect(() => {
  if (goalToEdit) {
    setFormData({
      name: goalToEdit.name,
      target: goalToEdit.target || "",
      saved: goalToEdit.saved || "",
    });
  } else {
    setFormData({ name: "", target: "", saved: "" });
  }
}, [goalToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!formData.name || !formData.target) return;

  const goalData = {
    id: goalToEdit ? goalToEdit.id : Date.now(),
    name: formData.name,
    target: parseFloat(formData.target) || 0,
    saved: parseFloat(formData.saved) || 0,
    percentage: Math.min(100, Math.round(((parseFloat(formData.saved) || 0) / (parseFloat(formData.target) || 1)) * 100)),
    icon: "Target", // always default to Target string
  };

  if (goalToEdit) {
    editGoal(goalData);
  } else {
    addGoal(goalData);
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
            {goalToEdit ? "Edit Goal" : "Create New Goal"}
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
              Goal Name
            </label>
            <input 
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Vacation Fund"
              className="w-full h-11 px-4 rounded-sm border border-ink-10 bg-bg-body dark:bg-bg-card text-sm text-ink outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-ink-40">
              Target Amount ({currency})
            </label>
            <input 
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.target}
              onChange={(e) => setFormData({...formData, target: e.target.value})}
              placeholder="0.00"
              className="w-full h-11 px-4 rounded-sm border border-ink-10 bg-bg-body dark:bg-bg-card text-sm text-ink outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-ink-40">
              Already Saved ({currency})
            </label>
            <input 
              type="number"
              min="0"
              step="0.01"
              value={formData.saved}
              onChange={(e) => setFormData({...formData, saved: e.target.value})}
              placeholder="0.00"
              className="w-full h-11 px-4 rounded-sm border border-ink-10 bg-bg-body dark:bg-bg-card text-sm text-ink outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>

          <Button type="submit" className="w-full h-12 text-[15px]">
            {goalToEdit ? "Save Changes" : "Create Goal"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;
