export const getProductsFiltersState = (searchParams: URLSearchParams) => {
  const name = searchParams.get('name');
  const categoryId = searchParams.get('category');
  if (name) return { type: 'search', name };
  if (categoryId) return { type: 'category', categoryId };
  return { type: 'all' };
};
