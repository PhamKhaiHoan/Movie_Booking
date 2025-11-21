import { useParams } from "react-router-dom"
import { useState, useMemo } from "react"
import { useQueryTicketRoom } from "../useQueryTicketRoom"
import { quanLyDatVeServices } from "@/services/quanLyDatVeServices"
import { useAuth } from "@/hooks/useAuth"

export const BookingPage = () => {
  const { id: maLichChieu } = useParams<{ id: string }>()

  const { user, accessToken } = useAuth()

  const { data, isLoading } = useQueryTicketRoom(maLichChieu)

  const [selectedSeats, setSelectedSeats] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleSeat = (seat: any) => {
    if (seat.daDat) return

    const exists = selectedSeats.some((g) => g.maGhe === seat.maGhe)

    if (exists) {
      setSelectedSeats(selectedSeats.filter((g) => g.maGhe !== seat.maGhe))
    } else {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  const total = useMemo(
    () => selectedSeats.reduce((sum, g) => sum + g.giaVe, 0),
    [selectedSeats]
  )

  const handleBooking = async () => {
    if (!accessToken) {
      alert("Bạn cần đăng nhập trước khi đặt vé!")
      return
    }

    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất 1 ghế")
      return
    }

    const danhSachVe = selectedSeats.map((g) => ({
      maGhe: g.maGhe,
      giaVe: g.giaVe,
    }))

    try {
      setIsSubmitting(true)

      await quanLyDatVeServices.datVe({
      maLichChieu: Number(maLichChieu),
    danhSachVe,
  })


      alert("Đặt vé thành công!")
      setSelectedSeats([])

    } catch (err) {
      alert("Đặt vé thất bại!")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-white">Đang tải dữ liệu phòng vé...</p>
      </div>
    )
  }

  const room = data?.thongTinPhim
  const seats = data?.danhSachGhe || []

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-xl font-bold text-white mb-6">
        Đặt vé – {room?.tenCumRap} | {room?.tenRap}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* GHẾ */}
        <div className="lg:col-span-2 space-y-4">

          <div className="grid grid-cols-10 gap-2">
            {seats.map((seat: any) => {
              const isSelected = selectedSeats.some(
                (g) => g.maGhe === seat.maGhe
              )

              const isVip = seat.loaiGhe === "Vip"

              return (
                <button
                  key={seat.maGhe}
                  disabled={seat.daDat}
                  onClick={() => toggleSeat(seat)}
                  className={`
                    h-8 rounded text-xs flex items-center justify-center
                    ${seat.daDat ? "bg-gray-600 cursor-not-allowed" : ""}
                    ${isSelected ? "bg-green-500" : ""}
                    ${
                      !seat.daDat && !isSelected
                        ? isVip
                          ? "bg-orange-500"
                          : "bg-slate-700"
                        : ""
                    }
                  `}
                >
                  {seat.tenGhe}
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl text-white space-y-3">
          <h3 className="font-semibold text-lg">Thông tin đặt vé</h3>
          <p>Phim: {room?.tenPhim}</p>
          <p>Rạp: {room?.tenCumRap} – {room?.tenRap}</p>
          <p>Ngày chiếu: {room?.ngayChieu} – {room?.gioChieu}</p>

          <p className="mt-4 font-semibold">
            Ghế đã chọn:{" "}
            {selectedSeats.map((g) => g.tenGhe).join(", ") || "Chưa chọn"}
          </p>

          <p className="font-semibold text-yellow-400">
            Tổng tiền: {total.toLocaleString()} đ
          </p>

          <button
            disabled={isSubmitting}
            onClick={handleBooking}
            className="bg-orange-500 px-4 py-2 rounded w-full mt-3"
          >
            {isSubmitting ? "Đang đặt..." : "Đặt vé"}
          </button>
        </div>
      </div>
    </div>
  )
}
