import { useQuery } from '@tanstack/react-query'
import { quanLyNguoiDungServices } from '@/services/quanLyNguoiDungServices'
import { queryKeys } from '@/constants'

export const useQueryProfile = () => {
  return useQuery({
    queryKey: queryKeys.profile.details(),
    queryFn: () => quanLyNguoiDungServices.getProfile(),
    select: (res) => res.data.content,
  })
}
