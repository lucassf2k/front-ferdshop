import { useListProductsQuery } from '@/hooks/queries/use-list-products-query';
import { ProductsTable } from './table';
import { TableWrapper } from '../components/table-wrapper';
import { useState } from 'react';
import { UpdateProductDialog } from './components/update-register-dialog';
import type { ProductDataTable } from './table/config';
import { useSoftDeleteProductOfIdMutation } from '@/hooks/mutations/use-soft-delete-product-of-id-mutation';
import { DeleteTableItemDialog } from '../components/delete-table-item-dialog';
import { AppPagination } from '@/ui/components/app-pagination';
import { usePaginationParams } from '@/hooks/use-pagination-params';
import { usePaginationMeta } from '@/hooks/use-pagination-meta';
import { DataTableSkeleton } from '@/ui/components/skeletons/data-table-skeleton';

export const DashboardProductsPage = () => {
  const { page, perPage } = usePaginationParams();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data: productData, isPending } = useListProductsQuery({
    page,
    perPage,
  });

  const { totalPages } = usePaginationMeta({
    page: Number(page),
    perPage: Number(perPage),
    total: productData?.total ?? 0,
  });

  const { mutate: deleteProductMutate, isPending: isDeleteProductPending } =
    useSoftDeleteProductOfIdMutation();

  const handleEditProduct = (product: ProductDataTable) => {
    setIsEditing((prev) => !prev);
    console.log(product);
  };
  const handleDeleteProduct = (id: string) => {
    return () => deleteProductMutate({ id });
  };

  if (!productData) return null;

  const hasProducts = productData.products.length > 0;
  const products = hasProducts ? productData.products : [];

  return (
    <TableWrapper>
      {isPending ? (
        <DataTableSkeleton />
      ) : (
        <>
          <ProductsTable
            products={products}
            renderEditComp={(product) => (
              <UpdateProductDialog
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  stock: product.price,
                  description: product.description || '',
                  categoryId: product.id,
                  imageUrl: product.imageUrl,
                }}
              />
            )}
            renderDeleteComp={(product) => (
              <DeleteTableItemDialog
                name={product.name}
                isLoading={isDeleteProductPending}
                onDelete={handleDeleteProduct(product.id)}
              />
            )}
          />
          <AppPagination totalPages={totalPages} />
        </>
      )}
    </TableWrapper>
  );
};
