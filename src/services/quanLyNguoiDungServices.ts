import { api } from '@/lib/api'

export type SignInPayload = {
  taiKhoan: string
  matKhau: string
}

export type SignUpPayload = {
  taiKhoan: string
  matKhau: string
  email: string
  soDt: string
  maNhom: string
  hoTen: string
}

export const quanLyNguoiDungServices = {
  signIn(data: SignInPayload) {
    return api.post('/QuanLyNguoiDung/DangNhap', data)
  },

  signUp(data: SignUpPayload) {
    return api.post('/QuanLyNguoiDung/DangKy', data)
  },

  getProfile() {
    return api.post('/QuanLyNguoiDung/ThongTinTaiKhoan')
  },
}
