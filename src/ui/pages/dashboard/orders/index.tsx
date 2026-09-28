import { useSearchParams } from 'react-router';
import { TableWrapper } from '../components/table-wrapper';
import { OrdersTable } from './table';
import { usePaginationParams } from '@/hooks/use-pagination-params';
import { usePaginationMeta } from '@/hooks/use-pagination-meta';
import { useListOrdersQuery } from '@/hooks/queries/use-list-orders-query';
import { AppPagination } from '@/ui/components/app-pagination';
import { DataTableSkeleton } from '@/ui/components/skeletons/data-table-skeleton';

export const DashboardOrdersPage = () => {
  const [searchParams] = useSearchParams();
  const { page, perPage } = usePaginationParams(searchParams);
  const { data: ordersData, isPending: isOrdersPending } = useListOrdersQuery({
    page,
    perPage,
  });

  const { totalPages } = usePaginationMeta({
    page: Number(page),
    perPage: Number(perPage),
    total: ordersData?.total ?? 0,
  });

  if (!ordersData || isOrdersPending)
    return (
      <TableWrapper title="Pedidos">
        <DataTableSkeleton />
        <AppPagination totalPages={totalPages} />
      </TableWrapper>
    );

  const hasOrders = ordersData.orders.length > 0;
  const orders = hasOrders ? ordersData.orders : [];

  return (
    <TableWrapper title="Pedidos">
      {isOrdersPending ? (
        <DataTableSkeleton />
      ) : (
        <OrdersTable orders={orders} />
      )}
      <AppPagination totalPages={totalPages} />
    </TableWrapper>
  );
};
