// Data Helpers - Generate dynamic data based on month and transactions

/**
 * Get month from string like "May 2025"
 */
export const parseMonthString = (monthStr) => {
  const months = ["January", "February", "March", "April", "May", "June", 
                 "July", "August", "September", "October", "November", "December"];
  const [monthName, year] = monthStr.split(" ");
  const monthIndex = months.indexOf(monthName);
  return { month: monthIndex, year: parseInt(year) };
};

/**
 * Generate cash flow data for a specific month from transactions
 */
export const generateCashFlowData = (transactions, monthStr = "May 2026") => {
  const { month, year } = parseMonthString(monthStr);

  // Return empty instead of mock data
  if (!transactions || transactions.length === 0) {
    return [];
  }

  const dayData = {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    dayData[day] = { income: 0, expenses: 0 };
  }

  transactions.forEach(txn => {
    if (!txn.date) return;
    const dayMatch = txn.date.match(/^(\d+)/);
    if (dayMatch) {
      const day = parseInt(dayMatch[1]);
      const amount = parseFloat(txn.amount?.replace(/[^0-9.-]+/g, "") || "0");
      if (txn.type === "credit") {
        dayData[day].income += Math.abs(amount);
      } else {
        dayData[day].expenses += Math.abs(amount);
      }
    }
  });

  const chartData = [];
  for (let day = 1; day <= daysInMonth; day += 5) {
    chartData.push({
      date: day === 1 ? `1 ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][month]}` : `${day}`,
      income: dayData[day]?.income || 0,
      expenses: dayData[day]?.expenses || 0,
    });
  }

  return chartData; // return empty array if no data, no fallback
};

/**
 * Calculate spending by category
 */
export const generateSpendingData = (transactions) => {
  const categoryTotals = {};

  transactions
    .filter(t => t.type === "debit")
    .forEach(txn => {
      const category = txn.category || "Other";
      const amount = Math.abs(parseFloat(txn.amount?.replace(/[^0-9.-]+/g, "") || "0"));
      
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }
      categoryTotals[category] += amount;
    });

  // Convert to array with colors
  const colors = [
    "#e05a6b", "#4a90d9", "#670626", "#f0b429", "#BAD797"
  ];
  
  return Object.entries(categoryTotals)
    .map(([name, value], idx) => ({
      name,
      value: Math.round(value),
      color: colors[idx % colors.length],
      percentage: 0, // Will be calculated by component
    }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Generate spending alerts based on budget overspend
 */
export const generateSpendingAlerts = (transactions, budgets) => {
  const alerts = [];

  budgets.forEach(budget => {
    const spent = budget.spent || 0;
    const limit = budget.budget || 1;
    const percentage = Math.round((spent / limit) * 100);

    if (percentage >= 80) {
      const remaining = limit - spent;
      alerts.push({
        type: percentage > 100 ? "danger" : "warning",
        message: `You've used ${percentage}% of your ${budget.name} budget. ${remaining > 0 ? `You have ₦${remaining.toLocaleString()} left` : `You're over by ₦${Math.abs(remaining).toLocaleString()}`} for the month.`
      });
    }
  });

  return alerts.length > 0 ? alerts : null;
};

/**
 * Get available months (past, present, future)
 */
export const getAvailableMonths = () => {
  const months = ["January", "February", "March", "April", "May", "June", 
                 "July", "August", "September", "October", "November", "December"];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const available = [];
  
  // Add past 3 months and next 3 months
  for (let i = -3; i <= 3; i++) {
    const date = new Date(currentYear, currentMonth + i, 1);
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    available.push(`${month} ${year}`);
  }

  return available;
};

/**
 * Filter transactions by month
 */
export const filterTransactionsByMonth = (transactions, monthStr) => {
  if (!monthStr || !transactions) return transactions;

  const { month, year } = parseMonthString(monthStr);
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                     "July", "August", "September", "October", "November", "December"];

  return transactions.filter(txn => {
    if (!txn.date) return false;
    
    // Parse "13 May, 12:00 AM" or "Today, 2:41 PM"
    const dateStr = txn.date;
    const isToday = dateStr.toLowerCase().includes("today");
    
    if (isToday) {
      const today = new Date();
      return today.getMonth() === month && today.getFullYear() === year;
    }

    // Try to extract month and day
    const monthMatch = monthNames.find(m => dateStr.includes(m));
    if (!monthMatch) return false;

    const txnMonth = monthNames.indexOf(monthMatch);
    return txnMonth === month; // Simple year check could be added
  });
};