import { api } from '@/lib/api'

export const quanLyRapServices = {
  getTheaterSystems() {
    return api.get('/QuanLyRap/LayThongTinHeThongRap')
  },

  getShowtimeBySystem(maHeThongRap: string, maNhom = 'GP01') {
    return api.get('/QuanLyRap/LayThongTinLichChieuHeThongRap', {
      params: { maHeThongRap, maNhom },
    })
  },
}
