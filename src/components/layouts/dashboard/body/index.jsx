const DashboardBody = ({ children }) => {
  return (
    <main className="flex-1 px-4 py-6 lg:px-8 lg:py-7 mt-[60px] lg:mt-0 mb-[80px] lg:mb-0">
      {children}
    </main>
  );
};

export default DashboardBody;