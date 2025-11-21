export interface Movie {
  maPhim: number
  tenPhim: string
  hinhAnh: string
  // Add more fields as needed
}

export interface Ghe {
  maGhe: number
  tenGhe: string
  giaVe: number
  stt: string
  daDat: boolean
  loaiGhe: string
  tenHeThongRap?: string
  tenCumRap?: string
}

export interface Ve {
  tenPhim: string
  ngayDat: string
  thoiLuongPhim: number
  danhSachGhe: Ghe[]
}

export interface User {
  hoTen: string
  taiKhoan: string
  email: string
  soDT: string
  thongTinDatVe?: Ve[]
}
