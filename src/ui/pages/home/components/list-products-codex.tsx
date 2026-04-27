import { CiStar } from 'react-icons/ci';
import { Button } from '@/ui/components/ui/button';
import { BsCartPlus } from 'react-icons/bs';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/ui/components/ui/pagination';
import { useSearchParams } from 'react-router';

import logoImage from '@/ui/assets/logo.png';

const ListProducItem = () => {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex justify-between">
        <img src={logoImage} alt="Água" className="h-24 w-24 object-cover" />
        <div className="space-y-1 text-end">
          <p className="text-sm font-bold text-green-500">R$ 8.98</p>
          <span className="flex items-center gap-1">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </span>
        </div>
      </div>

      <div>
        <p className="max-w-32 text-sm leading-7 font-bold">ÁGUA</p>
        <p className="text-sm text-gray-500">descrição</p>
      </div>

      <Button className="mt-10 h-10 w-12 cursor-pointer rounded-xl border border-green-500 bg-transparent text-green-500 transition-all duration-200 hover:bg-green-500 hover:text-white">
        <BsCartPlus />
      </Button>
    </div>
  );
};

const mockProducts = Array.from({ length: 64 }, (_, i) => ({ id: i + 1 }));

const ListProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get('page') ?? '1');
  const perPageParam = Number(searchParams.get('perPage') ?? '12');

  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const perPage =
    Number.isFinite(perPageParam) && perPageParam > 0 ? perPageParam : 12;

  const totalItems = mockProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  const currentPage = Math.min(page, totalPages);

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedProducts = mockProducts.slice(start, end);

  const updateParams = (nextPage: number, nextPerPage = perPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(nextPage));
    params.set('perPage', String(nextPerPage));
    setSearchParams(params);
  };

  const goToPage = (target: number) => {
    if (target < 1 || target > totalPages) return;
    updateParams(target);
  };

  return (
    <div className="h-full">
      <h2 className="text-lg font-bold uppercase">Todos os produtos</h2>

      {/* Optional: perPage control synced with URL */}
      <div className="mt-3 flex items-center gap-2">
        <label htmlFor="perPage" className="text-sm text-gray-600">
          Itens por página:
        </label>
        <select
          id="perPage"
          value={perPage}
          onChange={(e) => updateParams(1, Number(e.target.value))}
          className="h-9 rounded-md border px-2 text-sm"
        >
          {[6, 12, 18, 24].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {paginatedProducts.map((product) => (
          <ListProducItem key={product.id} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
