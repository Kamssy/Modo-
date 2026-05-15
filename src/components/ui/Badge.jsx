const variantStyles = {
  default: "bg-ink-05 text-ink-60",
  primary: "bg-primary-light text-primary",
  income: "bg-[rgba(77,175,124,0.12)] text-income",
  expense: "bg-[rgba(224,90,107,0.12)] text-expense",
  warn: "bg-[rgba(240,180,41,0.12)] text-warn",
  info: "bg-[rgba(74,144,217,0.12)] text-info",
};

const Badge = ({ children, variant = "default", className = "" }) => {
  return (
    <span
      className={`
        inline-flex items-center
        text-[10px] font-semibold tracking-[0.06em] uppercase
        px-2 py-0.5 rounded-full
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
