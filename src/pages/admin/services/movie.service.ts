import { api } from "@/lib/api";

export const movieService = {
  // Lấy danh sách phim (mặc định mã nhóm GP01)
  getMovieList: () => {
    return api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
  
  // Lấy chi tiết 1 phim (Dùng cho trang Edit / Lịch chiếu)
  getMovieDetail: (maPhim: string) => {
    return api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },
};