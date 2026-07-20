export const productKeys = {
  all: ['products'] as const,
  pagination: (page: string, perPage: string) =>
    [...productKeys.all, page, perPage] as const,
  bestSellers: () => [...productKeys.all, 'best-sellers'] as const,
  search: (
    page: string,
    perPage: string,
    filters: {
      name?: string;
      categoryId?: string;
    },
  ) => [...productKeys.pagination(page, perPage), filters] as const,
};
