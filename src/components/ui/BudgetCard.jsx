import { useState } from "react";
import Card from "./Card";
import ProgressBar from "./ProgressBar";
import { useBudgets } from "../../context/BudgetContext";
import BudgetModal from "../modals/BudgetModal";
import { PieChart } from "lucide-react";

const BudgetCard = ({ name, spent, budget, color, icon: Icon, id, onEdit, readOnly = false }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteBudget } = useBudgets();

  const percentage = Math.min(100, Math.round((spent / budget) * 100));
  const remaining = budget - spent;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(val);
  };

  const DisplayIcon = Icon || PieChart;
  const budgetToEdit = { id, name, budget, spent, color };

  return (
    <>
      <Card className="p-5 lg:p-6 animate-fade-up">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-sm flex items-center justify-center"
              style={{ backgroundColor: `${color}15`, color: color }}
            >
              <DisplayIcon size={20} />
            </div>
            <div>
              <h4 className="text-[15px] font-semibold text-ink">{name}</h4>
              <p className="text-[11px] text-ink-40 uppercase tracking-wider font-medium">
                Monthly Limit
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[15px] font-display text-ink">
              {formatCurrency(budget)}
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-ink-60">Spent: {formatCurrency(spent)}</span>
            <span className={remaining < 0 ? "text-expense" : "text-ink-40"}>
              {remaining < 0 ? "Over by " : "Left: "}
              {formatCurrency(Math.abs(remaining))}
            </span>
          </div>
          <ProgressBar value={spent} max={budget} color={color} className="h-2" />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-ink-05">
          <span className="text-[11px] font-semibold text-ink-40 uppercase tracking-widest">
            {percentage}% Consumed
          </span>
          {!readOnly && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-[11px] font-bold text-primary hover:opacity-70 transition-opacity uppercase tracking-widest cursor-pointer"
            >
              Edit Budget
            </button>
          )}
        </div>
      </Card>

      {/* only render modal if not readOnly */}
      {!readOnly && (
        <BudgetModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          budgetToEdit={budgetToEdit}
        />
      )}
    </>
  );
};

export default BudgetCard;