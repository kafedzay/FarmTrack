import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* 1. Sidebar Container: Fixed width w-64 for all sizes. 
             It is fixed and ready to overlap content on mobile. */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* 2. Main Content Container: 
             - NO margin-left on mobile (content fits the page).
             - Apply ml-64 ONLY on medium screens and up (md:ml-64) 
               to push the content out of the way of the static sidebar.
             - We also need to hide the fixed sidebar's parent div for now, 
               but that's typically handled by a dynamic state/class (e.g., hidden/translate-x-full).
               For this static component, we focus on the content offset.
      */}
      <div className="flex-1 md:ml-64">
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}