import { Button } from "@/components/ui/button";
import { PATH } from "@/constants/path";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserList = () => {
  const navigate = useNavigate();

  // State lưu từ khóa tìm kiếm
  const [keyword, setKeyword] = useState("");

  // Mock Data User
  const [users, setUsers] = useState([
    {
      taikhoan: "admin_01",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@gmail.com",
      soDt: "0901234567",
      maLoaiNguoiDung: "QuanTri",
    },
    {
      taikhoan: "khach_02",
      hoTen: "Trần Thị Khách",
      email: "khach@gmail.com",
      soDt: "0909888777",
      maLoaiNguoiDung: "KhachHang",
    },
    {
      taikhoan: "super_man",
      hoTen: "Clark Kent",
      email: "superman@krypton.com",
      soDt: "0911222333",
      maLoaiNguoiDung: "KhachHang",
    },
    {
      taikhoan: "iron_man",
      hoTen: "Tony Stark",
      email: "tony@stark.com",
      soDt: "0988888888",
      maLoaiNguoiDung: "KhachHang",
    },
  ]);

  // Logic lọc danh sách: Tìm theo Tài Khoản hoặc Họ Tên
  const filteredUsers = users.filter(
    (user) =>
      user.taikhoan.toLowerCase().includes(keyword.toLowerCase()) ||
      user.hoTen.toLowerCase().includes(keyword.toLowerCase())
  );

  // Hàm xử lý xóa user
  const handleDelete = (taiKhoan: string) => {
    if (window.confirm(`Xóa user ${taiKhoan}?`)) {
      setUsers(users.filter((u) => u.taikhoan !== taiKhoan));
    }
  };

  return (
    <div>
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Quản lý Người Dùng</h1>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => navigate(PATH.ADMIN_ADD_USER)}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm Người Dùng
        </Button>
      </div>

      {/* --- Thanh Tìm Kiếm (Search Bar) --- */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Nhập tài khoản hoặc họ tên người dùng..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 transition-all"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} 
        />
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Search className="h-4 w-4" /> Tìm
        </Button>
      </div>

      {/* --- Bảng Danh Sách (Render filteredUsers) --- */}
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
            {/* 👇 Chú ý: Map qua filteredUsers chứ không phải users gốc */}
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.taikhoan}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.taikhoan}
                  </td>
                  <td className="px-6 py-4 font-bold">{user.hoTen}</td>
                  <td className="px-6 py-4">{user.email}</td>
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
                        onClick={() =>
                          navigate(`/admin/users/edit/${user.taikhoan}`)
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(user.taikhoan)}
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
