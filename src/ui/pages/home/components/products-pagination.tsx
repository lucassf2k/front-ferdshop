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

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProductsPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) return null;

  const pages = generatePaginationPage(currentPage, totalPages);

  const isInvalidPage = (page: number) => {
    return page < 1 || page > totalPages || page === currentPage;
  };

  const handlePageChange =
    (page: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (isInvalidPage(page)) return;
      onPageChange(page);
    };

  const renderPaginationItem = (page: number | 'ellipsis', index: number) => {
    const key = page === 'ellipsis' ? `ellipsis-${index}` : page;
    return (
      <PaginationItem key={key}>
        {page === 'ellipsis' ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink
            href="#"
            isActive={page === currentPage}
            onClick={handlePageChange(page)}
          >
            {page}
          </PaginationLink>
        )}
      </PaginationItem>
    );
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        {pages.map(renderPaginationItem)}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
