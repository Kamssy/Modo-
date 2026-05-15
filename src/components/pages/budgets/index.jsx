import { useState } from "react";
import Card from "../../ui/Card";
import BudgetCard from "../../ui/BudgetCard";
import Button from "../../ui/Button";
import { Plus, ShoppingCart, 
  Car, 
  UtensilsCrossed, 
  Zap, 
  Smartphone, 
  Heart } from "lucide-react";
import { useAppContext } from "../../../context/AppContext";
import { useBudgets } from "../../../context/BudgetContext";
import { useTransactions } from "../../../context/TransactionContext";
import BudgetModal from "../../modals/BudgetModal";
import { isCurrentMonth } from "../../../hooks/useCurrentMonth";
import { 
  getAvailableMonths, 
  filterTransactionsByMonth,
  generateSpendingData 
} from "../../../utils/dataHelpers";

const BudgetPage = () => {
  const { currency } = useAppContext();
  const { budgets, addBudget, editBudget } = useBudgets();
  const { transactions } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("May 2026");
  const [budgetToEdit, setBudgetToEdit] = useState(null);

  // Lock actions for past months
  const isPastMonth = !isCurrentMonth(currentMonth);

  // Get transactions for current month
  const monthlyTransactions = filterTransactionsByMonth(transactions, currentMonth);

  // Calculate actual spending by category from transactions
  const spendingByCategory = {};
  monthlyTransactions
    .filter(t => t.type === "debit")
    .forEach(txn => {
      const category = txn.category || "Other";
      const amount = Math.abs(parseFloat(txn.amount?.replace(/[^0-9.-]+/g, "") || "0"));
      
      if (!spendingByCategory[category]) {
        spendingByCategory[category] = 0;
      }
      spendingByCategory[category] += amount;
    });

  // Update budgets with actual spending
  const budgetsWithActualSpending = budgets.map(budget => ({
    ...budget,
    spent: spendingByCategory[budget.name] || 0
  }));

  const totalBudget = budgetsWithActualSpending.reduce((acc, curr) => acc + curr.budget, 0);
  const totalSpent = budgetsWithActualSpending.reduce((acc, curr) => acc + curr.spent, 0);
  const totalPercentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
  const savingsPotential = totalBudget - totalSpent;

  const formatCurrency = (val) => {
    const amount = val || 0;
    return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleEditBudget = (budget) => {
    setBudgetToEdit(budget);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBudgetToEdit(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-[26px] text-ink mb-1">Budget Ecosystem</h2>
          <p className="text-[13px] text-ink-40">
            Monitor and adjust your financial boundaries.
          </p>
        </div>
        <Button className="gap-2 sm:self-start"
          disabled={isPastMonth}
          onClick={() => {
            if (isPastMonth) return;
            setBudgetToEdit(null);
            setIsModalOpen(true);
        }}>
          <Plus size={18} />
          <span>{isPastMonth ? "View Only" : "Create Budget"}</span>
        </Button>
      </div>

      {/* Month Selector */}
      <div className="flex items-center gap-3">
        <select 
          value={currentMonth}
          onChange={(e) => setCurrentMonth(e.target.value)}
          className="h-10 px-4 rounded-sm border border-ink-10 bg-white text-sm font-medium text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer"
        >
          {getAvailableMonths().map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

         {/* Past month indicator */}
        {isPastMonth && (
          <span className="text-xs font-medium text-ink-40 bg-ink-05 px-3 py-1.5 rounded-full">
          </span>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-6 bg-primary text-white border-none">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-1">Total Monthly Budget</p>
          <div className="text-3xl font-display mb-4">{formatCurrency(totalBudget)}</div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full transition-[width] duration-600" style={{ width: `${totalPercentage}%` }} />
          </div>
          <p className="text-[11px] mt-2 text-white/80 font-medium">{totalPercentage}% of total limit used</p>
        </Card>

        <Card className="p-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-ink-40 mb-1">Total Spent</p>
          <div className="text-3xl font-display text-ink mb-1">{formatCurrency(totalSpent)}</div>
          <p className="text-[12px] text-expense font-semibold">
            {savingsPotential > 0 ? `↓ ${formatCurrency(savingsPotential)} remaining` : `↑ Over by ${formatCurrency(Math.abs(savingsPotential))}`}
          </p>
        </Card>

        <Card className="p-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-ink-40 mb-1">Savings Potential</p>
          <div className="text-3xl font-display text-income mb-1">{formatCurrency(Math.max(0, savingsPotential))}</div>
          <p className="text-[12px] text-ink-40 font-medium">If limits are respected</p>
        </Card>
      </div>

      {/* Categories Grid */}
      <div>
        <h3 className="font-display text-xl text-ink mb-5">Category Budgets</h3>
        {budgetsWithActualSpending.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {budgetsWithActualSpending.map((budget) => (
              <BudgetCard 
                key={budget.id} 
                {...budget}
                onEdit={() => handleEditBudget(budget)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-ink-05 flex items-center justify-center mb-4">
              <Plus size={24} className="text-ink-40" />
            </div>
            <h3 className="font-display text-xl text-ink mb-2">No Budgets Created</h3>
            <p className="text-sm text-ink-40 mb-6 max-w-sm">
              Create your first budget to start tracking your spending limits and stay on top of your finances.
            </p>
            <Button onClick={() => {
              setBudgetToEdit(null);
              setIsModalOpen(true);
            }}>Create Budget</Button>
          </Card>
        )}
      </div>
      
      <BudgetModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        budgetToEdit={budgetToEdit}
      />
    </div>
  );
};

export default BudgetPage;
