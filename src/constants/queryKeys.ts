export const queryKeys = {
  booking: {
    room: (id: string) => ['booking-room', id],
  },

  movies: {
    list: ['movies-list'],
    banner: ['movies-banner'],
    detail: (id: string) => ['movie-detail', id],
  },

  auth: {
    profile: ['auth-profile'],
  },
}
