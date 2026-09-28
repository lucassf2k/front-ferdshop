export const orderKeys = {
  all: ['orders'] as const,
  pagination: (page: string, perPage: string) =>
    [...orderKeys.all, page, perPage] as const,
  getOfId: (id: string) => [...orderKeys.all, id] as const,
} as const;
