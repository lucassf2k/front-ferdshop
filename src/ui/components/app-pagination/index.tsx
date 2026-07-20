import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/ui/components/ui/pagination';
import { generatePaginationPage } from '@/ui/pages/home/helpers/generate-pagination-page';
import { Link, useLocation, useSearchParams } from 'react-router';
import { PerPageSelect } from '@/ui/components/app-pagination/per-page-select';

interface Props {
  totalPages: number;
  pageParams?: string;
  perPageParams?: string;
  defaultPage?: number;
  defaultPerPage?: number;
}

export const AppPagination = ({
  totalPages,
  pageParams = 'page',
  perPageParams = 'perPage',
  defaultPage = 1,
  defaultPerPage = 10,
}: Props) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get(pageParams) ?? defaultPage);
  const perPage = Number(searchParams.get(perPageParams) ?? defaultPerPage);
  const isOnePage = totalPages === 1;
  const pages = generatePaginationPage(currentPage, totalPages);

  const handleCreateHref = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(pageParams, String(page));
    params.set(perPageParams, String(perPage));
    return `${location.pathname}?${params.toString()}`;
  };

  const renderPaginationItem = (page: number | 'ellipsis', index: number) => {
    const key = page === 'ellipsis' ? `ellipsis-${index}` : page;
    return (
      <PaginationItem key={key}>
        {page === 'ellipsis' ? (
          <PaginationEllipsis />
        ) : (
          <Link to={handleCreateHref(page)}>
            <PaginationLink href="#" isActive={page === currentPage}>
              {page}
            </PaginationLink>
          </Link>
        )}
      </PaginationItem>
    );
  };

  return (
    <Pagination className="flex w-full items-center justify-between p-3">
      <PerPageSelect />

      {!isOnePage && (
        <PaginationContent>
          <PaginationItem>
            <Link to={handleCreateHref(Math.max(1, currentPage - 1))}>
              <PaginationPrevious />
            </Link>
          </PaginationItem>

          {pages.map(renderPaginationItem)}

          <PaginationItem>
            <Link to={handleCreateHref(Math.min(totalPages, currentPage + 1))}>
              <PaginationNext />
            </Link>
          </PaginationItem>
        </PaginationContent>
      )}
    </Pagination>
  );
};
