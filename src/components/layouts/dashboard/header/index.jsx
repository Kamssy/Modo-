import { useLocation } from "react-router-dom";
import { Search, Bell, Menu, Plus } from "lucide-react";
import Button from "../../../ui/Button";

const pageTitles = {
  "/": { title: "Dashboard", subtitle: "Welcome back, Kamsiriochi" },
  "/budget": { title: "Budget", subtitle: "Manage your spending limits" },
  "/insights": { title: "Insights", subtitle: "Your financial analytics" },
  "/transactions": { title: "Transactions", subtitle: "All your activity" },
  "/goals": { title: "Goals", subtitle: "Track your savings targets" },
  "/cards": { title: "Cards", subtitle: "Manage your payment methods" },
  "/profile": { title: "Profile", subtitle: "Your account details" },
  "/settings": { title: "Settings", subtitle: "App preferences" },
};

const DashboardHeader = ({ onMenuClick, onAddClick }) => {
  const location = useLocation();
  const page = pageTitles[location.pathname] || {
    title: "Modo",
    subtitle: "",
  };

  return (
    <>
      {/* Desktop topbar */}
      <header className="hidden lg:flex sticky top-0 z-30 bg-ink-05/92 backdrop-blur-[16px] border-b border-ink-10 px-8 h-16 items-center gap-4">
        <div>
          <h1 className="font-display text-xl text-ink">{page.title}</h1>
          {page.subtitle && (
            <span className="text-[12.5px] text-ink-40 ml-1">
              {page.subtitle}
            </span>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <Button
            size="sm"
            onClick={onAddClick}
            className="h-[38px] px-4 gap-2"
          >
            <Plus size={16} />
            <span>New Entry</span>
          </Button>

          <button
            className="w-[38px] h-[38px] rounded-sm bg-white border border-ink-10 flex items-center justify-center text-ink-60 hover:border-primary hover:text-primary transition-all duration-200"
            aria-label="Search"
          >
            <Search size={16} />
          </button>

          <button
            className="w-[38px] h-[38px] rounded-sm bg-white border border-ink-10 flex items-center justify-center text-ink-60 hover:border-primary hover:text-primary transition-all duration-200 relative"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] bg-expense rounded-full border-[1.5px] border-ink-05" />
          </button>
        </div>
      </header>

      {/* Mobile header */}
      <header className="flex lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-ink-10 h-[60px] px-5 items-center justify-between">
        <div className="font-display text-[22px] text-primary">
          Mo<span className="text-secondary-deep">do</span>
        </div>
        <button
          onClick={onMenuClick}
          className="w-[38px] h-[38px] flex items-center justify-center text-ink"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </header>
    </>
  );
};

export default DashboardHeader;
