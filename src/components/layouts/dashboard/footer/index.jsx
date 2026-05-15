import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  Plus,
  Receipt,
  User,
} from "lucide-react";

const footerItems = [
  { to: "/", icon: LayoutDashboard, label: "Home" },
  { to: "/budget", icon: PieChart, label: "Budget" },
  { to: null, icon: Plus, label: "Add", isFab: true },
  { to: "/transactions", icon: Receipt, label: "Txns" },
  { to: "/profile", icon: User, label: "Profile" },
];

const DashboardFooter = ({ onAddClick }) => {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-ink-10 py-2 pb-3 shadow-[0_-8px_32px_rgba(103,6,38,0.08)]">
      <div className="flex justify-around items-center">
        {footerItems.map((item) => {
          const Icon = item.icon;

          if (item.isFab) {
            return (
              <button
                key="fab"
                onClick={onAddClick}
                className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg -translate-y-6 border-4 border-white active:scale-95 transition-transform cursor-pointer"
                aria-label="Add new entry"
              >
                <Icon size={24} />
              </button>
            );
          }

          const isActive =
            item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 px-3 py-1 ${
                isActive ? "text-primary" : "text-ink-40"
              } transition-colors`}
            >
              <Icon size={20} />
              <span className="text-[9.5px] font-semibold tracking-[0.05em]">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default DashboardFooter;