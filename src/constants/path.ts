export const PATH = {
  // --- CLIENT (Khách hàng) ---
  HOME: "/",
  MOVIE_DETAIL: 'movie/:id',
  BOOKING: 'booking/:id',
  SIGN_IN: 'sign-in',
  SIGN_UP: 'sign-up',
  PROFILE: 'profile',

  // --- ADMIN (Quản trị) ---
  ADMIN: "/admin",

  ADMIN_FILMS: "/admin/films",
  ADMIN_ADD_FILM: "/admin/films/add",
  ADMIN_EDIT_FILM: "/admin/films/edit/:id",

  ADMIN_USERS: "/admin/users",
  ADMIN_ADD_USER: "/admin/users/add",
  ADMIN_EDIT_USER: "/admin/users/edit/:id",

  ADMIN_SHOWTIME: "/admin/showtimes/:id",
  ADMIN_SHOWTIMES_LIST: "/admin/showtimes",

  NOT_FOUND: "*",
} as const;