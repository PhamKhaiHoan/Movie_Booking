import { useQuery } from "@tanstack/react-query"
import { quanLyDatVeServices } from "@/services/quanLyDatVeServices"
import { queryKeys } from "@/constants/queryKeys"

export const useQueryTicketRoom = (maLichChieu?: string) => {
  return useQuery({
    queryKey: queryKeys.booking.room(maLichChieu || ""),
    enabled: !!maLichChieu,
    queryFn: () => quanLyDatVeServices.getTicketRoom(maLichChieu as string),
    select: (res) => res.data.content,
  })
}
