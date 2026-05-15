const Input = ({ label, id, className = "", ...rest }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-[12px] font-semibold text-ink-60 tracking-[0.03em] uppercase"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className="h-10 px-3 border border-ink-10 bg-white rounded-sm font-body text-sm text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 placeholder:text-ink-40"
        {...rest}
      />
    </div>
  );
};

export default Input;
