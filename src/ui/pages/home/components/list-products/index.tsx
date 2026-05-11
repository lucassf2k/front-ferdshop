import type { ProductModel } from '@/domain/model/product';
import { ListProductItemSkeleton } from '@/ui/components/skeletons/list-products-skeleton';
import { ListProducItem } from '@/ui/pages/home/components/list-products/list-product-item';

interface ListProductsProps {
  products: ProductModel[] | undefined;
  isLoading: boolean;
}

export const ListProducts = ({ products, isLoading }: ListProductsProps) => {
  const renderContent = () => {
    if (!products?.length) {
      return <h2 className="text-lg font-bold uppercase">Sem produtos</h2>;
    }
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <ListProductItemSkeleton key={index} />
      ));
    }
    return products.map((product) => (
      <ListProducItem key={product.id} product={product} />
    ));
  };

  const hasProduct = Boolean(products?.length);

  return (
    <div className="h-full">
      <h2 className="text-lg font-bold uppercase">
        {hasProduct ? 'Todos os produtos' : 'Sem produtos'}
      </h2>

      <div className="mt-4 grid grid-cols-3 gap-4">{renderContent()}</div>
    </div>
  );
};
