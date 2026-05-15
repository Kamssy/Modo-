import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./sidebar";
import DashboardHeader from "./header";
import DashboardBody from "./body";
import DashboardFooter from "./footer";
import AddEntryModal from "../../modals/AddEntryModal";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addEntryOpen, setAddEntryOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    document.body.style.overflow = "";
  };

  const openAddEntry = () => setAddEntryOpen(true);
  const closeAddEntry = () => setAddEntryOpen(false);

  return (
    <div className="min-h-screen">
      {/* Sidebar — fixed position */}
      <DashboardSidebar isOpen={sidebarOpen} onClose={closeSidebar} onAddClick={openAddEntry} />

      {/* Sidebar overlay — mobile only */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main area — offset by sidebar width on desktop */}
      <div className="flex flex-col min-h-screen lg:ml-60">
        <DashboardHeader onMenuClick={openSidebar} onAddClick={openAddEntry} />
        <DashboardBody>
          <Outlet />
        </DashboardBody>
        <DashboardFooter onAddClick={openAddEntry} />
      </div>

      {/* Global Modals */}
      <AddEntryModal isOpen={addEntryOpen} onClose={closeAddEntry} />
    </div>
  );
};

export default DashboardLayout;