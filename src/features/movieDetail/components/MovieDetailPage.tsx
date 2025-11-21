import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { quanLyPhimServices } from '@/services/quanLyPhimServices'
import { queryKeys } from '@/constants'

export const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.showtime.detail(id as string),
    queryFn: () => quanLyPhimServices.getMovieShowtime(id as string),
    enabled: !!id,
    select: (res) => res.data.content,
  })

  if (isLoading) {
    return <div className="container mx-auto py-10">Đang tải thông tin phim...</div>
  }

  if (!data) {
    return <div className="container mx-auto py-10">Không tìm thấy phim</div>
  }

  const heThongRapChieu = data.heThongRapChieu ?? []

  return (
    <div className="container mx-auto py-10 grid gap-8 md:grid-cols-[300px,1fr]">
      <div>
        <img
          src={data.hinhAnh}
          alt={data.tenPhim}
          className="w-full rounded-xl object-cover"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">{data.tenPhim}</h1>
        {data.moTa && <p className="text-sm text-slate-300 mb-6">{data.moTa}</p>}

        <h2 className="text-xl font-semibold mb-3">Lịch chiếu</h2>

        {heThongRapChieu.length === 0 && (
          <p className="text-sm text-slate-300">Hiện chưa có lịch chiếu.</p>
        )}

        <div className="space-y-4">
          {heThongRapChieu.map((heThong: any) => (
            <div
              key={heThong.maHeThongRap}
              className="border border-slate-700 rounded-lg p-4"
            >
              <p className="font-semibold mb-2">{heThong.tenHeThongRap}</p>

              {heThong.cumRapChieu?.map((cumRap: any) => (
                <div key={cumRap.maCumRap} className="mb-3">
                  <p className="text-sm font-medium">{cumRap.tenCumRap}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {cumRap.lichChieuPhim?.map((lich: any) => (
                      <Link
                        key={lich.maLichChieu}
                        to={`/booking/${lich.maLichChieu}`}
                        className="px-3 py-1 text-xs rounded bg-slate-800 hover:bg-orange-500 hover:text-white transition"
                      >
                        {new Date(lich.ngayChieuGioChieu).toLocaleString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                        })}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
