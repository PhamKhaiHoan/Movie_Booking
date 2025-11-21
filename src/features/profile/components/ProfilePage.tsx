import { useQueryProfile } from "../hooks/useQueryProfile"

export const ProfilePage = () => {
  const { data, isLoading } = useQueryProfile()

  if (isLoading) {
    return <p className="text-white p-10">Đang tải thông tin...</p>
  }

  const user = data
  const tickets = data.thongTinDatVe || []

  return (
    <div className="container mx-auto py-10 text-white">
      <h2 className="text-2xl font-bold mb-6">Thông tin tài khoản</h2>

      <div className="bg-slate-800 p-6 rounded-xl mb-8">
        <p>Họ tên: {user.hoTen}</p>
        <p>Email: {user.email}</p>
        <p>Tài khoản: {user.taiKhoan}</p>
        <p>Số điện thoại: {user.soDT}</p>
      </div>

      <h3 className="text-xl font-semibold mb-4">Lịch sử đặt vé</h3>

      <div className="space-y-4">
        {tickets.map((item: any, index: number) => (
          <div key={index} className="bg-slate-800 p-4 rounded-xl">
            <p className="font-semibold text-lg">{item.tenPhim}</p>
            <p>Ngày đặt: {item.ngayDat}</p>
            <p>Giá vé: {item.giaVe.toLocaleString()} đ</p>
            <p>Thời lượng: {item.thoiLuongPhim} phút</p>

            <p className="mt-2">
              Ghế: {item.danhSachGhe?.map((g: any) => g.tenGhe).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
