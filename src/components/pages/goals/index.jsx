import { useState } from "react";
import Card from "../../ui/Card";
import GoalCard from "../../ui/GoalCard";
import Button from "../../ui/Button";
import { Plus, Target, Trophy } from "lucide-react";

import { useAppContext } from "../../../context/AppContext";
import { useGoals } from "../../../context/GoalContext";
import GoalModal from "../../modals/GoalModal";

const GoalsPage = () => {
  const { currency } = useAppContext();
  const { goals } = useGoals();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate totals from context data
  const totalTarget = goals.reduce((acc, goal) => acc + (goal.target || 0), 0);
  const totalSaved = goals.reduce((acc, goal) => acc + (goal.saved || 0), 0);
  const overallPercentage = Math.round((totalSaved / (totalTarget || 1)) * 100) || 0;

  const formatCurrency = (val) => {
    const amount = val || 0;
    return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-[26px] text-ink mb-1">Savings Goals</h2>
          <p className="text-[13px] text-ink-40">
            Track your progress toward your financial milestones.
          </p>
        </div>
        <Button 
          className="gap-2 sm:self-start"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          <span>New Goal</span>
        </Button>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-6 bg-secondary-deep text-white border-none flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Trophy size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/60">Total Saved</p>
              <div className="text-2xl font-display text-white">{formatCurrency(totalSaved)}</div>
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-secondary rounded-full relative transition-[width] duration-600" 
              style={{ width: `${overallPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 text-xs font-medium">
            <span className="text-secondary">{overallPercentage}% Overall Progress</span>
            <span className="text-white/60">Target: {formatCurrency(totalTarget)}</span>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-warn/10 flex items-center justify-center">
              <Target size={24} className="text-warn" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-ink-40 mb-1">Active Goals</p>
              <div className="text-3xl font-display text-ink">{goals.length}</div>
            </div>
          </div>
          <p className="text-sm text-ink-60">
            You are currently working towards {goals.length} active financial target{goals.length !== 1 ? 's' : ''}. Keep it up!
          </p>
        </Card>
      </div>

      {/* Goals Grid */}
      <div>
        <h3 className="font-display text-xl text-ink mb-5">Your Targets</h3>
        {goals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {goals.map((goal) => (
              <GoalCard key={goal.id} {...goal} id={goal.id} />
            ))}
            
            {/* Create New Goal Card */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed border-ink-10 hover:border-primary hover:bg-primary-light/5 transition-colors group cursor-pointer min-h-[160px]"
            >
              <div className="w-12 h-12 rounded-full bg-ink-05 flex items-center justify-center mb-3 group-hover:bg-primary-light transition-colors">
                <Plus size={24} className="text-ink-40 group-hover:text-primary transition-colors" />
              </div>
              <span className="font-display text-lg text-ink-60 group-hover:text-primary transition-colors">Create New Goal</span>
              <span className="text-xs text-ink-40 mt-1">Set a new savings target</span>
            </button>
          </div>
        ) : (
          <Card className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-ink-05 flex items-center justify-center mb-4">
              <Target size={24} className="text-ink-40" />
            </div>
            <h3 className="font-display text-xl text-ink mb-2">No Goals Yet</h3>
            <p className="text-sm text-ink-40 mb-6 max-w-sm">
              Create your first savings goal to start tracking your progress towards your financial dreams.
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus size={18} />
              Create Goal
            </Button>
          </Card>
        )}
      </div>
      
      <GoalModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default GoalsPage;
