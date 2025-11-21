import { GROUP_ID } from "@/constants/constants";
import { api } from "@/lib/api";

export const userService = {
  // 1. Lấy danh sách
  getUserList: () => {
    return api.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`);
  },
  
  // 2. Tìm kiếm
  searchUser: (tuKhoa: string) => {
    return api.get(`/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`);
  },

  // 3. 👇 BỔ SUNG HÀM NÀY ĐỂ FIX LỖI "deleteUser does not exist"
  deleteUser: (taiKhoan: string) => {
    return api.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  },

  // 4. Bổ sung hàm thêm user
  addUser: (userData: any) => {
    return api.post("/QuanLyNguoiDung/ThemNguoiDung", { ...userData, maNhom: "GP01" });
  },

  // 5. Bổ sung hàm cập nhật user
  updateUser: (userData: any) => {
    return api.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", { ...userData, maNhom: "GP01" });
  },
  
  // 6. Lấy loại người dùng (cho thẻ select)
  getUserTypes: () => {
    return api.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  }
};