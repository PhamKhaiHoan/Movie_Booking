import { PATH } from "@/constants/path";
import { MovieList } from "@/pages/admin/films/MovieList";
import { AddMovies } from "@/pages/admin/films/AddMovies";
import { AdminLayout } from "@/pages/admin/layouts/AdminLayout";
import { type RouteObject } from "react-router-dom";
import { EditMovie } from "@/pages/admin/films/EditMovie";
import { Showtime } from "@/pages/admin/films/ShowTime";
import { UserList } from "@/pages/admin/users/UserList";
import { AddUser } from "@/pages/admin/users/AddUser";
import { ShowtimeList } from "@/pages/admin/films/ShowtimeList";

export const routes: RouteObject[] = [
  // --- Route cho Admin ---
  {
    path: PATH.ADMIN, // "/admin"
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

  {
    path: PATH.NOT_FOUND,
    element: <div>404 Not Found</div>,
  },
] as const;
