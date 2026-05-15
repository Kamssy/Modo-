import { useState } from "react";
import Card from "../../ui/Card";
import TrendBarChart from "../../ui/TrendBarChart";
import SpendingDonut from "../../ui/SpendingDonut";
import { useTransactions } from "../../../context/TransactionContext";
import { useAppContext } from "../../../context/AppContext";
import { TrendingDown, TrendingUp, AlertCircle } from "lucide-react";
import { 
  generateSpendingData, 
  getAvailableMonths,
  filterTransactionsByMonth,
} from "../../../utils/dataHelpers";

const InsightsPage = () => {
  const { transactions } = useTransactions();
  const { currency } = useAppContext();
  const [currentMonth, setCurrentMonth] = useState("May 2026");

  const formatCurrency = (val) => {
    return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(val || 0);
  };

  const monthlyTransactions = filterTransactionsByMonth(transactions, currentMonth);

  const monthlySpend = monthlyTransactions
    .filter(t => t.type === "debit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const monthlyIncome = monthlyTransactions
    .filter(t => t.type === "credit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const spendingData = generateSpendingData(monthlyTransactions);

  const highestCategory = spendingData.length > 0
    ? spendingData.reduce((prev, current) => (prev.value > current.value) ? prev : current)
    : null;

  const monthlyTrends = generateMonthlyTrends(transactions);
  const hasTrendData = monthlyTrends.some(t => t.income > 0 || t.expense > 0);

  const savingsRate = monthlyIncome > 0
    ? Math.round(((monthlyIncome - monthlySpend) / monthlyIncome) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-2">
        <h2 className="font-display text-[26px] text-ink mb-1">Financial Insights</h2>
        <p className="text-[13px] text-ink-40">
          Understand your spending patterns and financial health.
        </p>
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
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-expense/10 flex items-center justify-center">
              <TrendingDown size={12} className="text-expense" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink-40">Average Daily Spend</p>
          </div>
          <div className="text-2xl font-display text-ink">
            {monthlySpend > 0 ? formatCurrency(monthlySpend / 30) : "—"}
          </div>
          <p className="text-xs text-ink-40 mt-1">
            {monthlySpend > 0 ? "Based on this month" : "No spending data"}
          </p>
        </Card>

        <Card className="p-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <AlertCircle size={12} className="text-primary" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink-40">Highest Category</p>
          </div>
          <div className="text-2xl font-display text-ink">
            {highestCategory ? highestCategory.name : "—"}
          </div>
          <p className="text-xs text-ink-40 mt-1">
            {highestCategory ? `${formatCurrency(highestCategory.value)} this month` : "No spending data"}
          </p>
        </Card>

        <Card className="p-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-income/10 flex items-center justify-center">
              <TrendingUp size={12} className="text-income" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink-40">Savings Rate</p>
          </div>
          <div className="text-2xl font-display text-ink">
            {monthlyIncome > 0 ? `${savingsRate}%` : "—"}
          </div>
          <p className="text-xs text-ink-40 mt-1">
            {monthlyIncome > 0 ? "Of income saved" : "No income data"}
          </p>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Trend Chart */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold tracking-[0.03em] uppercase text-ink-60 mb-1">
              Cash Flow Trends
            </h3>
            <p className="text-xs text-ink-40">
              6-month historical view of income vs expenses
            </p>
          </div>
          {hasTrendData ? (
            <TrendBarChart data={monthlyTrends} />
          ) : (
            <div className="flex flex-col items-center justify-center h-[280px] text-center text-ink-40">
              <p className="font-medium">No trend data yet</p>
              <p className="text-xs mt-1">Add transactions to see your 6-month trend</p>
            </div>
          )}
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold tracking-[0.03em] uppercase text-ink-60 mb-1">
              Category Breakdown
            </h3>
            <p className="text-xs text-ink-40">
              Where your money is going this month
            </p>
          </div>
          {spendingData.length > 0 ? (
            <SpendingDonut
              data={spendingData}
              totalSpend={formatCurrency(monthlySpend)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-ink-40">
              <p className="font-medium">No spending data</p>
              <p className="text-xs mt-1">Add expenses to see your breakdown</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

// Kept here, not in dataHelpers
function generateMonthlyTrends(transactions) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthNames_full = ["January", "February", "March", "April", "May", "June",
                           "July", "August", "September", "October", "November", "December"];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const monthlyData = {};

  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    monthlyData[monthKey] = { income: 0, expense: 0 };
  }

  transactions.forEach(txn => {
    if (!txn.date) return;
    const monthMatch = monthNames_full.find(m => txn.date.includes(m));
    if (monthMatch) {
      const txnMonth = monthNames_full.indexOf(monthMatch);
      const monthKey = `${currentYear}-${txnMonth}`;
      if (monthlyData[monthKey]) {
        const amount = parseFloat(txn.amount?.replace(/[^0-9.-]+/g, "") || "0");
        if (txn.type === "credit") {
          monthlyData[monthKey].income += Math.abs(amount);
        } else {
          monthlyData[monthKey].expense += Math.abs(amount);
        }
      }
    }
  });

  const trends = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    const data = monthlyData[monthKey];
    trends.push({
      month: monthNames[date.getMonth()],
      income: Math.round(data.income),
      expense: Math.round(data.expense),
    });
  }

  return trends; // no mock fallback
}

export default InsightsPage;