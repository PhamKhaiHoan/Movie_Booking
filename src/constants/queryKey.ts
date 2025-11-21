type QueryKeyFactory<T extends readonly unknown[]> = {
  all: T
  lists: () => readonly [...T, 'list']
  details: () => readonly [...T, 'detail']
  detail: (id: string | number) => readonly [...T, 'detail', string | number]
}

function createQueryKeyFactory<T extends string>(baseKey: T): QueryKeyFactory<[T]> {
  return {
    all: [baseKey] as const,
    lists: () => [baseKey, 'list'] as const,
    details: () => [baseKey, 'detail'] as const,
    detail: (id) => [baseKey, 'detail', id] as const,
  }
}

export const queryKeys = {
  banner: createQueryKeyFactory('banner'),
  movies: createQueryKeyFactory('movies'),
  theaters: createQueryKeyFactory('theaters'),
  showtime: createQueryKeyFactory('showtime'),
  ticketRoom: createQueryKeyFactory('ticketRoom'),
  profile: createQueryKeyFactory('profile'),
}
