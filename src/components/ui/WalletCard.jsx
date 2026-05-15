const WalletCard = ({
  balance = "₦0.00",
  income = "+₦0",
  expense = "-₦0",
  cardNumber = "•••• •••• 0000",
  className = "",
}) => {
  return (
    <div
      className={`
        bg-gradient-to-br from-primary-deep via-primary to-primary-mid
        rounded-xl p-7 text-white relative overflow-hidden
        min-h-[190px] flex flex-col justify-between
        animate-fade-up
        ${className}
      `}
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full bg-secondary/[0.08]" />
      <div className="absolute -bottom-[60px] left-[60px] w-[180px] h-[180px] rounded-full bg-white/[0.04]" />

      {/* Top row */}
      <div className="flex items-center justify-between relative z-10">
        <div className="w-9 h-[26px] bg-white/[0.18] rounded-[5px] border border-white/25" />
        <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-secondary opacity-90">
          MODO WALLET
        </span>
      </div>

      {/* Balance */}
      <div className="relative z-10">
        <div className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/50 mb-1.5">
          Available Balance
        </div>
        <div className="font-display text-4xl text-white leading-none">
          {balance}
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between relative z-10">
        <div className="text-[13px] tracking-[0.2em] text-white/55 font-light">
          {cardNumber}
        </div>
        <div className="flex gap-5">
          <div className="text-right">
            <div className="text-[10px] text-white/45 mb-0.5">Income</div>
            <div className="text-sm font-semibold text-secondary">
              {income}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-white/45 mb-0.5">Spend</div>
            <div className="text-sm font-semibold text-[#ff8fa0]">
              {expense}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
