const BudgetProgressItem = ({
  name,
  spent,
  budget,
  color = "var(--color-primary)",
  dotColor,
}) => {
  const percentage = Math.min(100, Math.round(((spent || 0) / (budget || 1)) * 100));

  const formatCurrency = (val) => {
    const num = val || 0;
    return `₦${num.toLocaleString()}`;
  };

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2 text-[13px] font-medium text-ink">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: dotColor || color }}
          />
          {name}
        </div>
        <span className="text-xs text-ink-40 font-medium">{percentage}%</span>
      </div>

      <div className="h-1.5 bg-ink-10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-600 ease-smooth"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-[11px] text-ink-60 font-medium">
          {formatCurrency(spent)} spent
        </span>
        <span className="text-[11px] text-ink-40">
          of {formatCurrency(budget)}
        </span>
      </div>
    </div>
  );
};

export default BudgetProgressItem;
