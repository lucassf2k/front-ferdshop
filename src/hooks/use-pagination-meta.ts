import { useMemo } from 'react';

type Input = {
  total?: number;
  page: number;
  perPage: number;
};

export const usePaginationMeta = ({ page, perPage, total = 0 }: Input) => {
  return useMemo(() => {
    const totalPages = perPage > 0 ? Math.ceil(total / perPage) : 0;

    return {
      totalItems: total,
      currentPage: page,
      perPage,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }, [total, page, perPage]);
};
