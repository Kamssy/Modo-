const QuickActionButton = ({
  label,
  icon: Icon,
  iconBg = "bg-primary-light",
  iconColor = "text-primary",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        flex-1 min-w-[80px] bg-white border border-ink-10 rounded-md
        py-3.5 px-2.5 flex flex-col items-center gap-[7px]
        cursor-pointer shadow-card
        transition-all duration-200 ease-smooth
        hover:border-primary hover:-translate-y-0.5 hover:shadow-elevated
      "
    >
      <div
        className={`w-[38px] h-[38px] rounded-sm flex items-center justify-center ${iconBg}`}
      >
        <Icon size={17} className={iconColor} />
      </div>
      <span className="text-[11.5px] font-medium text-ink-60">{label}</span>
    </button>
  );
};

export default QuickActionButton;
