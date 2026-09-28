import type { OrderModel } from '@/domain/model/order';
import { formatter } from '@/ui/lib/formatters';
import type { ColumnDef } from '@tanstack/react-table';
import { OrderStatusBadge } from '../components/order-status-badge';
import {
  DELIVERY_OPTION_CONFIG,
  ORDER_STATUS_CONFIG,
  PAYMENT_OPTION_CONFIG,
  PAYMENT_STATUS_CONFIG,
} from '@/constants/order';
import { Link } from 'react-router';

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
      accessorKey: 'customerName',
      header: 'Nome do cliente',
    },
    {
      accessorKey: 'customerPhone',
      header: 'Telefone do cliente',
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
      accessorKey: 'addressNumber',
      header: 'Número da casa',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.unwrapTableValue(value);
      },
    },
    {
      accessorKey: 'deliveryOption',
      header: 'Opção de entrega',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return (
          <OrderStatusBadge value={value} config={DELIVERY_OPTION_CONFIG} />
        );
      },
    },
    {
      accessorKey: 'complement',
      header: 'Complemento',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.unwrapTableValue(value);
      },
    },
    {
      accessorKey: 'reference',
      header: 'Referência',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.unwrapTableValue(value);
      },
    },
    {
      accessorKey: 'notes',
      header: 'Observações',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.unwrapTableValue(value);
      },
    },
    {
      accessorKey: 'needChange',
      header: 'Precisa de troco',
      cell: ({ getValue }) => {
        const value = getValue<boolean>();
        return value ? 'Sim' : 'Não';
      },
    },
    {
      accessorKey: 'changeFor',
      header: 'Troco para',
      cell: ({ getValue }) => {
        const value = getValue<number>();
        return formatter.currency(value);
      },
    },
    {
      accessorKey: 'scheduleDate',
      header: 'Data de entrega',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.date(value);
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
      accessorFn: (row) => row.payment?.method,
      id: 'paymentMethod',
      header: 'Método de pagamento',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        if (!value) return '-';
        return (
          <OrderStatusBadge value={value} config={PAYMENT_OPTION_CONFIG} />
        );
      },
    },
    {
      accessorFn: (row) => row.payment?.status,
      id: 'paymentStatus',
      header: 'Status de pagamento',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        if (!value) return '-';
        return (
          <OrderStatusBadge value={value} config={PAYMENT_STATUS_CONFIG} />
        );
      },
    },
    {
      accessorFn: (row) => row.payment?.paidAt,
      id: 'paymentPaidAt',
      header: 'Pago em',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        if (!value) return '-';
        return formatter.date(value);
      },
    },
    {
      accessorFn: (row) => row.payment?.amount,
      id: 'paymentAmount',
      header: 'Total pago',
      cell: ({ getValue }) => {
        const value = getValue<number>();
        if (!value) return '-';
        return formatter.currency(value);
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
      accessorFn: (row) => row.id,
      accessorKey: 'action',
      header: 'Ações',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return (
          <Link to={`${value}`} className="text-sm text-blue-400">
            Ver detalhes
          </Link>
        );
      },
    },
  ];
};
