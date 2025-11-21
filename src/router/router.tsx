import { PATH } from "@/constants/path";
import { type RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: PATH.HOME,
    element: (
    <div>Home Page</div>
),
    children: [
      {
        index: true,
        element: <div>Welcome to the Home Page</div>,
      },
      {
        path: PATH.MOVIE_DETAILS,
        element: <div>Movie Details Page</div>,
      },
    ],
  },

  {
    path: PATH.NOT_FOUND,
    element: <div>404 Not Found</div>,
  },
] as const;
