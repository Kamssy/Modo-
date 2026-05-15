const ProgressBar = ({ value = 0, max = 100, color = "var(--color-primary)", className = "" }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`h-1.5 bg-ink-10 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full transition-[width] duration-600 ease-smooth"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
};

export default ProgressBar;
