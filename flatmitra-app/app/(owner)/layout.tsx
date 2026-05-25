import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black overflow-hidden">
      {/* Sidebar is fixed, handles its own positioning */}
      <Sidebar />
      
      {/* Main content wrapper, adds padding to avoid sidebar overlap on desktop/tablet */}
      <div className="flex-1 flex flex-col md:pl-[60px] lg:pl-[240px] transition-all duration-300 ease-in-out w-full h-full overflow-hidden">
        <Navbar />
        
        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 pb-20 md:pb-6 relative scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}
