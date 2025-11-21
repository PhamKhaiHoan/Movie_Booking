import { api } from "@/lib/api";

export const cinemaService = {
  // Lấy danh sách hệ thống rạp (BHD, CGV...)
  getCinemaSystems: () => {
    return api.get("/QuanLyRap/LayThongTinHeThongRap");
  },

  // Lấy cụm rạp theo hệ thống (BHD 3/2, CGV Aeon...)
  getCinemaClusters: (maHeThongRap: string) => {
    return api.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
  },

  // Tạo lịch chiếu
  createShowtime: (data: any) => {
    return api.post("/QuanLyDatVe/TaoLichChieu", data);
  }
};