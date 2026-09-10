import {
  PaymentMethodEnum,
  PaymentProviderEnum,
  PaymentStatusEnum,
  type OrderModel,
} from '@/domain/model/order';
import { DataTable } from '@/ui/components/data-table';
import { ordersColumns } from '@/ui/pages/dashboard/orders/table/config';

const fakeOrders: OrderModel[] = [
  {
    id: 'order-001',
    totalPrice: 89.9,
    status: 'PAID',
    deliveryAddress: 'Rua das Flores, 123, Centro',
    latitude: -5.795,
    longitude: -35.2094,
    userId: 'user-001',
    createdAt: new Date('2026-09-01T10:30:00'),
    updatedAt: new Date('2026-09-01T10:35:00'),

    orderItems: [
      {
        id: 'item-001',
        quantity: 2,
        unitPrice: 29.95,
        productId: 'product-001',
      },
      {
        id: 'item-002',
        quantity: 1,
        unitPrice: 30.0,
        productId: 'product-002',
      },
    ],

    payment: {
      amount: 89.9,
      method: PaymentMethodEnum.PIX,
      status: PaymentStatusEnum.PAID,
      provider: PaymentProviderEnum.ABACATE,
      orderId: 'abacate-pay-001',
      providerId: 'abacate-pay-001',
      paidAt: new Date('2026-09-01T10:34:00'),
      createdAt: new Date('2026-09-01T10:30:00'),
      updatedAt: new Date('2026-09-01T10:34:00'),
    },
  },

  {
    id: 'order-002',
    totalPrice: 150.0,
    status: 'PENDING',
    deliveryAddress: 'Av. Brasil, 456, Centro',
    latitude: -5.7938,
    longitude: -35.1986,
    userId: 'user-002',
    createdAt: new Date('2026-09-02T14:20:00'),
    updatedAt: new Date('2026-09-02T14:20:00'),

    orderItems: [
      {
        id: 'item-002',
        quantity: 3,
        unitPrice: 50.0,
        productId: 'product-003',
      },
    ],

    payment: {
      amount: 150.0,
      method: PaymentMethodEnum.CARD,
      status: PaymentStatusEnum.PENDING,
      provider: PaymentProviderEnum.ABACATE,
      orderId: 'abacate-pay-002',
      providerId: 'abacate-pay-002',
      paidAt: null,
      createdAt: new Date('2026-09-02T14:20:00'),
      updatedAt: new Date('2026-09-02T14:20:00'),
    },
  },

  {
    id: 'order-003',
    totalPrice: 45.5,
    status: 'CANCELED',
    deliveryAddress: 'Rua Central, 789, Bairro Novo',
    latitude: null,
    longitude: null,
    userId: 'user-003',
    createdAt: new Date('2026-09-03T09:15:00'),
    updatedAt: new Date('2026-09-03T09:45:00'),

    orderItems: [
      {
        id: 'item-003',
        quantity: 1,
        unitPrice: 45.5,
        productId: 'product-004',
      },
    ],

    payment: {
      amount: 45.5,
      method: PaymentMethodEnum.CASH,
      status: PaymentStatusEnum.CANCELED,
      orderId: 'abacate-pay-003',
      provider: null,
      providerId: null,
      paidAt: null,
      createdAt: new Date('2026-09-03T09:15:00'),
      updatedAt: new Date('2026-09-03T09:45:00'),
    },
  },

  {
    id: 'order-004',
    totalPrice: 220.75,
    status: 'FAILED',
    deliveryAddress: 'Rua do Comércio, 321, Zona Sul',
    latitude: -5.7945,
    longitude: -35.211,
    userId: 'user-004',
    createdAt: new Date('2026-09-04T18:10:00'),
    updatedAt: new Date('2026-09-04T18:12:00'),

    orderItems: [
      {
        id: 'item-004',
        quantity: 1,
        unitPrice: 120.75,
        productId: 'product-005',
      },
      {
        id: 'item-005',
        quantity: 2,
        unitPrice: 50.0,
        productId: 'product-006',
      },
    ],

    payment: {
      amount: 220.75,
      method: PaymentMethodEnum.PIX,
      status: PaymentStatusEnum.FAILED,
      provider: PaymentProviderEnum.ABACATE,
      orderId: 'abacate-pay-004',
      providerId: 'abacate-pay-004',
      paidAt: null,
      createdAt: new Date('2026-09-04T18:10:00'),
      updatedAt: new Date('2026-09-04T18:12:00'),
    },
  },

  {
    id: 'order-005',
    totalPrice: 310.0,
    status: 'PAID',
    deliveryAddress: 'Av. Principal, 555, Centro',
    latitude: -5.7962,
    longitude: -35.2055,
    userId: 'user-005',
    createdAt: new Date('2026-09-05T11:00:00'),
    updatedAt: new Date('2026-09-05T11:10:00'),

    orderItems: [
      {
        id: 'item-006',
        quantity: 2,
        unitPrice: 80.0,
        productId: 'product-007',
      },
      {
        id: 'item-007',
        quantity: 1,
        unitPrice: 150.0,
        productId: 'product-008',
      },
    ],

    payment: {
      amount: 310.0,
      method: PaymentMethodEnum.CARD,
      status: PaymentStatusEnum.PAID,
      provider: PaymentProviderEnum.ABACATE,
      orderId: 'abacate-pay-005',
      providerId: 'abacate-pay-005',
      paidAt: new Date('2026-09-05T11:08:00'),
      createdAt: new Date('2026-09-05T11:00:00'),
      updatedAt: new Date('2026-09-05T11:08:00'),
    },
  },
];

export const OrdersTable = () => {
  const columns = ordersColumns();
  return <DataTable columns={columns} data={fakeOrders} />;
};
