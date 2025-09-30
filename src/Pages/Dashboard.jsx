import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="fixed md:static top-0 left-0 h-full z-40">
        <Sidebar />
      </div>
      <div className="flex-1 pt-16 md:pt-0 ">
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}