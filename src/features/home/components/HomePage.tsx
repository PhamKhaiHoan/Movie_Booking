import { Banner } from './Banner'
import { MovieList } from './MovieList'
import { TheaterShowtime } from './TheaterShowtime'

export const HomePage = () => {
  return (
    <div>
      <Banner />
      <MovieList />
      <TheaterShowtime />
    </div>
  )
}
