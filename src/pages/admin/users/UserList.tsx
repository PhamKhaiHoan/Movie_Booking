import { Button } from "@/components/ui/button";
import { PATH } from "@/constants/path";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";
import { toast } from "sonner";

// 1. Sửa Interface khớp 100% với JSON API trả về
interface User {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: string;
}

export const UserList = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async (tuKhoa: string = "") => {
    try {
      const res = tuKhoa.trim()
        ? await userService.searchUser(tuKhoa)
        : await userService.getUserList();

      if (res.data && res.data.content) {
        setUsers(res.data.content);
      }
    } catch (error) {
      console.error("Lỗi lấy user:", error);
    }
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      fetchUsers(keyword);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [keyword, fetchUsers]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleDelete = async (taiKhoan: string) => {
    const promise = userService.deleteUser(taiKhoan);

    toast.promise(promise, {
      loading: "Đang xóa người dùng...",
      success: () => {
        fetchUsers(keyword);
        return "Xóa thành công!";
      },
      error: "Xóa thất bại! (User đã đặt vé hoặc không đủ quyền)",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Quản lý Người Dùng</h1>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => navigate(PATH.ADMIN_ADD_USER)}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm Người Dùng
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Nhập tài khoản hoặc họ tên để tìm..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all"
            value={keyword}
            onChange={handleSearch}
          />
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => fetchUsers(keyword)}
        >
          Làm mới
        </Button>
      </div>

      {/* Table Danh Sách */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">STT</th>
              <th className="px-6 py-4 font-medium text-gray-900">Tài khoản</th>
              <th className="px-6 py-4 font-medium text-gray-900">Họ tên</th>
              <th className="px-6 py-4 font-medium text-gray-900">Email</th>
              <th className="px-6 py-4 font-medium text-gray-900">Số ĐT</th>
              <th className="px-6 py-4 font-medium text-gray-900">Loại</th>
              <th className="px-6 py-4 font-medium text-gray-900 text-right">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.length > 0 ? (
              users.map((user, index) => (
                // 👇 Key dùng user.taiKhoan
                <tr
                  key={user.taiKhoan}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">{index + 1}</td>

                  {/* 👇 Sửa user.taikhoan -> user.taiKhoan */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.taiKhoan}
                  </td>

                  <td className="px-6 py-4 font-bold">{user.hoTen}</td>
                  <td className="px-6 py-4">{user.email}</td>

                  {/* 👇 Sửa user.soDT -> user.soDt */}
                  <td className="px-6 py-4">{user.soDt}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.maLoaiNguoiDung === "QuanTri"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.maLoaiNguoiDung === "QuanTri"
                        ? "Quản Trị"
                        : "Khách Hàng"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-blue-600 hover:bg-blue-50"
                        // 👇 Quan trọng nhất: Link edit phải dùng user.taiKhoan
                        onClick={() =>
                          navigate(`/admin/users/edit/${user.taiKhoan}`)
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-600 hover:bg-red-50"
                        // 👇 Sửa luôn ở hàm xóa
                        onClick={() => handleDelete(user.taiKhoan)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  Không tìm thấy người dùng nào khớp với từ khóa "{keyword}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
