import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PATH } from "@/constants";
import { toast } from "sonner";
import { useEffect } from "react";

export const AdminGuard = () => {
  const { user } = useAuth();

  // Dùng useEffect để hiện thông báo 1 lần, tránh spam toast khi render
  useEffect(() => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập để truy cập Admin!");
    } else if (user.maLoaiNguoiDung !== "QuanTri") {
      toast.error("Bạn không có quyền truy cập trang này!");
    }
  }, [user]);

  // 1. Chưa đăng nhập -> Đá về trang Login
  if (!user) {
    return <Navigate to={PATH.HOME} replace />;
  }

  // 2. Đã đăng nhập nhưng không phải QuanTri -> Đá về Home
  if (user.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to={PATH.HOME} replace />;
  }

  // 3. Thỏa mãn -> Cho phép hiển thị nội dung con (Outlet)
  return <Outlet />;
};