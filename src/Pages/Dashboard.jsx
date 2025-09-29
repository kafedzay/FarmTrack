import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="fixed md:static top-0 left-0 h-full z-40">
        <Sidebar />
      </div>
      <div className="flex-1 pt-20 md:pt-6 px-4 sm:px-6 lg:px-8 md:ml-64 md:transition-all md:duration-300">
        <main className="max-w-7xl mx-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}