import { useState, useMemo, type SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { useQueryMovies } from '../hooks/useQueryMovies'
import type { Movie } from '@/types'

type TabKey = 'dangChieu' | 'sapChieu'

const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = 'https://via.placeholder.com/300x450?text=No+Image'
  e.currentTarget.onerror = null
}

export const MovieList = () => {
  const { data, isLoading } = useQueryMovies()
  const [activeTab, setActiveTab] = useState<TabKey>('dangChieu')

  const movies: Movie[] = (data as Movie[]) ?? []

  const filteredMovies = useMemo(() => {
    if (!movies.length) return []

    if (activeTab === 'dangChieu') {
      const list = movies.filter((m: any) => m.dangChieu)
      return list.length ? list : movies
    }

    if (activeTab === 'sapChieu') {
      const list = movies.filter((m: any) => m.sapChieu)
      return list.length ? list : movies
    }

    return movies
  }, [movies, activeTab])

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-center">Đang tải danh sách phim...</p>
      </div>
    )
  }

  if (!movies.length) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-center">Không tìm thấy phim.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold text-white">Danh sách phim</h2>

        <div className="inline-flex rounded-full bg-slate-800 p-1 text-sm">
          <button
            type="button"
            onClick={() => setActiveTab('dangChieu')}
            className={`px-4 py-1 rounded-full transition ${
              activeTab === 'dangChieu'
                ? 'bg-orange-500 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            Đang chiếu
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sapChieu')}
            className={`px-4 py-1 rounded-full transition ${
              activeTab === 'sapChieu'
                ? 'bg-orange-500 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            Sắp chiếu
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredMovies.map((movie) => (
          <div
            key={movie.maPhim}
            className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-700/60 bg-slate-800/80 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative w-full bg-slate-700 aspect-[2/3]">
              <img
                src={movie.hinhAnh}
                alt={movie.tenPhim}
                className="absolute inset-0 h-full w-full object-cover"
                onError={handleImgError}
              />
            </div>

            <div className="flex flex-1 flex-col p-3">
              <p className="min-h-[40px] text-sm font-semibold text-white">
                {movie.tenPhim}
              </p>

              <Link
                to={`/movie/${movie.maPhim}`}
                className="mt-3 inline-flex items-center justify-center rounded bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-400"
              >
                Đặt vé
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
