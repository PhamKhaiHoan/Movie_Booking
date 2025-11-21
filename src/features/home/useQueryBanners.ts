import { queryKeys } from '@/constants'
import { quanLyPhimServices } from '@/services/quanLyPhimServices'
import { useQuery } from '@tanstack/react-query'

export const useQueryBanners = () =>
  useQuery({
    queryKey: queryKeys.banner.lists(),
    queryFn: () => quanLyPhimServices.getBanners(),
    select: (res) => res.data.content,
  })
