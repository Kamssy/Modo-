import { useState } from "react";
import { useTransactions } from "../../../context/TransactionContext";
import Card from "../../ui/Card";
import TransactionItem from "../../ui/TransactionItem";
import { ArrowDownLeft, ArrowUpRight, Search, Filter } from "lucide-react";
import { useAppContext } from "../../../context/AppContext";
import { 
  filterTransactionsByMonth, 
  getAvailableMonths 
} from "../../../utils/dataHelpers";

const TransactionsPage = () => {
  const { transactions, monthlyIncome, monthlySpend } = useTransactions();
  const { currency } = useAppContext();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMonth, setCurrentMonth] = useState("May 2026");

  const formatCurrency = (val) => {
    return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(val);
  };

  // Filter by month first
  const monthlyTransactions = filterTransactionsByMonth(transactions, currentMonth);

  // Then apply type filter
  let filteredTransactions = monthlyTransactions.filter((txn) => {
    if (filter === "all") return true;
    return txn.type === filter;
  });

  // Then apply search
  filteredTransactions = filteredTransactions.filter((txn) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      txn.name?.toLowerCase().includes(searchLower) ||
      txn.category?.toLowerCase().includes(searchLower)
    );
  });

  // Calculate month totals
  const monthIncome = monthlyTransactions
    .filter(t => t.type === "credit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const monthExpense = monthlyTransactions
    .filter(t => t.type === "debit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-2">
        <h2 className="font-display text-[26px] text-ink mb-1">Transactions</h2>
        <p className="text-[13px] text-ink-40">
          Review your recent financial activity.
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

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 sm:p-5 flex items-center gap-4 bg-primary-light/30 border-none">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <ArrowDownLeft size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-ink-40 mb-0.5">Total In</p>
            <div className="text-lg sm:text-xl font-display text-ink">{formatCurrency(monthIncome)}</div>
          </div>
        </Card>
        <Card className="p-4 sm:p-5 flex items-center gap-4 bg-secondary-light/30 border-none">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <ArrowUpRight size={20} className="text-secondary-deep" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-ink-40 mb-0.5">Total Out</p>
            <div className="text-lg sm:text-xl font-display text-ink">{formatCurrency(monthExpense)}</div>
          </div>
        </Card>
      </div>

      {/* Transactions List Area */}
      <Card className="flex flex-col min-h-[500px]">
        {/* Controls */}
        <div className="p-4 sm:p-6 border-b border-ink-05 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex bg-ink-05 p-1 rounded-md self-start sm:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 text-[13px] font-semibold rounded-sm transition-all cursor-pointer ${
                filter === "all" ? "bg-white text-ink shadow-sm" : "text-ink-40 hover:text-ink-60"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("credit")}
              className={`px-4 py-1.5 text-[13px] font-semibold rounded-sm transition-all cursor-pointer ${
                filter === "credit" ? "bg-white text-income shadow-sm" : "text-ink-40 hover:text-ink-60"
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setFilter("debit")}
              className={`px-4 py-1.5 text-[13px] font-semibold rounded-sm transition-all cursor-pointer ${
                filter === "debit" ? "bg-white text-expense shadow-sm" : "text-ink-40 hover:text-ink-60"
              }`}
            >
              Expense
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-40" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-sm border border-ink-10 bg-ink-05/50 text-[13px] outline-none focus:border-primary transition-colors"
              />
            </div>
            <button className="w-9 h-9 flex items-center justify-center rounded-sm border border-ink-10 text-ink-60 hover:bg-ink-05 transition-colors cursor-pointer">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 sm:p-6 flex-1">
          {filteredTransactions.length > 0 ? (
            <div className="flex flex-col">
              {filteredTransactions.map((txn, index) => (
                <TransactionItem key={txn.id || index} {...txn} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-ink-40 opacity-70 mt-10">
              <div className="w-16 h-16 rounded-full bg-ink-05 flex items-center justify-center mb-3">
                <Search size={24} />
              </div>
              <p className="font-medium">No transactions found</p>
              <p className="text-xs mt-1">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TransactionsPage;
