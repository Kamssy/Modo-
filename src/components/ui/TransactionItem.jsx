import { getIconForCategory } from "../../utils/categoryIcons";

const TransactionItem = ({
  name,
  date,
  category,
  categoryId,
  amount,
  type = "debit",
  icon: Icon,
}) => {
  // Resolve icon from categoryId first, then category name
  let ResolvedIcon;
  
  if (categoryId) {
    ResolvedIcon = getIconForCategory(categoryId);
  } else if (typeof Icon === 'function') {
    ResolvedIcon = Icon;
  } else {
    ResolvedIcon = getIconForCategory(category);
  }

  return (
    <div className="flex items-center gap-3.5 py-3 border-b border-ink-05 last:border-b-0 transition-colors">
      <div className="w-[42px] h-[42px] rounded-md bg-ink-05 flex items-center justify-center shrink-0">
        <ResolvedIcon size={19} className="text-ink-60" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-medium text-ink truncate">
          {name}
        </div>
        <div className="text-[11.5px] text-ink-40 mt-px">{date}</div>
      </div>
      <span className="text-[10px] font-semibold tracking-[0.06em] uppercase text-ink-40 bg-ink-05 px-2 py-0.5 rounded-full hidden sm:inline">
        {category}
      </span>
      <div
        className={`text-sm font-semibold whitespace-nowrap ${
          type === "credit" ? "text-income" : "text-expense"
        }`}
      >
        {amount}
      </div>
    </div>
  );
};

export default TransactionItem;