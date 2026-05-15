const Card = ({ children, className = "", ...rest }) => {
  // If className has a bg- utility, don't apply bg-white
  const hasBgClass = className.includes("bg-");
  const bgClass = hasBgClass ? "" : "bg-bg-card";

  return (
    <div
      className={`${bgClass} rounded-lg border border-ink-10 shadow-card ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;

