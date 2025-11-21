import { api } from "@/lib/api"

export interface DanhSachVeItem {
  maGhe: number
  giaVe: number
}

export const quanLyDatVeServices = {
  getTicketRoom: (maLichChieu: string | number) => {
    return api.get("/QuanLyDatVe/LayDanhSachPhongVe", {
      params: { MaLichChieu: maLichChieu },
    })
  },

  datVe: (payload: { maLichChieu: number; danhSachVe: DanhSachVeItem[] }) => {
    return api.post("/QuanLyDatVe/DatVe", payload)
  },
}
