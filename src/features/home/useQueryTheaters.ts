import { useQuery } from "@tanstack/react-query"
import { quanLyRapServices } from "@/services/quanLyRapServices"
import { queryKeys } from "@/constants"

type TheaterSystem = {
  maHeThongRap: string
  tenHeThongRap: string
  logo: string
}

type ShowtimeMovie = {
  maLichChieu: number
  tenPhim: string
  ngayChieuGioChieu: string
}

type CumRap = {
  tenCumRap: string
  diaChi: string
  lichChieuPhim: ShowtimeMovie[]
}

export type TheaterShowtimeData = {
  maHeThongRap: string
  tenHeThongRap: string
  logo: string
  lstCumRap: CumRap[]
}

export const useQueryTheaterSystems = () =>
  useQuery({
    queryKey: queryKeys.theaters.lists(),
    queryFn: () => quanLyRapServices.getTheaterSystems(),
    select: (res) => res.data.content as TheaterSystem[],
  })

export const useQueryShowtimeBySystem = (maHeThongRap: string | undefined) =>
  useQuery({
    queryKey: queryKeys.showtime.detail(maHeThongRap || ""),
    enabled: !!maHeThongRap,
    queryFn: () =>
      quanLyRapServices.getShowtimeBySystem(maHeThongRap as string),
    select: (res) => res.data.content as TheaterShowtimeData[],
  })
