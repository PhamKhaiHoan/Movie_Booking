import { queryKeys } from '@/constants'
import { quanLyPhimServices } from '@/services/quanLyPhimServices'
import { useQuery } from '@tanstack/react-query'

export const useQueryMovies = () =>
  useQuery({
    queryKey: queryKeys.movies.lists(),
    queryFn: () => quanLyPhimServices.getMovies(),
    select: (res) => res.data.content,
  })
