import { PATH } from '@/constants'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/features/home/components/HomePage'
import { SignInPage } from '@/features/signIn/components/SignInPage'
import { SignUpPage } from '@/features/signIn/components/SignUpPage'
import { BookingPage } from '@/features/booking/components/BookingPage'
import { MovieDetailPage } from '@/features/movieDetail/components/MovieDetailPage'
import { ProfilePage } from '@/features/profile/components/ProfilePage'
import type { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: PATH.HOME,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: PATH.MOVIE_DETAIL, element: <MovieDetailPage /> },
      { path: PATH.BOOKING, element: <BookingPage /> },
      { path: PATH.SIGN_IN, element: <SignInPage /> },
      { path: PATH.SIGN_UP, element: <SignUpPage /> },
      { path: PATH.PROFILE, element: <ProfilePage /> },
    ],
  },
  { path: '*', element: <div className="p-10 text-center">404 Not Found</div> },
]

