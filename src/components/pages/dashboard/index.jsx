import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../../../context/TransactionContext";
import { useCards } from "../../../context/CardContext";
import Card from "../../ui/Card";
import StatCard from "../../ui/StatCard";
import WalletCard from "../../ui/WalletCard";
import CashFlowChart from "../../ui/CashFlowChart";
import SpendingDonut from "../../ui/SpendingDonut";
import BudgetProgressItem from "../../ui/BudgetProgressItem";
import GoalCard from "../../ui/GoalCard";
import TransactionItem from "../../ui/TransactionItem";
import InsightBanner from "../../ui/InsightBanner";import { isCurrentMonth } from "../../../hooks/useCurrentMonth";

import { Plus, ArrowLeftRight, BarChart3, Target, BellRing, Wallet, ArrowDownLeft, ArrowUpRight, PiggyBank } from "lucide-react";

import { 
  generateCashFlowData, 
  generateSpendingData,
  generateSpendingAlerts,
  getAvailableMonths,
  filterTransactionsByMonth
} from "../../../utils/dataHelpers";

import { useAppContext } from "../../../context/AppContext";
import { useBudgets } from "../../../context/BudgetContext";
import { useGoals } from "../../../context/GoalContext";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { transactions, totalBalance } = useTransactions();
  const { currency } = useAppContext();
  const { budgets } = useBudgets();
  const { goals } = useGoals();
  const { cards } = useCards();

  const [currentMonth, setCurrentMonth] = useState("May 2026");
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  const availableMonths = getAvailableMonths();

  // Current month transactions
  const monthlyTransactions = filterTransactionsByMonth(transactions, currentMonth);

  const monthlyInc = monthlyTransactions
    .filter(t => t.type === "credit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const monthlyExp = monthlyTransactions
    .filter(t => t.type === "debit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const totalIncome = transactions
    .filter(t => t.type === "credit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const totalExpenses = transactions
    .filter(t => t.type === "debit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  // Last month transactions
  const currentMonthIndex = availableMonths.indexOf(currentMonth);
  const lastMonth = currentMonthIndex > 0 ? availableMonths[currentMonthIndex - 1] : null;
  const lastMonthTransactions = lastMonth ? filterTransactionsByMonth(transactions, lastMonth) : [];

  const lastMonthInc = lastMonthTransactions
    .filter(t => t.type === "credit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const lastMonthExp = lastMonthTransactions
    .filter(t => t.type === "debit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const currentSaved = monthlyInc - monthlyExp;
  const lastMonthSaved = lastMonthInc - lastMonthExp;

  // Calculate percentage change
  const calcChange = (current, previous) => {
    if (previous === 0) return null;
    const diff = ((current - previous) / Math.abs(previous)) * 100;
    return {
      value: `${Math.abs(Math.round(diff))}%`,
      direction: diff >= 0 ? "up" : "down",
    };
  };

  const balanceChange = calcChange(totalBalance, totalBalance - currentSaved);
  const incomeChange = calcChange(monthlyInc, lastMonthInc);
  const expenseChange = calcChange(monthlyExp, lastMonthExp);
  const savingsChange = calcChange(currentSaved, lastMonthSaved);

  const formatCurrency = (val) => {
    const amount = val || 0;
    return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      label: "Total Balance",
      value: formatCurrency(totalBalance),
      change: balanceChange?.value || null,
      changeDirection: balanceChange?.direction || "up",
      icon: Wallet,
      variant: "balance",
    },
    {
      label: "Monthly Income",
      value: formatCurrency(monthlyInc),
      change: incomeChange?.value || null,
      changeDirection: incomeChange?.direction || "up",
      icon: ArrowDownLeft,
      variant: "income",
    },
    {
      label: "Monthly Spend",
      value: formatCurrency(monthlyExp),
      change: expenseChange?.value || null,
      changeDirection: expenseChange?.direction || "up",
      icon: ArrowUpRight,
      variant: "expense",
    },
    {
      label: "Saved This Month",
      value: formatCurrency(currentSaved),
      change: savingsChange?.value || null,
      changeDirection: savingsChange?.direction || "up",
      icon: PiggyBank,
      variant: "savings",
    },
  ];

  // Generate dynamic data
  const cashFlowData = generateCashFlowData(monthlyTransactions, currentMonth);
  const spendingBreakdown = generateSpendingData(monthlyTransactions);
  const alerts = generateSpendingAlerts(budgets, budgets);

  const quickActions = [
    {
      label: "Add Expense",
      icon: Plus,
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
      onClick: () => {},
      disabled: !isCurrentMonth(currentMonth),
    },
    {
      label: "Transfer",
      icon: ArrowLeftRight,
      iconBg: "bg-[rgba(77,175,124,0.12)]",
      iconColor: "text-income",
      onClick: () => navigate("/transactions"),
    },
    {
      label: "Report",
      icon: BarChart3,
      iconBg: "bg-[rgba(74,144,217,0.12)]",
      iconColor: "text-info",
      onClick: () => navigate("/insights"),
    },
    {
      label: "Set Goal",
      icon: Target,
      iconBg: "bg-[rgba(240,180,41,0.12)]",
      iconColor: "text-warn",
      onClick: () => navigate("/goals"),
    },
    {
      label: "Alerts",
      icon: BellRing,
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary-deep",
      onClick: () => navigate("/settings?tab=notifications"),
    },
  ];

  return (
    <div>
      {/* Month Selector */}
      <div className="mb-6 flex items-center gap-3">
        <select
          value={currentMonth}
          onChange={(e) => setCurrentMonth(e.target.value)}
          className="h-10 px-4 rounded-sm border border-ink-10 bg-white text-sm font-medium text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer"
        >
          {availableMonths.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {/* Insight Banner */}
      {alerts && alerts[0] && !dismissedAlerts.includes(0) && (
        <InsightBanner
          message={alerts[0].message}
          onDismiss={() => setDismissedAlerts([...dismissedAlerts, 0])}
        />
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            {...stat}
            style={{ animationDelay: `${index * 0.05}s` }}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2.5 mb-5 overflow-x-auto pb-1 sm:overflow-visible">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="
              flex-1 min-w-[80px] bg-white border border-ink-10 rounded-md
              py-3.5 px-2.5 flex flex-col items-center gap-[7px]
              cursor-pointer shadow-card
              transition-all duration-200 ease-smooth
              hover:border-primary hover:-translate-y-0.5 hover:shadow-elevated
            "
          >
            <div className={`w-[38px] h-[38px] rounded-sm flex items-center justify-center ${action.iconBg}`}>
              <action.icon size={17} className={action.iconColor} />
            </div>
            <span className="text-[11.5px] font-medium text-ink-60">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          {/* Cash Flow Chart */}
          <Card className="p-6 animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
              <div>
                <h3 className="text-[13px] font-semibold tracking-[0.03em] uppercase text-ink-60">
                  Cash Flow
                </h3>
                <p className="text-xs text-ink-40 mt-0.5">
                  Income vs Expenses — {currentMonth}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-ink-60">
                  <span className="inline-block w-4 h-[2.5px] bg-primary rounded-sm" />
                  Income
                </div>
                <div className="flex items-center gap-1.5 text-xs text-ink-60">
                  <span className="inline-block w-4 h-[2px] bg-secondary-deep rounded-sm border-t-2 border-dashed border-secondary-deep" />
                  Expenses
                </div>
                <button
                  onClick={() => navigate("/insights")}
                  className="text-xs text-primary font-medium hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Full report →
                </button>
              </div>
            </div>
            {cashFlowData.length > 0 ? (
              <CashFlowChart data={cashFlowData} />
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-center text-ink-40">
                <p className="font-medium">No data yet</p>
                <p className="text-xs mt-1">Add transactions to see your cash flow</p>
              </div>
            )}
          </Card>

          {/* Budget Progress */}
          <Card className="p-6 animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[13px] font-semibold tracking-[0.03em] uppercase text-ink-60">
                Budget Progress
              </h3>
              <button
                onClick={() => navigate("/budget")}
                className="text-xs text-primary font-medium hover:opacity-70 transition-opacity cursor-pointer"
              >
                Manage →
              </button>
            </div>
            {budgets.length > 0 ? (
              budgets.slice(0, 3).map((item) => (
                <BudgetProgressItem key={item.id || item.name} {...item} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-ink-40">
                <p className="font-medium">No budgets yet</p>
                <p className="text-xs mt-1">Create a budget to track your spending</p>
              </div>
            )}
          </Card>

          {/* Active Goals */}
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="font-display text-[17px] text-ink">Active Goals</h2>
              <button
                onClick={() => navigate("/goals")}
                className="text-xs text-primary font-medium hover:opacity-70 transition-opacity cursor-pointer"
              >
                All goals →
              </button>
            </div>
            {goals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {goals.slice(0, 3).map((goal) => (
                  <GoalCard key={goal.id || goal.name} {...goal} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-ink-40">
                <p className="font-medium">No goals yet</p>
                <p className="text-xs mt-1">Set a savings goal to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-5">
          {/* Wallet Card */}
          <WalletCard
            balance={formatCurrency(totalBalance)}
            income={`+${formatCurrency(totalIncome)}`}
            expense={`-${formatCurrency(totalExpenses)}`}
            cardNumber={cards[0] ? `•••• •••• ${cards[0].cardNumber}` : "•••• •••• ••••"}
          />

          {/* Spending Breakdown */}
          <Card className="p-6 animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[13px] font-semibold tracking-[0.03em] uppercase text-ink-60">
                Spending Breakdown
              </h3>
              <button
                onClick={() => navigate("/insights")}
                className="text-xs text-primary font-medium hover:opacity-70 transition-opacity cursor-pointer"
              >
                Details →
              </button>
            </div>
            {spendingBreakdown.length > 0 ? (
              <SpendingDonut
                data={spendingBreakdown}
                totalSpend={formatCurrency(monthlyExp)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-ink-40">
                <p className="font-medium">No spending yet</p>
                <p className="text-xs mt-1">Add expenses to see your breakdown</p>
              </div>
            )}
          </Card>

          {/* Recent Transactions */}
          <Card className="p-6 animate-fade-up">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[13px] font-semibold tracking-[0.03em] uppercase text-ink-60">
                Recent Transactions
              </h3>
              <button
                onClick={() => navigate("/transactions")}
                className="text-xs text-primary font-medium hover:opacity-70 transition-opacity cursor-pointer"
              >
                All →
              </button>
            </div>
            {monthlyTransactions.length > 0 ? (
              <div className="flex flex-col">
                {monthlyTransactions.slice(0, 5).map((txn, index) => (
                  <TransactionItem key={txn.id || index} {...txn} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-ink-40">
                <p className="font-medium">No transactions yet</p>
                <p className="text-xs mt-1">Add a transaction to get started</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;