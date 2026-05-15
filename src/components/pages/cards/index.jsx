import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../../../context/TransactionContext";
import Card from "../../ui/Card";
import WalletCard from "../../ui/WalletCard";
import Button from "../../ui/Button";
import TransactionItem from "../../ui/TransactionItem";
import { Plus, Snowflake, Settings, Trash2, ShieldCheck, CheckCircle2, CreditCard } from "lucide-react";
import { useCards } from "../../../context/CardContext";
import { useAppContext } from "../../../context/AppContext";
import CardModal from "../../modals/CardModal";
import { filterTransactionsByMonth, getAvailableMonths } from "../../../utils/dataHelpers";

const CardsPage = () => {
  const { transactions, totalBalance } = useTransactions();
  const { cards, removeCard } = useCards();
  const { currency } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("May 2026");

  const activeCard = cards[0];

  // Compute live values from transactions
  const monthlyTransactions = filterTransactionsByMonth(transactions, currentMonth);

  const monthlyInc = monthlyTransactions
    .filter(t => t.type === "credit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const monthlyExp = monthlyTransactions
    .filter(t => t.type === "debit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const totalIncome = transactions
    .filter(t => t.type === "credit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const totalExpenses = transactions
    .filter(t => t.type === "debit")
    .reduce((acc, t) => acc + (parseFloat(t.amount?.replace(/[^0-9.-]+/g, "") || "0") || 0), 0);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(val || 0).replace("NGN", "₦");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-[26px] text-ink mb-1">Your Cards</h2>
          <p className="text-[13px] text-ink-40">
            Manage your linked bank cards and payment methods.
          </p>
        </div>
        <div className="flex items-center gap-3 sm:self-start">
          <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>Add New Card</span>
          </Button>
        </div>
      </div>

      {activeCard ? (
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
          {/* Left Column: Card Display & Actions */}
          <div className="space-y-6">
            <WalletCard
              balance={formatCurrency(totalBalance)}
              income={`+${formatCurrency(totalIncome)}`}
              expense={`-${formatCurrency(totalExpenses)}`}
              cardNumber={`•••• •••• ${activeCard.cardNumber}`}
            />

            <Card className="p-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-sm hover:bg-ink-05 transition-colors text-left group border-b border-ink-05 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-info/10 flex items-center justify-center text-info group-hover:bg-info group-hover:text-white transition-colors">
                  <Snowflake size={16} />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-ink">Freeze Card</h4>
                  <p className="text-[11px] text-ink-40">Temporarily disable this card</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-sm hover:bg-ink-05 transition-colors text-left group border-b border-ink-05 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-ink-05 flex items-center justify-center text-ink-60 group-hover:bg-ink-60 group-hover:text-white transition-colors">
                  <Settings size={16} />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-ink">Card Settings</h4>
                  <p className="text-[11px] text-ink-40">Manage limits and PIN</p>
                </div>
              </button>

              <button
                onClick={() => removeCard(activeCard.id)}
                className="w-full flex items-center gap-3 p-3 rounded-sm hover:bg-expense/5 transition-colors text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-expense/10 flex items-center justify-center text-expense group-hover:bg-expense group-hover:text-white transition-colors">
                  <Trash2 size={16} />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-expense">Remove Card</h4>
                  <p className="text-[11px] text-ink-40">Unlink from your account</p>
                </div>
              </button>
            </Card>

            <Card className="p-5 bg-secondary-light/30 border-none">
              <div className="flex gap-3">
                <ShieldCheck size={24} className="text-secondary-deep shrink-0" />
                <div>
                  <h4 className="text-[13px] font-semibold text-ink mb-1">Bank-level Security</h4>
                  <p className="text-[11px] text-ink-60 leading-relaxed">
                    Your card details are encrypted and never stored on our servers. We use tokenization to ensure your money stays safe.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Card Details & History */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-display text-xl text-ink mb-5">Card Details</h3>

              <div className="grid grid-cols-2 gap-y-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink-40 mb-1">Status</p>
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-income">
                    <CheckCircle2 size={14} /> {activeCard.status}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink-40 mb-1">Cardholder Name</p>
                  <div className="text-[14px] font-medium text-ink">{activeCard.cardholder}</div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink-40 mb-1">Billing Address</p>
                  <div className="text-[14px] font-medium text-ink">{activeCard.billing}</div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink-40 mb-1">Expires</p>
                  <div className="text-[14px] font-medium text-ink">{activeCard.expires}</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[14px] font-semibold tracking-[0.03em] uppercase text-ink-60">
                  Recent Card Activity
                </h3>
                <button className="text-xs text-primary font-medium hover:opacity-70 transition-opacity cursor-pointer">
                  View all →
                </button>
              </div>

              <div className="flex flex-col">
                {monthlyTransactions.slice(0, 4).map((txn, index) => (
                  <TransactionItem key={txn.id || index} {...txn} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-ink-05 flex items-center justify-center mb-4">
            <CreditCard size={24} className="text-ink-40" />
          </div>
          <h3 className="font-display text-xl text-ink mb-2">No Cards Linked</h3>
          <p className="text-sm text-ink-40 mb-6 max-w-sm">
            You haven't linked any payment methods yet. Add a card to start tracking specific transactions.
          </p>
          <Button onClick={() => setIsModalOpen(true)}>Link a Card</Button>
        </Card>
      )}

      <CardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CardsPage;