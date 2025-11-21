import { useState } from 'react'
import { quanLyNguoiDungServices } from '@/services/quanLyNguoiDungServices'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/config'
import { signInActions } from '../signIn.slice'
import { PATH } from '@/constants'
import { toast } from 'sonner'


export const SignInPage = () => {
  const [taiKhoan, setTaiKhoan] = useState('')
  const [matKhau, setMatKhau] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await quanLyNguoiDungServices.signIn({ taiKhoan, matKhau })
      const data = res.data.content

      dispatch(
        signInActions.setCredentials({
          accessToken: data.accessToken,
          user: data,
        })
      )

      toast.success('Đăng nhập thành công!')
      navigate(PATH.HOME)
    } catch {
      toast.error('Sai tài khoản hoặc mật khẩu!')
    }
  }

  return (
    <div className="container mx-auto py-20 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="p-3 rounded bg-slate-800"
          placeholder="Tài khoản"
          value={taiKhoan}
          onChange={(e) => setTaiKhoan(e.target.value)}
          required
        />

        <input
          type="password"
          className="p-3 rounded bg-slate-800"
          placeholder="Mật khẩu"
          value={matKhau}
          onChange={(e) => setMatKhau(e.target.value)}
          required
        />

        <button className="bg-orange-500 py-3 rounded hover:bg-orange-400 transition">
          Đăng nhập
        </button>
      </form>
    </div>
  )
}
