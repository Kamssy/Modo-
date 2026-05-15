import { createContext, useContext, useState, useEffect } from "react";
import { transactionsData as mockTransactions } from "../data/mock";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("modo_transactions");
    if (savedTransactions) {
      try {
        const parsed = JSON.parse(savedTransactions);
        // Merge: keep user transactions, add mock ones that don't already exist
        const userIds = new Set(parsed.map(t => t.id));
        const mergedMock = mockTransactions.filter(t => !userIds.has(t.id));
        setTransactions([...parsed, ...mergedMock]);
      } catch (e) {
        console.error("Failed to parse transactions", e);
        setTransactions(mockTransactions);
      }
    } else {
      setTransactions(mockTransactions);
    }
  }, []);

  useEffect(() => {
    // Only save non-mock transactions to localStorage
    const userTransactions = transactions.filter(t => !t.id.startsWith("mock-"));
    if (userTransactions.length > 0) {
      localStorage.setItem("modo_transactions", JSON.stringify(userTransactions));
    }
  }, [transactions]);

  const addTransaction = (transaction) => {
    // Add new transaction to the beginning of the list
    setTransactions((prev) => [
      {
        ...transaction,
        id: Date.now().toString(),
        date: new Date().toLocaleString("en-NG", {
          day: "numeric",
          month: "long",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).replace(",", ""),
      },
      ...prev,
    ]);
  };

  const deleteTransaction = (id) => {
    // Prevent deleting mock transactions
    if (id.startsWith("mock-")) return;
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Calculate totals
  const totalBalance = transactions.reduce((acc, curr) => {
    const amount = parseFloat(curr.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0;
    return curr.type === "credit" ? acc + amount : acc - amount;
  }, 0);

  const monthlyIncome = transactions
    .filter((t) => t.type === "credit")
    .reduce((acc, curr) => acc + (parseFloat(curr.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const monthlySpend = transactions
    .filter((t) => t.type === "debit")
    .reduce((acc, curr) => acc + (parseFloat(curr.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  // Expose transactions and raw numbers. Formatting is handled by components.
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        totalBalance,
        monthlyIncome,
        monthlySpend,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};
