export const usePaginationParams = (
  searchParams: URLSearchParams,
  pageParams = 'page',
  perPageParams = 'perPage',
) => {
  return {
    page: searchParams.get(pageParams) ?? '1',
    perPage: searchParams.get(perPageParams) ?? '10',
  };
};
