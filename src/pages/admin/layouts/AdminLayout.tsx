import { PATH } from "@/constants/path";
import { NavLink, Outlet } from "react-router-dom";
import { Calendar, CircleUserRound, Film, House, LogOut, User } from "lucide-react";

export const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-radial-[at_25%_25%] from-gray-900 via-gray-800 to-gray-700 overflow-hidden">
      {/* --- SIDEBAR (Bên trái) --- */}
      <aside className="w-64 bg-radial-[at_25%_25%] from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col shadow-xl rounded-br-lg">
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-slate-700">
          <h1 className="text-2xl font-bold text-orange-500 tracking-widest">
            ADMIN<span className="text-white">MOV</span>
          </h1>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-xs text-gray-400 uppercase font-semibold mb-2 px-2">
            Quản lý
          </p>

          {/* Trang chủ */}
          <NavLink
            to={PATH.HOME}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="flex items-center gap-3 text-lg font-medium">
              <House />
              Home
            </span>
          </NavLink>

          {/* Link Quản lý Phim */}
          <NavLink
            to={PATH.ADMIN_FILMS}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="flex items-center gap-3 text-lg font-medium">
              <Film />
              Films
            </span>
          </NavLink>

          {/* Link Quản lý User */}
          <NavLink
            to={PATH.ADMIN_USERS}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="flex items-center gap-3 text-lg font-medium">
              <User />
              Users
            </span>
          </NavLink>

          {/* Link Lịch Chiếu*/}
          <NavLink
            to="/admin/showtimes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="flex items-center gap-3 text-lg font-medium">
              <Calendar />
              Showtimes
            </span>
          </NavLink>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-slate-700">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-slate-800 transition-colors">
            <LogOut size={30} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT (Bên phải) --- */}
      <div className="flex-1 flex flex-col">
        {/* Header nhỏ */}
        <header className="h-16 bg-linear-to-t from-sky-500 to-indigo-500 shadow-sm flex items-center justify-between rounded-b-lg px-6">
          <h2 className="text-lg font-semibold text-gray-100">
            Admin Dashboard
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              <CircleUserRound />
            </div>
            <span className="text-sm font-medium">Admin User</span>
          </div>
        </header>

        {/* Nội dung thay đổi (Outlet) */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
