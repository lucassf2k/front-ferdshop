import { BannerInfoOrganization } from '@/ui/pages/home/components/banner-info-organization';
import { BestSellers } from '@/ui/pages/home/components/best-sellers';
import { SearchBar } from '@/ui/pages/home/components/search-bar';
import { ShoppingCart } from '@/ui/pages/home/components/shopping-cart';
import { CategoriesSelector } from '@/ui/pages/home/components/categories-selector';
import { ListProducts } from '@/ui/pages/home/components/list-products';
import { useListProductsQuery } from '@/hooks/queries/use-list-products-query';
import { useSearchParams } from 'react-router';
import { AppPagination } from '@/ui/components/app-pagination';
import { usePaginationMeta } from '@/hooks/use-pagination-meta';
import { getProductsFiltersState } from './helpers/getProductsFilters';
import { useState } from 'react';
import bannerImage from '@/ui/assets/banner.jpeg';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? DEFAULT_PAGE);
  const perPage = Number(searchParams.get('perPage') ?? DEFAULT_PER_PAGE);
  const currentSearch = searchParams.get('name') ?? '';
  const categoryId = searchParams.get('category') ?? undefined;
  const [draftSearch, setDraftSearch] = useState(currentSearch);
  const state = getProductsFiltersState(searchParams);
  const { data, isLoading } = useListProductsQuery({
    page: String(page),
    perPage: String(perPage),
    name: state.name,
    categoryId: state.categoryId,
  });
  const totalProducts = data?.total ?? 0;
  const { totalPages } = usePaginationMeta({
    page,
    perPage,
    total: totalProducts,
  });

  const handleSearch = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const value = draftSearch.trim();
      if (value) {
        params.set('name', value);
      } else {
        params.delete('name');
      }
      params.delete('category');
      params.set('page', '1');
      return params;
    });
  };

  const handleCategorySelector = (categoryId?: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (categoryId) {
        params.set('category', categoryId);
      } else {
        params.delete('category');
      }
      params.delete('name');
      params.set('page', '1');
      return params;
    });
  };

  return (
    <>
      {/* IMAGE DE FUNDO */}
      <img
        src={bannerImage}
        alt="Imagem de fundo"
        className="h-full w-screen"
      />

      {/* CONTEÚDO PRINCIPAL */}
      <div className="-mt-6 flex w-full min-w-120 flex-col items-center rounded-t-[1.8rem] bg-slate-200 p-8">
        <div className="w-[90%]">
          {/* BANNER INFO ORGANIZATION */}
          <BannerInfoOrganization />

          <div className="relative -mt-4 grid grid-cols-1 items-start gap-4 min-[1200px]:grid-cols-[minmax(0,1fr)_minmax(250px,30%)]">
            <div className="flex flex-col gap-6">
              {/* SEARCH BAR */}
              <SearchBar
                value={draftSearch}
                onChange={(value) => {
                  setDraftSearch(value);

                  if (!value.trim()) {
                    setSearchParams((prev) => {
                      const params = new URLSearchParams(prev);
                      params.delete('name');
                      params.set('page', '1');
                      return params;
                    });
                  }
                }}
                onSearch={handleSearch}
              />

              {/* LISTAGEM DE CATEGORIAS */}
              <CategoriesSelector
                activeCategoryId={categoryId}
                onSelect={handleCategorySelector}
              />
              {/* MAIS VENDIDOS */}
              <BestSellers />

              {/* LISTAGEM DE PRODUTOS */}
              <div className="space-y-3">
                <ListProducts products={data?.products} isLoading={isLoading} />

                <div className="flex w-full items-center justify-between">
                  {/* PAGINAÇÃO */}
                  <AppPagination totalPages={totalPages} />
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
