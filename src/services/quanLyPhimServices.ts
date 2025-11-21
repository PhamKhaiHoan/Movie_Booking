import { api } from '@/lib/api'

export const quanLyPhimServices = {
  getBanners() {
    return api.get('/QuanLyPhim/LayDanhSachBanner')
  },

  getMovies(maNhom = 'GP01') {
    return api.get('/QuanLyPhim/LayDanhSachPhim', {
      params: { maNhom },
    })
  },

  getMovieShowtime(maPhim: number | string) {
    // dùng cho trang chi tiết
    return api.get('/QuanLyRap/LayThongTinLichChieuPhim', {
      params: { MaPhim: maPhim },
    })
  },
}
