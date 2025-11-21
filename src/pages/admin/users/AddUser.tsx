import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const AddUser = () => {
  const { id } = useParams(); // Lấy tài khoản từ URL (nếu có)
  const navigate = useNavigate();
  const isEditMode = Boolean(id); // Có id => Đang sửa

  // State form
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "KhachHang", // Mặc định là Khách
  });

  // Nếu là Edit Mode -> Load dữ liệu giả
  useEffect(() => {
    if (isEditMode) {
      // Giả lập API trả về thông tin user
      const mockUser = {
        taiKhoan: id, // Lấy luôn từ URL
        matKhau: "123456",
        hoTen: "Nguyễn Văn A",
        email: "nguyenvana@gmail.com",
        soDt: "0909123456",
        maLoaiNguoiDung: "QuanTri",
      };
      // @ts-ignore
      setFormData(mockUser);
    }
  }, [isEditMode, id]);

  // Hàm xử lý nhập liệu
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      console.log("Cập nhật user:", formData);
      alert("Cập nhật thành công!");
    } else {
      console.log("Thêm mới user:", formData);
      alert("Thêm mới thành công!");
    }
    // navigate("/admin/users"); // Có thể uncomment để quay lại trang list
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">
        {isEditMode ? "Cập nhật người dùng" : "Thêm người dùng mới"}
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
                disabled={isEditMode} // 🔒 Khóa lại nếu đang sửa
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
                Mật khẩu
              </label>
              <input
                type="password"
                name="matKhau"
                value={formData.matKhau}
                onChange={handleChange}
                placeholder="Nhập mật khẩu..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
                required
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
