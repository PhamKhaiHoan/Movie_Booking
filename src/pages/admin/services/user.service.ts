import { api } from "@/lib/api";

export const userService = {
  // Lấy danh sách người dùng
  getUserList: () => {
    return api.get("/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
  },
  
  // Tìm kiếm người dùng (API này cũng trả về danh sách)
  searchUser: (tuKhoa: string) => {
    return api.get(`/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`);
  }
};