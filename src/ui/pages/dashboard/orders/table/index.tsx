import { type OrderModel } from '@/domain/model/order';
import { DataTable } from '@/ui/components/data-table';
import { ordersColumns } from '@/ui/pages/dashboard/orders/table/config';

interface Props {
  orders: OrderModel[];
}

export const OrdersTable = ({ orders }: Props) => {
  const columns = ordersColumns();
  return <DataTable columns={columns} data={orders} />;
};
