import { api } from "@/lib/api";

export const movieService = {
  // 👇 Cập nhật dòng này: Nhận thêm tham số tenPhim
  //   getMovieList: (tenPhim: string = "") => {
  //     if (tenPhim.trim() !== "") {
  //       // Nếu có tên phim -> Gọi API tìm kiếm
  //       return api.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${tenPhim}`);
  //     }
  //     // Nếu không -> Gọi API lấy hết
  //     return api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  //   },

  getMovieList: () => {
    return api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },

  // ... (Các hàm getMovieDetail, deleteMovie... giữ nguyên)
  getMovieDetail: (maPhim: string) => {
    return api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },

  deleteMovie: (maPhim: number) => {
    return api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  },

  addMovie: (formData: FormData) => {
    return api.post("/QuanLyPhim/ThemPhimUploadHinh", formData);
  },

  updateMovie: (formData: FormData) => {
    return api.post("/QuanLyPhim/CapNhatPhimUpload", formData);
  },
};
