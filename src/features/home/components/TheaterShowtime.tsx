import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryTheaterSystems, useQueryShowtimeBySystem } from "../useQueryTheaters"

export const TheaterShowtime = () => {
  const { data: theaterSystems, isLoading: isLoadingSystems } = useQueryTheaterSystems()
  const [selectedSystem, setSelectedSystem] = useState<string | undefined>(undefined)

  // khi load xong thì chọn system đầu tiên
  useEffect(() => {
    if (theaterSystems && theaterSystems.length && !selectedSystem) {
      setSelectedSystem(theaterSystems[0].maHeThongRap)
    }
  }, [theaterSystems, selectedSystem])

  const { data: showtimeData, isLoading: isLoadingShowtime } =
    useQueryShowtimeBySystem(selectedSystem)

  if (isLoadingSystems) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-center">Đang tải hệ thống rạp...</p>
      </div>
    )
  }

  if (!theaterSystems || !theaterSystems.length) {
    return null
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="mb-6 text-xl font-bold text-white">Lịch chiếu theo cụm rạp</h2>

      <div className="grid gap-8 md:grid-cols-[220px,1fr]">
        {/* Cột bên trái: hệ thống rạp */}
        <div className="space-y-2 rounded-xl bg-slate-800/80 p-3">
          {theaterSystems.map((sys) => {
            const isActive = sys.maHeThongRap === selectedSystem

            return (
              <button
                key={sys.maHeThongRap}
                type="button"
                onClick={() => setSelectedSystem(sys.maHeThongRap)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition
                  ${isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700/70'}`}
              >
                <img
                  src={sys.logo}
                  alt={sys.tenHeThongRap}
                  className="h-8 w-8 flex-shrink-0 rounded bg-white object-contain p-1"
                />
                <span>{sys.tenHeThongRap}</span>
              </button>
            )
          })}
        </div>

        {/* Cột bên phải: cụm rạp + lịch chiếu */}
        <div className="space-y-6">
          {isLoadingShowtime && (
            <p className="text-sm text-slate-300">Đang tải lịch chiếu...</p>
          )}

          {showtimeData?.map((sys) =>
            sys.lstCumRap.map((cumRap) => (
              <div
                key={`${sys.maHeThongRap}-${cumRap.tenCumRap}`}
                className="rounded-xl bg-slate-800/80 p-4"
              >
                <h3 className="text-base font-semibold text-white">
                  {cumRap.tenCumRap}
                </h3>
                <p className="mb-3 text-xs text-slate-400">{cumRap.diaChi}</p>

                {cumRap.lichChieuPhim?.slice(0, 6).map((lich) => (
                  <Link
                    key={lich.maLichChieu}
                    to={`/booking/${lich.maLichChieu}`}
                    className="mr-2 mb-2 inline-flex items-center rounded border border-orange-500 px-2 py-1 text-xs text-orange-300 hover:bg-orange-500 hover:text-white"
                  >
                    {new Date(lich.ngayChieuGioChieu).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Link>
                ))}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  )
}
