import { BannerInfoOrganization } from '@/ui/pages/home/components/banner-info-organization';
import { BestSellers } from '@/ui/pages/home/components/best-sellers';
import { SearchBar } from '@/ui/pages/home/components/search-bar';
import { ShoppingCart } from '@/ui/pages/home/components/shopping-cart';
import { CategoriesSelector } from '@/ui/pages/home/components/categories-selector';
import { ListProducts } from '@/ui/pages/home/components/list-products';
import { useListProductsQuery } from '@/hooks/queries/use-list-products-query';
import { useSearchParams } from 'react-router';
import { ProductsPagination } from './components/products-pagination';
import { ProductPerPageSelect } from './components/product-per-page-select';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? DEFAULT_PAGE);
  const perPage = Number(searchParams.get('perPage') ?? DEFAULT_PER_PAGE);

  const { data, isLoading } = useListProductsQuery({
    page: String(page),
    perPage: String(perPage),
  });

  console.log(data);

  const totalProducts = data?.total ?? 0;
  const totalPages = Math.ceil(totalProducts / perPage);

  const handlePageChange = (newPage: number) => {
    setSearchParams((previousParams) => {
      previousParams.set('page', String(newPage));
      previousParams.set('perPage', String(perPage));
      return previousParams;
    });
  };

  return (
    <>
      {/* IMAGE DE FUNDO */}
      <div className="h-80 w-full bg-red-500">
        <div className="pointer-events-none h-full w-full bg-linear-to-b from-black/0 via-black/40 to-black/90" />
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="-mt-6 flex h-full w-full flex-col items-center rounded-t-[1.8rem] bg-neutral-200 p-8">
        <div className="w-[90%]">
          {/* BANNER INFO ORGANIZATION */}
          <BannerInfoOrganization />

          <div className="relative -mt-4 grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(250px,30%)]">
            <div className="flex flex-col gap-6">
              {/* SEARCH BAR */}
              <SearchBar />

              {/* LISTAGEM DE CATEGORIAS */}
              <CategoriesSelector />
              {/* MAIS VENDIDOS */}
              <BestSellers />

              {/* LISTAGEM DE PRODUTOS */}
              <div className="space-y-3">
                <ListProducts products={data?.products} isLoading={isLoading} />

                <div className="flex w-full items-center justify-between">
                  {totalPages > 1 && (
                    <ProductPerPageSelect
                      value={perPage}
                      onValueChange={(value) => {
                        handlePageChange(value);
                      }}
                    />
                  )}
                  {/* PAGINAÇÃO */}
                  <ProductsPagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>

            {/* CARRINHO */}
            <ShoppingCart />
          </div>
        </div>
      </div>
    </>
  );
};
