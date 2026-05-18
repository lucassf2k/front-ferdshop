export const productKeys = {
  all: ['products'] as const,
  bestSellers: () => [...productKeys.all, 'best-sellers'] as const,
};
