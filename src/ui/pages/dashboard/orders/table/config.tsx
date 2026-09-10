import type { OrderModel } from '@/domain/model/order';
import { formatter } from '@/ui/lib/formatters';
import type { ColumnDef } from '@tanstack/react-table';
import { OrderStatusBadge } from '../components/order-status-badge';
import {
  ORDER_STATUS_CONFIG,
  PAYMENT_METHOD_CONFIG,
  PAYMENT_STATUS_CONFIG,
} from '@/constants/order';

export type OrderDataTable = OrderModel;

export const ordersColumns = (): ColumnDef<OrderDataTable>[] => {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.unwrapTableValue(value);
      },
    },
    {
      accessorKey: 'totalPrice',
      header: 'Total do pedido',
      cell: ({ getValue }) => {
        const value = getValue<number>();
        return formatter.currency(value);
      },
    },
    {
      accessorKey: 'deliveryAddress',
      header: 'Endereço',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.unwrapTableValue(value);
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return <OrderStatusBadge value={value} config={ORDER_STATUS_CONFIG} />;
      },
    },
    {
      accessorKey: 'orderItems',
      header: 'Items',
      cell: ({ getValue }) => {
        const items = getValue<OrderModel['orderItems']>();
        const quantity = items.reduce((acc, i) => acc + i.quantity, 0);
        return `${quantity} ${quantity > 1 ? 'itens' : 'item'}`;
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Criado em',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.date(value);
      },
    },
    {
      accessorKey: 'payment',
      header: 'Método de pagamento',
      cell: ({ getValue }) => {
        const value = getValue<OrderModel['payment']>();
        if (!value || value === null) return '-';
        const cfg = PAYMENT_METHOD_CONFIG[value.method] ?? {
          label: value.method,
          icon: '*',
        };
        return (
          <span className="inline-flex items-center gap-1.5 text-sm text-slate-700">
            <span>{cfg.icon}</span>
            {cfg.label}
          </span>
        );
      },
    },
    {
      accessorKey: 'payment',
      header: 'Status de pagamento',
      cell: ({ getValue }) => {
        const value = getValue<OrderModel['payment']>();
        if (!value || value === null) return '-';
        return (
          <OrderStatusBadge
            value={value.status}
            config={PAYMENT_STATUS_CONFIG}
          />
        );
      },
    },
    {
      accessorKey: 'payment',
      header: 'Pago em',
      cell: ({ getValue }) => {
        const value = getValue<OrderModel['payment']>();
        if (!value || value === null || !value.paidAt) return '-';
        return formatter.date(value.paidAt.toString());
      },
    },
    {
      accessorKey: 'payment',
      header: 'Total pago',
      cell: ({ getValue }) => {
        const value = getValue<OrderModel['payment']>();
        if (!value || value === null) return '-';
        return formatter.currency(value.amount);
      },
    },
  ];
};
