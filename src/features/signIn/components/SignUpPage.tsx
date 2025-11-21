import { useState } from 'react'
import { quanLyNguoiDungServices } from '@/services/quanLyNguoiDungServices'
import { useNavigate } from 'react-router-dom'
import { PATH } from '@/constants'


export const SignUpPage = () => {
  const [form, setForm] = useState({
    taiKhoan: '',
    matKhau: '',
    email: '',
    soDt: '',
    hoTen: '',
    maNhom: 'GP01',
  })

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await quanLyNguoiDungServices.signUp(form)
      alert('Đăng ký thành công!')
      navigate(PATH.SIGN_IN)
    } catch {
      alert('Lỗi đăng ký, vui lòng thử lại!')
    }
  }

  return (
    <div className="container mx-auto py-20 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Đăng ký tài khoản</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input name="taiKhoan" onChange={handleChange} className="p-3 rounded bg-slate-800" placeholder="Tài khoản" required />
        <input name="matKhau" onChange={handleChange} className="p-3 rounded bg-slate-800" type="password" placeholder="Mật khẩu" required />
        <input name="email" onChange={handleChange} className="p-3 rounded bg-slate-800" placeholder="Email" required />
        <input name="soDt" onChange={handleChange} className="p-3 rounded bg-slate-800" placeholder="Số điện thoại" required />
        <input name="hoTen" onChange={handleChange} className="p-3 rounded bg-slate-800" placeholder="Họ tên" required />

        <button className="bg-orange-500 py-3 rounded hover:bg-orange-400 transition">
          Đăng ký
        </button>
      </form>
    </div>
  )
}
