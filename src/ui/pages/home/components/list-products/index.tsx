import type { ProductModel } from '@/domain/model/product';
import { ListProductItemSkeleton } from '@/ui/components/skeletons/list-products-skeleton';
import { Spinner } from '@/ui/components/ui/spinner';
import { ListProducItem } from '@/ui/pages/home/components/list-products/list-product-item';

interface ListProductsProps {
  products: ProductModel[] | undefined;
  isLoading: boolean;
}

export const ListProducts = ({ products, isLoading }: ListProductsProps) => {
  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <ListProductItemSkeleton key={index} />
      ));
    }
    if (products === undefined) {
      return null;
    }
    if (products.length === 0) {
      return (
        <div className="col-span-full flex min-h-75 items-center justify-center rounded-2xl bg-white">
          <p className="text-gray-500">Nenhum produto encontrado</p>
        </div>
      );
    }
    return products.map((product) => (
      <ListProducItem key={product.id} product={product} />
    ));
  };

  const hasProduct = (products?.length ?? 0) > 0;

  return (
    <div className="h-full">
      <h2 className="text-lg font-bold uppercase">
        {hasProduct ? 'Todos os produtos' : 'Sem produtos'}
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 min-[600px]:grid-cols-2 min-[860px]:grid-cols-3">
        {renderContent()}
      </div>
    </div>
  );
};
