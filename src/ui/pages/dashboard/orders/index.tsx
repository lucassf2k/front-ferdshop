import { TableWrapper } from '../components/table-wrapper';
import { OrdersTable } from './table';

export const DashboardOrdersPage = () => {
  return (
    <TableWrapper title="Pedidos">
      <OrdersTable />
    </TableWrapper>
  );
};
