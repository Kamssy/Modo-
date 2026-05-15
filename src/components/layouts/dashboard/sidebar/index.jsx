import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  Activity,
  Receipt,
  Star,
  CreditCard,
  User,
  Settings,
  ChevronRight,
  X,
  Plus,
} from "lucide-react";
import Button from "../../../ui/Button";

const navSections = [
  {
    label: "Menu",
    items: [
      { to: "/", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/budget", icon: PieChart, label: "Budget", badge: 3 },
      { to: "/insights", icon: Activity, label: "Insights" },
      { to: "/transactions", icon: Receipt, label: "Transactions" },
    ],
  },
  {
    label: "Planning",
    items: [
      { to: "/goals", icon: Star, label: "Goals" },
      { to: "/cards", icon: CreditCard, label: "Cards" },
    ],
  },
  {
    label: "Account",
    items: [
      { to: "/profile", icon: User, label: "Profile" },
      { to: "/settings", icon: Settings, label: "Settings" },
    ],
  },
];

const DashboardSidebar = ({ isOpen, onClose, onAddClick }) => {
  const location = useLocation();

  const handleAddClick = () => {
    onClose();
    onAddClick();
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-screen w-60 bg-sidebar
        flex flex-col overflow-y-auto
        transition-transform duration-300 ease-smooth
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 pt-7 pb-5 border-b border-white/[0.06] mb-2">
        <div className="relative w-[34px] h-[34px] bg-primary rounded-sm flex items-center justify-center overflow-hidden">
          <span className="font-display text-white text-[17px] relative z-10">
            M
          </span>
          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-secondary rounded-full" />
        </div>
        <div>
          <div className="font-display text-white text-[22px] leading-tight tracking-[0.01em]">
            Modo
          </div>
          <span className="text-[9px] font-medium text-secondary tracking-[0.12em] uppercase -mt-1 block">
            Personal Finance
          </span>
        </div>

        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="ml-auto lg:hidden text-white/40 hover:text-white/80 transition-colors"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <div className="px-3 py-4 mb-2">
          <Button
            onClick={handleAddClick}
            className="w-full bg-secondary text-ink hover:bg-secondary-deep font-semibold shadow-none border-none gap-2 h-10"
            size="sm"
          >
            <Plus size={18} />
            <span>New Entry</span>
          </Button>
        </div>
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[9px] font-semibold tracking-[0.15em] uppercase text-ink-40 px-3 pt-4 pb-1.5">
              {section.label}
            </p>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-sm mb-0.5
                    text-[13.5px] font-medium cursor-pointer
                    transition-all duration-200 ease-smooth relative
                    ${
                      isActive
                        ? "bg-sidebar-active text-secondary"
                        : "text-white/50 hover:bg-sidebar-hover hover:text-white/85"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    className={`shrink-0 ${
                      isActive ? "text-secondary opacity-100" : "opacity-70"
                    }`}
                  />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className="px-3 border-t border-white/[0.06] pt-4 mt-2 pb-6">
        <NavLink
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-sm hover:bg-sidebar-hover transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-mid flex items-center justify-center font-display text-[13px] text-secondary shrink-0">
            K
          </div>
          <div>
            <div className="text-[13px] font-medium text-white/80">
              Kamsiriochi
            </div>
            <div className="text-[10.5px] text-secondary opacity-80">
              Pro Plan
            </div>
          </div>
          <ChevronRight size={12} className="ml-auto text-white/30" />
        </NavLink>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
