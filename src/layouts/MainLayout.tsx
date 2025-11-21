import { Outlet, NavLink, useNavigate } from "react-router-dom"; // Thêm useNavigate
import { PATH } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut } from "lucide-react"; // Thêm Icon LogOut
import { useAppDispatch } from "@/store/config"; // Import Dispatch
import { signInActions } from "@/features/signIn/signIn.slice"; // Import Action SignOut

export const MainLayout = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Hàm đăng xuất chuẩn (Xóa Redux + LocalStorage)
  const handleLogout = () => {
    dispatch(signInActions.signOut());
    navigate(PATH.HOME);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 sticky top-0 z-50 bg-slate-900/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <NavLink
            to={PATH.HOME}
            className="font-bold text-2xl text-orange-500 tracking-tighter"
          >
            Cyber<span className="text-white">Movie</span>
          </NavLink>

          <nav className="flex items-center gap-6">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Xin chào,</span>
                  <span className="font-semibold text-white">{user.hoTen}</span>
                </div>

                <NavLink to={PATH.ADMIN}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-indigo-600 text-white hover:bg-indigo-700 border-none gap-2 shadow-lg shadow-indigo-500/20"
                  >
                    <LayoutDashboard size={16} />
                    Trang Quản Trị
                  </Button>
                </NavLink>

                <NavLink
                  to={PATH.PROFILE}
                  className="text-sm font-medium text-slate-300 hover:text-orange-500 transition-colors"
                >
                  Thông tin cá nhân
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <NavLink
                  to={PATH.SIGN_IN}
                  className="text-sm font-medium hover:text-orange-500 transition-colors"
                >
                  Đăng nhập
                </NavLink>
                <NavLink to={PATH.SIGN_UP}>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Đăng ký
                  </Button>
                </NavLink>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 py-8 bg-slate-950 text-center text-sm text-slate-500">
        <div className="container mx-auto">
          <p>&copy; 2025 Movie Booking Capstone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
