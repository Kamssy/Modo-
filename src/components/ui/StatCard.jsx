import Card from "./Card";

const iconBgMap = {
  balance: "bg-primary-light",
  income: "bg-[rgba(77,175,124,0.12)]",
  expense: "bg-[rgba(224,90,107,0.12)]",
  savings: "bg-secondary-light",
};

const StatCard = ({
  label,
  value,
  change,
  changeDirection = "up",
  icon: Icon,
  variant = "balance",
  className = "",
}) => {
  return (
    <Card className={`p-5 lg:p-6 animate-fade-up ${className}`}>
      <div
        className={`w-10 h-10 rounded-sm flex items-center justify-center mb-3.5 ${iconBgMap[variant]}`}
      >
        <Icon
          size={18}
          className={
            variant === "income"
              ? "text-income"
              : variant === "expense"
              ? "text-expense"
              : variant === "savings"
              ? "text-secondary-deep"
              : "text-primary"
          }
        />
      </div>
      <div className="text-[11.5px] font-semibold tracking-[0.08em] uppercase text-ink-40 mb-1.5">
        {label}
      </div>
      <div className="font-display text-[28px] text-ink leading-none mb-2">
        {value}
      </div>
      {change ? (
        <span
          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
            changeDirection === "up"
              ? "bg-[rgba(77,175,124,0.12)] text-income"
              : "bg-[rgba(224,90,107,0.12)] text-expense"
          }`}
        >
          {changeDirection === "up" ? "↑" : "↓"} {change}
        </span>
      ) : (
        <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-ink-05 text-ink-40">
          — No previous data
        </span>
      )}
    </Card>
  );
};

export default StatCard;