import { PATH } from "@/constants/path";
import { MovieList } from "@/pages/admin/films/MovieList";
import { AddMovies } from "@/pages/admin/films/AddMovies";
import { AdminLayout } from "@/pages/admin/layouts/AdminLayout";
import { type RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  // --- Route cho Admin ---
  {
    path: PATH.ADMIN, // "/admin"
    element: <AdminLayout />,
    children: [
      {
        index: true, // Vào /admin là thấy list phim luôn
        element: <MovieList />,
      },
      {
        path: PATH.ADMIN_FILMS, // "films" -> /admin/films
        element: <MovieList />,
      },
      {
        path: PATH.ADMIN_ADD_FILM, // "films/add" -> /admin/films/add
        element: <AddMovies />,
      },
    ],
  },

  {
    path: PATH.NOT_FOUND,
    element: <div>404 Not Found</div>,
  },
] as const;
