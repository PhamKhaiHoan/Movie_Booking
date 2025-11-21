import { PATH } from "@/constants/path";
import { type RouteObject } from "react-router-dom";

// --- IMPORT ADMIN COMPONENTS ---
import { MovieList } from "@/pages/admin/films/MovieList";
import { AddMovies } from "@/pages/admin/films/AddMovies";
import { AdminLayout } from "@/pages/admin/layouts/AdminLayout";
import { EditMovie } from "@/pages/admin/films/EditMovie";
import { Showtime } from "@/pages/admin/films/ShowTime";
import { UserList } from "@/pages/admin/users/UserList";
import { AddUser } from "@/pages/admin/users/AddUser";
import { ShowtimeList } from "@/pages/admin/films/ShowtimeList";

// --- IMPORT CLIENT COMPONENTS ---
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/features/home/components/HomePage";
import { SignInPage } from "@/features/signIn/components/SignInPage";
import { SignUpPage } from "@/features/signIn/components/SignUpPage";
import { BookingPage } from "@/features/booking/components/BookingPage";
import { MovieDetailPage } from "@/features/movieDetail/components/MovieDetailPage";
import { ProfilePage } from "@/features/profile/components/ProfilePage";
import { AdminGuard } from "./AdminGuard";

export const routes: RouteObject[] = [
  // ==============================
  // 1. CLIENT ROUTES (Khách hàng)
  // ==============================
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

  // ==============================
  // 2. ADMIN ROUTES (Quản trị)
  // ==============================
  {
    path: PATH.ADMIN,
    element: <AdminGuard />, 
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <MovieList />,
          },
          {
            path: PATH.ADMIN_FILMS,
            element: <MovieList />,
          },
          {
            path: PATH.ADMIN_ADD_FILM,
            element: <AddMovies />,
          },
          {
            path: PATH.ADMIN_EDIT_FILM,
            element: <EditMovie />,
          },
          {
            path: PATH.ADMIN_USERS,
            element: <UserList />,
          },
          {
            path: PATH.ADMIN_ADD_USER,
            element: <AddUser />,
          },
          {
            path: PATH.ADMIN_EDIT_USER,
            element: <AddUser />,
          },
          {
            path: PATH.ADMIN_SHOWTIME,
            element: <Showtime />,
          },
          {
            path: PATH.ADMIN_SHOWTIMES_LIST,
            element: <ShowtimeList />,
          },
        ],
      },
    ],
  },

  // ==============================
  // 3. NOT FOUND
  // ==============================
  {
    path: "*",
    element: (
      <div className="p-10 text-center text-xl">404 - Không tìm thấy trang</div>
    ),
  },
];
