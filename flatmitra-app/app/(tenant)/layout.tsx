import BottomNav from "@/components/layout/bottom-nav";
import { Bell } from "lucide-react";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-black overflow-hidden max-w-md mx-auto relative shadow-2xl">
      {/* Mobile-first constraints: We force max-w-md and center it to simulate mobile app on desktop */}
      
      {/* Optional Top App Bar for Tenant */}
      <header className="flex justify-between items-center px-4 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-100 dark:border-gray-800 z-10 sticky top-0">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">E</span>
          </div>
          <span className="font-bold text-gray-900 dark:text-white">FlatMitra</span>
        </div>
        <button className="relative p-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white dark:ring-[#1a1a1a]"></span>
        </button>
      </header>

      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-[80px] scroll-smooth">
        {children}
      </main>

      {/* Fixed Bottom Navigation */}
      <div className="absolute bottom-0 w-full z-50">
        <BottomNav />
      </div>
    </div>
  );
}
