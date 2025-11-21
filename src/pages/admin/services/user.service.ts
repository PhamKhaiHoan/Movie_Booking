import { GROUP_ID } from "@/constants/constants";
import { api } from "@/lib/admin.api";

export const userService = {
  // 1. Lấy danh sách
  getUserList: () => {
    return api.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`);
  },

  // 2. Tìm kiếm
  searchUser: (tuKhoa: string) => {
    return api.get(
      `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`
    );
  },

  // 3. Xóa user
  deleteUser: (taiKhoan: string) => {
    return api.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
  },

  // 4. Thêm user
  addUser: (userData: any) => {
    // SỬA LẠI: Dùng GROUP_ID thay vì cứng "GP01"
    return api.post("/QuanLyNguoiDung/ThemNguoiDung", {
      ...userData,
      maNhom: GROUP_ID,
    });
  },

  // 5. Cập nhật user
  updateUser: (userData: any) => {
    // SỬA LẠI: Dùng GROUP_ID thay vì cứng "GP01"
    return api.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
      ...userData,
      maNhom: GROUP_ID,
    });
  },

  // 6. Lấy loại người dùng
  getUserTypes: () => {
    return api.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  },

  // 7. 👇 THÊM HÀM NÀY ĐỂ FIX LỖI EDIT USER 👇
  getUserDetail: (taiKhoan: string) => {
    // Tận dụng API tìm kiếm để lấy thông tin chi tiết
    return api.get(
      `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${taiKhoan}`
    );
  },
};
