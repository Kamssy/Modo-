import { useState } from "react";
import Card from "./Card";
import { useGoals } from "../../context/GoalContext";
import GoalModal from "../modals/GoalModal";
import { Target as TargetIcon } from "lucide-react";

const iconMap = {
  Target: TargetIcon,
};

const GoalCard = ({
  name,
  target,
  saved,
  percentage,
  icon,
  className = "",
  id,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteGoal } = useGoals();

  const DisplayIcon = (typeof icon === "string" ? iconMap[icon] : icon) || TargetIcon;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(val || 0);
  };

  const goalToEdit = { id, name, target, saved, percentage, icon: typeof icon === "string" ? icon : "Target" };

  return (
    <>
      <Card className={`p-5 animate-fade-up ${className}`}>
        <div className="w-10 h-10 rounded-sm bg-primary-light flex items-center justify-center mb-2.5">
          <DisplayIcon size={20} className="text-primary" />
        </div>
        <div className="text-sm font-semibold text-ink mb-1">{name}</div>
        <div className="text-[11.5px] text-ink-40 mb-3.5">
          Target: {formatCurrency(target)}
        </div>

        <div className="h-[7px] bg-ink-10 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-mid transition-[width] duration-600 ease-smooth"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center mb-3">
          <span className="text-[13px] font-semibold text-ink">
            {formatCurrency(saved)}
          </span>
          <span className="text-[11px] font-semibold text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
            {percentage}%
          </span>
        </div>

        <div className="flex gap-2 pt-3 border-t border-ink-05">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex-1 text-[11px] font-bold text-primary hover:opacity-70 transition-opacity uppercase tracking-widest cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => deleteGoal(id)}
            className="flex-1 text-[11px] font-bold text-expense hover:opacity-70 transition-opacity uppercase tracking-widest cursor-pointer"
          >
            Delete
          </button>
        </div>
      </Card>

      <GoalModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        goalToEdit={goalToEdit}
      />
    </>
  );
};

export default GoalCard;