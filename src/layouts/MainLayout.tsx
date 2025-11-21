import { Outlet, NavLink } from 'react-router-dom'
import { PATH } from '@/constants'
import { useAuth } from '@/hooks/useAuth'

export const MainLayout = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700">
        <div className="container mx-auto flex items-center justify-between py-4">
          <NavLink to={PATH.HOME} className="font-bold text-xl">
            Movie Booking
          </NavLink>

          <nav className="flex gap-4">
            {user ? (
              <>
                <span className="text-sm">Xin chào, {user.hoTen}</span>
                <NavLink to={PATH.PROFILE} className="text-sm underline">
                  Thông tin cá nhân
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to={PATH.SIGN_IN}>Đăng nhập</NavLink>
                <NavLink to={PATH.SIGN_UP}>Đăng ký</NavLink>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-4 text-center text-xs text-slate-400">
        Movie Booking Capstone
      </footer>
    </div>
  )
}
