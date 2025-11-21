import { PATH } from "@/constants/path";
// import { AddMovies } from "@/pages/admin/films/AddMovies";
import { AdminLayout } from "@/pages/admin/layouts/AdminLayout";
import { type RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: PATH.ADMIN,
    element: <AdminLayout />, 
    children: [
      {
        index: true,
        // element: <MovieList />,
      },
      {
        path: PATH.ADMIN_FILMS,
        // element: <MovieList />,
      },
      {
        path: PATH.ADMIN_ADD_FILM,
        // element: <AddMovies />,
      },
      // Thêm trang 404 cho admin nếu muốn
    ],
  },

  {
    path: PATH.NOT_FOUND,
    element: <div>404 Not Found</div>,
  },
] as const;
