const variantStyles = {
  primary:
    "bg-primary text-white hover:bg-primary-deep shadow-card hover:shadow-elevated",
  secondary:
    "bg-secondary text-ink hover:bg-secondary-deep shadow-card hover:shadow-elevated",
  outline:
    "bg-white text-primary border border-ink-10 hover:border-primary",
  ghost:
    "bg-transparent text-ink-60 hover:text-ink hover:bg-ink-05",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs font-medium rounded-sm",
  md: "px-4 py-2 text-sm font-medium rounded-sm",
  lg: "px-6 py-2.5 text-base font-semibold rounded-md",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-200 ease-smooth cursor-pointer
        font-body
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
