export const productKeys = {
  all: ['products'] as const,
  pagination: (page: string, perPage: string) =>
    [...productKeys.all, page, perPage] as const,
  bestSellers: () => [...productKeys.all, 'best-sellers'] as const,
};
