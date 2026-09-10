import { useQueryListCategories } from '@/hooks/queries/use-fetch-get-categories';
import { RegisterCategoriesDialog } from '../components/register-categories';
import { TableWrapper } from '../components/table-wrapper';
import { CategoriesTable } from './table';
import { usePaginationMeta } from '@/hooks/use-pagination-meta';
import { useSearchParams } from 'react-router';
import { usePaginationParams } from '@/hooks/use-pagination-params';
import { useMemo } from 'react';
import { AppPagination } from '@/ui/components/app-pagination';

export const DashboardCategoriesPage = () => {
  const {
    data: categories = [],
    isError,
    isLoading,
  } = useQueryListCategories();
  const [searchParams] = useSearchParams();
  const { page, perPage } = usePaginationParams(searchParams);

  const pageParsedToNumber = Number(page);
  const perPageParsedToNumber = Number(perPage);

  const { totalPages } = usePaginationMeta({
    page: pageParsedToNumber,
    perPage: perPageParsedToNumber,
    total: categories.length ?? 0,
  });

  const categoriesFiltered = useMemo(() => {
    const startIndex = (pageParsedToNumber - 1) * perPageParsedToNumber;
    const endIndex = startIndex + perPageParsedToNumber;
    return categories.slice(startIndex, endIndex);
  }, [categories, page, perPage]);

  return (
    <TableWrapper title="Categorias" createComp={<RegisterCategoriesDialog />}>
      <CategoriesTable categories={categoriesFiltered} />
      <AppPagination totalPages={totalPages} />
    </TableWrapper>
  );
};
