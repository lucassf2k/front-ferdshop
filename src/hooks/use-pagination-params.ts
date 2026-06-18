import { useSearchParams } from 'react-router';

export const usePaginationParams = (
  pageParams = 'page',
  perPageParams = 'perPage',
) => {
  const [searchParams] = useSearchParams();
  return {
    page: searchParams.get(pageParams) ?? '1',
    perPage: searchParams.get(perPageParams) ?? '10',
  };
};
