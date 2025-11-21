import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { userService } from "@/pages/admin/services/user.service";
import { PATH } from "@/constants/path";
import { toast } from "sonner";

export const AddUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "KhachHang",
  });

  // --- 1. FIX LOGIC LẤY DỮ LIỆU ---
  useEffect(() => {
    if (isEditMode && id) {
      const fetchUserDetail = async () => {
        try {
          const res = await userService.searchUser(id); // Dùng hàm search

          if (res.data.content && res.data.content.length > 0) {
            // Tìm chính xác user có tài khoản trùng với id trên URL
            const user =
              res.data.content.find((u: any) => u.taiKhoan === id) ||
              res.data.content[0];

            setFormData({
              taiKhoan: user.taiKhoan,
              matKhau: user.matKhau, // Lấy mật khẩu cũ từ API
              email: user.email,
              // Fix lỗi key: API trả về soDT (hoa) hoặc soDt (thường) tùy server
              soDt: user.soDT || user.soDt || "",
              hoTen: user.hoTen,
              maLoaiNguoiDung: user.maLoaiNguoiDung,
            });
          }
        } catch (error) {
          console.error("Lỗi lấy user:", error);
        }
      };
      fetchUserDetail();
    }
  }, [isEditMode, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Định nghĩa hành động dựa trên mode
    const action = isEditMode
      ? userService.updateUser(formData)
      : userService.addUser(formData);

    toast.promise(action, {
      loading: isEditMode ? "Đang cập nhật..." : "Đang thêm mới...",
      success: () => {
        navigate(PATH.ADMIN_USERS);
        return isEditMode ? "Cập nhật thành công!" : "Thêm mới thành công!";
      },
      error: (err) => {
        const msg = err.response?.data?.content || "Có lỗi xảy ra!";
        return `Lỗi: ${msg}`;
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">
        {isEditMode ? `Cập nhật người dùng: ${id}` : "Thêm người dùng mới"}
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tài khoản & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tài khoản
              </label>
              <input
                type="text"
                name="taiKhoan"
                value={formData.taiKhoan}
                onChange={handleChange}
                disabled={isEditMode}
                placeholder="Nhập tài khoản..."
                className={`w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 ${
                  isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Mật khẩu & Số ĐT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu{" "}
                {isEditMode && (
                  <span className="text-xs text-red-500 font-normal">
                    (Nhập nếu muốn đổi)
                  </span>
                )}
              </label>
              <input
                type="password"
                name="matKhau"
                value={formData.matKhau}
                onChange={handleChange}
                placeholder="Nhập mật khẩu..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                // --- 2. FIX LỖI REQUIRED ---
                // Chỉ bắt buộc nhập khi Thêm mới. Khi sửa thì để trống nghĩa là không đổi pass.
                required={!isEditMode}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <input
                type="text"
                name="soDt"
                value={formData.soDt}
                onChange={handleChange}
                placeholder="090..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Họ tên & Loại người dùng */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ tên
              </label>
              <input
                type="text"
                name="hoTen"
                value={formData.hoTen}
                onChange={handleChange}
                placeholder="Nhập họ tên..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại người dùng
              </label>
              <select
                name="maLoaiNguoiDung"
                value={formData.maLoaiNguoiDung}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500 bg-white"
              >
                <option value="KhachHang">Khách Hàng</option>
                <option value="QuanTri">Quản Trị</option>
              </select>
            </div>
          </div>

          {/* Nút Submit */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className={`${
                isEditMode
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } px-8`}
            >
              {isEditMode ? "Lưu Cập Nhật" : "Thêm Người Dùng"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
